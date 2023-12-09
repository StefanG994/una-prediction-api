// import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiConfigService } from "../api-config-service";
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private apiConfigService: ApiConfigService
  ) { }

  async sendEmail(to: string, subject: string, body: string) {

    const client = new SESClient({
      region: this.configService.get<string>('ses.region'),
      credentials: {
        accessKeyId: <string>this.configService.get('ses.apiKey'),
        secretAccessKey: <string>this.configService.get('ses.secret')
      }
    });

    const params = {
      Destination: {
        /* required */
        CcAddresses: [
          /* more items */
        ],
        ToAddresses: [
          to,
          /* more To-email addresses */
        ],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: "UTF-8",
            Data: body,
          },
          Text: {
            Charset: "UTF-8",
            Data: "TEXT_FORMAT_BODY",
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: this.configService.get('ses.mailFrom'),
      ReplyToAddresses: [
        /* more items */
      ],
    };

    if (this.apiConfigService.isInProduction) {

      const command = new SendEmailCommand(params);

      client
        .send(command)
        .then((data: any) => {
          // process data.
          console.log(data);
        })
        .catch((error: any) => {
          // error handling.
          console.error(error);
        })
        .finally(() => {
          // finally.
          console.log('finally');
        });

    }

    console.log(params, body);
  }
}