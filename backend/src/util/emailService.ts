// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail = require('@sendgrid/mail');

const senderAddress = 'noreply@edtech.top';

export function sendUserVerification(
  userEmail: string,
  code: string,
  username: string
) {
  sendEmail(userEmail, senderAddress, process.env.SENDGRID_VERIFICATION_ID, {
    url: process.env.URL + '/verification?code=' + code + '&email=' + userEmail,
    username: username
  });
}
export function sendForgotPassword(userEmail: string, code: string) {
  sendEmail(userEmail, senderAddress, process.env.SENDGRID_FORGET_PASSWORD, {
    code: code
  });
}

export function sendReportBug(userEmail: string, message: string) {
  sendEmail(process.env.SENDGRID_ADMIN_EMAIL, senderAddress, process.env.SENDGRID_REPORT_BUG, {
    email: userEmail,
    message: message
  });
}

export function sendNewToolNotification(userEmail: string, toolId: number) {
  sendEmail(process.env.SENDGRID_ADMIN_EMAIL, senderAddress, process.env.SENDGRID_NEW_TOOL, {
    userEmail: userEmail,
    toolId: toolId
  });
}

function sendEmail(to: string, from: string, templateId: string, data: object) {
  const msg = {
    to: to,
    from: from,
    subject: 'default',
    text: 'default',
    html: '<p></p>',
    templateId: templateId,
    dynamic_template_data: data
  };
  sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(msg);
}
