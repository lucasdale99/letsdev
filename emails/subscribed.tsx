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

const Subscribed: React.FC = () => {
  return (
    <EmailWrapper preview="Thanks for subscribing!">
      <Text className="text-gray-600 text-sm leading-6 text-left">
        Congrats! You're now subscribed to my newsletter! When I post an update,
        you'll be notified.
      </Text>
      <Text className="text-gray-600 text-sm leading-6 text-left">
        Thanks for reading and being a part of my passion project.
      </Text>
      <Text className="text-gray-600 text-sm leading-6 text-left">Cheers,</Text>
      <Text className="text-gray-600 text-sm leading-6 text-left">
        Lucas Dale
      </Text>
    </EmailWrapper>
  );
};

export default Subscribed;
