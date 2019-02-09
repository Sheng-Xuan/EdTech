// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail = require('@sendgrid/mail');
const senderAddress = 'noreply@edtech.top';

export function sendUserVerification(userEmail: string, code: string) {
  sendEmail(
    userEmail,
    senderAddress,
    'EdTech | Please verify your email.',
    'Please verify your email address',
    'Please click this link: edtech.top/verification?code=' + code + '?email=' + userEmail
  );
}
export function sendForgetPassword(userEmail: string) {
  sendEmail(userEmail, 'default', 'default', 'default', 'default');
}

function sendEmail(
  to: string,
  from: string,
  subject: string,
  text: string,
  html: string
) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html
  };
  sgMail.send(msg);
}
