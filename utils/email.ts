import { render } from "@react-email/render";
import React from "react";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

type ReactComponent =
  | React.FunctionComponent<any>
  | React.ComponentClass<any, any>;

export const renderEmail = async (
  template: ReactComponent,
  props: any,
): Promise<string> => {
  const html = await render(React.createElement(template, props), {
    pretty: true,
  });
  return html;
};

type MailProps = {
  subject: string;
  to?: string[];
  props?: any;
};

const sesClient = new SESv2Client({
  region: process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION,
});

const fromEmailAddress = process.env.SES_FROM_EMAIL ?? "lucas@letusdev.io";

export async function mail(template: ReactComponent, mail: MailProps) {
  try {
    return await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: fromEmailAddress,
        Destination: {
          ToAddresses: mail.to || [],
        },
        Content: {
          Simple: {
            Subject: { Data: mail.subject },
            Body: { Html: { Data: await renderEmail(template, mail.props) } },
          },
        },
      }),
    );
  } catch (error) {
    if (error instanceof Error && error.name === "CredentialsProviderError") {
      throw new Error(
        "AWS SES credentials are not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION locally, or run with an IAM role that can send SES email.",
        { cause: error },
      );
    }

    throw error;
  }
}
