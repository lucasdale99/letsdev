import { render } from "@react-email/render";
import React from "react";
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

type ReactComponent =
  | React.FunctionComponent<any>
  | React.ComponentClass<any, any>;

export const renderEmail = async (
  template: ReactComponent,
  props: any
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

export async function mail(template: ReactComponent, mail: MailProps) {
  const send = async () =>
    await new SESClient().send(
      new SendEmailCommand({
        Source: "lucasdale99@gmail.com",
        Destination: {
          ToAddresses: mail.to || [],
        },
        Message: {
          Subject: {
            Data: mail.subject,
          },
          Body: { Html: { Data: await renderEmail(template, mail.props) } },
        },
      })
    );

  return await send();
}
