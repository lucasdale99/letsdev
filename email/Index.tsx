import {
  Tailwind,
  Button,
  Html,
  Head,
  Font,
  Img,
  Container,
  Hr,
  Text,
  Section,
  Row,
  Column,
  Body,
  Preview,
} from "@react-email/components";
import config from "../tailwind.config";
import Subscribed from "./Subscribed";

export const url = (route: string): string => {
  let base = process.env.URL ?? "";
  return `${base}${route}`;
};

export const EmailWrapper = ({ children, preview, external = true }: any) => {
  return (
    <Html>
      <TailwindWrapper>
        <Head>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
          />
        </Head>
        <Head />
        <Preview>{preview}</Preview>
        <Body className="bg-gray-50 font-sans">
          <Container className="bg-white mt-6 rounded-lg mx-auto py-5 pb-12 mb-16">
            <Section className=" px-5 md:px-12">
              {external && (
                <>
                  <div>
                    <Text className="font-extrabold text-xl">Strukt</Text>
                  </div>
                  <Hr />
                </>
              )}
              {children}
              {external && (
                <>
                  <Hr />
                  <Text className="text-gray-400 text-xs leading-4">
                    Strukt, Shelbyville, TN 37160
                  </Text>
                </>
              )}
            </Section>
          </Container>
        </Body>
      </TailwindWrapper>
    </Html>
  );
};

const TailwindWrapper = ({ children }: any) => {
  return (
    <Html>
      <Tailwind config={config}>{children}</Tailwind>
    </Html>
  );
};

export const List = ({ data }: { data: object }) => {
  return (
    <>
      {Object.entries(data).map(([key, val], v) => (
        <div key={key}>
          <Text className="font-bold mb-0">{key}</Text>
          <Text className="text-lg my-0">{val}</Text>
        </div>
      ))}
    </>
  );
};

export { Subscribed };
