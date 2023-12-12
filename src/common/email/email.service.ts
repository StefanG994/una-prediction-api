import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendEmail(to: string, subject: string, body: string) {
    const gmailUser = this.configService.get<string>('GMAIL_USER');
    const gmailPass = this.configService.get<string>('GMAIL_PASS');

    // Create a transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // Email options
    const mailOptions = {
      from: gmailUser, // Sender's address
      to: to, // Recipient's address
      subject: subject,
      text: body,
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
