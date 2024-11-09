import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { EmailWrapper, url } from "./Index";

const Subscribed: React.FC = () => {
  return (
    <EmailWrapper preview="Thanks for reaching out! I'll be in touch soon.">
      <Text className="text-gray-600 text-sm leading-6 text-left">
        Thank you for getting in touch! We've received your message and will
        respond as soon as possible.
      </Text>
      <Text className="text-gray-600 text-sm leading-6 text-left">
        We aim to respond to all inquiries within 1-2 business days. In the
        meantime, you can review your submission details here.
      </Text>
      {/* <Hr className="border-gray-200 my-5" />
			<Text className="text-gray-600 text-sm leading-6 text-left">
				While you wait, feel free to:
			</Text>
			<Text className="text-gray-600 text-sm leading-6 text-left">
				• Read some of our <Link className="text-blue-600" href="https://yourwebsite.com/blog">blog posts</Link> about development and design
			</Text>
			<Text className="text-gray-600 text-sm leading-6 text-left">
				• Follow us on <Link className="text-blue-600" href="https://twitter.com/yourusername">Twitter</Link> for regular updates
			</Text> */}
      <Hr className="border-gray-200 my-5" />
      <Text className="text-gray-600 text-sm leading-6 text-left">
        We look forward to discussing your project and exploring how we can work
        together.
      </Text>
      <Text className="text-gray-600 text-sm leading-6 text-left">
        Regards,
      </Text>
      <Text className="text-gray-600 text-sm leading-6 text-left">
        Matt Schroder
      </Text>
    </EmailWrapper>
  );
};

export default Subscribed;
