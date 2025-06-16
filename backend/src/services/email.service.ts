import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (email: string, token: string) => {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email - Keep Vault',
        html: `
     
            <p>Please click the link below to verify your email address:</p>
            <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account, please ignore this email.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export const sendShareNotificationEmail = async (email: string, noteTitle: string, permission: string) => {
    const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Note Shared With You - ${noteTitle}`,
        html: `
            <h2>A note has been shared with you!</h2>
            <p><strong>Note:</strong> ${noteTitle}</p>
            <p><strong>Permission:</strong> ${permission}</p>
            <p>Login to Keep Vault to access this shared note:</p>
            <a href="${loginUrl}" style="background-color: #2196F3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Note</a>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export const sendPermissionRequestEmail = async (ownerEmail: string, requesterEmail: string, noteTitle: string, message?: string) => {
    const dashboardUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ownerEmail,
        subject: `Permission Request for Your Note - ${noteTitle}`,
        html: `
            <h2>Someone wants access to your note!</h2>
            <p><strong>Note:</strong> ${noteTitle}</p>
            <p><strong>Requested by:</strong> ${requesterEmail}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
            <p>Login to your dashboard to approve or reject this request:</p>
            <a href="${dashboardUrl}" style="background-color: #FF9800; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Manage Request</a>
        `,
    };

    await transporter.sendMail(mailOptions);
};