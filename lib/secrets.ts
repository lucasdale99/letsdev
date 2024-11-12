import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

//Grab Secrets from AWS Parameter Store
const STAGE = process.env.STAGE ? process.env.STAGE : "production";
const PROJECT = "letusdev";
const REGION = "us-east-1";

export default async function getSecret(secretName: string) {
  if (!secretName) {
    throw new Error("Secret name is required");
  }

  const client = new SSMClient({ region: REGION });
  const paramName = `/sst/${PROJECT}/${STAGE}/Secret/${secretName}/value`;

  const paramOptions = {
    Name: paramName,
    WithDecryption: true,
  };

  const command = new GetParameterCommand(paramOptions);
  const response = await client.send(command);

  return response;
}
