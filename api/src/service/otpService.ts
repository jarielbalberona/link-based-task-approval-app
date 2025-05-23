import { and, eq } from "drizzle-orm";

import DrizzleService from "@/databases/drizzle/service";
import { TokenType, UserSchemaType } from "@/databases/drizzle/types";
import { verificationTokens } from "@/models/drizzle/authentication.model";
import AppHelpers from "@/utils/appHelpers";
import { ServiceResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export default class OTPService extends DrizzleService {
	private async limitOTPRequest(
		user: Partial<UserSchemaType>,
		tokenType: TokenType,
		timeLimit: number = 5
	) {
		try {
			const otpRequestCount = await this.db.query.verificationTokens.findFirst({
				where: and(
					eq(verificationTokens.identifier, user.email!),
					eq(verificationTokens.tokenType, tokenType)
				)
			});

			const currentMinute = new Date().getTime();
			const otpRequestUpdateTime = new Date(otpRequestCount?.updatedAt!).getTime();
			const timeDifference = currentMinute - otpRequestUpdateTime;
			// Convert it to human readable time
			const timeDifferenceInMinutes = Math.floor(timeDifference / 60000);
			console.log("Time difference in minutes: ", timeDifferenceInMinutes);

			if (otpRequestCount && timeDifferenceInMinutes < timeLimit) {
				const message = `You can only request OTP per ${timeLimit} minute(s). Please wait for ${timeLimit - timeDifferenceInMinutes} minute(s)`;
				return ServiceResponse.createRejectResponse(status.HTTP_429_TOO_MANY_REQUESTS, message);
			}

			return Promise.resolve(true);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async saveOTPToDatabase(
		user: Partial<UserSchemaType>,
		tokenType: TokenType,
		expiresAt: Date = AppHelpers.OTPExpiry()
	) {
		try {
			if (!user.email)
				return ServiceResponse.createRejectResponse(
					status.HTTP_404_NOT_FOUND,
					"Email is not registered"
				);

			await this.limitOTPRequest(user, tokenType);

			const generatedOTP = AppHelpers.OTPGenerator();
			await this.db
				.insert(verificationTokens)
				.values({
					identifier: user.email,
					token: String(generatedOTP),
					tokenType,
					expires: expiresAt
				})
				.onConflictDoUpdate({
					target: [verificationTokens.identifier, verificationTokens.tokenType],
					set: {
						token: String(generatedOTP),
						expires: expiresAt
					}
				});

			return Promise.resolve(generatedOTP);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async verifyOTPFromDatabase(user: Partial<UserSchemaType>, otp: string, tokenType: TokenType) {
		try {
			const tokenRecord = await this.db.query.verificationTokens.findFirst({
				where: and(
					eq(verificationTokens.identifier, user.email!),
					eq(verificationTokens.token, otp),
					eq(verificationTokens.tokenType, tokenType)
				)
			});

			if (!tokenRecord)
				return ServiceResponse.createRejectResponse(status.HTTP_400_BAD_REQUEST, "Invalid OTP");

			if (tokenRecord?.expires && tokenRecord.expires < new Date()) {
				await this.deleteOTPFromDatabase(user, tokenType);
				return ServiceResponse.createRejectResponse(status.HTTP_400_BAD_REQUEST, "OTP expired");
			}

			await this.deleteOTPFromDatabase(user, tokenType);

			return Promise.resolve(true);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async deleteOTPFromDatabase(user: Partial<UserSchemaType>, tokenType: TokenType) {
		try {
			await this.db
				.delete(verificationTokens)
				.where(
					and(
						eq(verificationTokens.identifier, user.email!),
						eq(verificationTokens.tokenType, tokenType)
					)
				);

			return Promise.resolve(true);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
