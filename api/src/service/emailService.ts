import ejs from "ejs";
import path from "path";
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_EMAIL_KEY || "");

const __dirname = process.cwd();
const templatesPath = path.join(__dirname, "public/templates");

// Initialize SendGrid with API key

interface EmailService {
	emailTo: string;
	emailSubject: string;
	template: string;
	data?: any;
	emailFrom?: string;
}

interface TaskApprovalEmailData {
	recipientName: string;
	taskTitle: string;
	taskDescription: string;
	dueDate: string;
	managerName: string;
	reviewLink: string;
}

const sendEmail = async ({
	emailTo,
	emailSubject,
	template,
	data,
	emailFrom = process.env.RESEND_EMAIL_FROM
}: EmailService) => {
	try {
		// Render the email template
		const html = await ejs.renderFile(path.join(templatesPath, `${template}.ejs`), data, {
			async: true
    });

		// Prepare the email message
		const msg = {
			to: emailTo,
			from: emailFrom || "",
			subject: emailSubject,
			html,
			replyTo: emailFrom
		};

		// Send the email using SendGrid
    const response = await resend.emails.send(msg);
    if(response.error) throw  response.error
		return Promise.resolve(response);
	} catch (error) {
		return Promise.reject(error);
	}
};

const sendTaskApprovalEmail = async (
	email: string,
	data: TaskApprovalEmailData
) => {
	return sendEmail({
		emailTo: email,
		emailSubject: `${data.taskTitle} Task Review Request`,
		template: "taskApprovalTemplate",
		data,
		emailFrom: `Linky Task Review <${process.env.RESEND_EMAIL_FROM}>`
	});
};

const sendTestTaskApprovalEmail = async (email: string, data?: TaskApprovalEmailData) => {
	return sendEmail({
		emailTo: email,
		emailSubject: "Task Approval Request - Test",
		template: "taskApprovalTemplateTest",
		emailFrom: `Linky Task Approval <${process.env.RESEND_EMAIL_FROM}>`
	});
};

export { sendEmail, sendTaskApprovalEmail, sendTestTaskApprovalEmail };
