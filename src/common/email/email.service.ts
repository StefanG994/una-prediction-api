import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private gmailUser: string;
  private gmailPass: string;

  constructor(private configService: ConfigService) {
    this.gmailUser = this.configService.get<string>('gmailUser');
    this.gmailPass = this.configService.get<string>('gmailPass');
  }

  async sendEmail(to: string, subject: string, body: string) {
    // Create a transporter object using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.gmailUser,
        pass: this.gmailPass,
      },
    });

    // Email options
    const mailOptions = {
      from: this.gmailUser, // Sender's address
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
