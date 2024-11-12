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
import { EmailWrapper, url } from ".";

const Unsubscribed: React.FC = () => {
  return (
    <EmailWrapper preview="Sorry to see you go!">
      <Text className="text-gray-600 text-sm leading-6 text-left">
        Sorry to see you go! Thanks for being a part of my passion project.
      </Text>
      <Text className="text-gray-600 text-sm leading-6 text-left">
        If you have any feedback, please let me know!
      </Text>
      <Text className="text-gray-600 text-sm leading-6 text-left">Cheers,</Text>
      <Text className="text-gray-600 text-sm leading-6 text-left">
        Lucas Dale
      </Text>
    </EmailWrapper>
  );
};

export default Unsubscribed;
