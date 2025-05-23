export const ROLE_LIST = {
  ADMINISTRATOR: "ADMINISTRATOR",
  MANAGER: "MANAGER",
  USER: "USER",
  enumValues: [
    "ADMINISTRATOR",
    "MANAGER",
    "USER"
	]
} as const;

export const TOKEN_LIST = {
	PASSWORD_RESET: "PASSWORD_RESET",
	EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
	LOGIN_OTP: "LOGIN_OTP",
	enumValues: ["PASSWORD_RESET", "EMAIL_VERIFICATION", "LOGIN_OTP"]
} as const;
