import { render } from "@react-email/render";
import React from "react";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { Resource } from "sst";

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
    await new SESv2Client().send(
      new SendEmailCommand({
        FromEmailAddress: Resource.MyEmail.sender,
        Destination: {
          ToAddresses: mail.to || [],
        },
        Content: {
          Simple: {
            Subject: { Data: mail.subject },
            Body: { Html: { Data: await renderEmail(template, mail.props) } },
          },
        },
      })
    );

  return await send();
}
