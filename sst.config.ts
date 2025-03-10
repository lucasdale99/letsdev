/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "letusdev",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      region: "us-east-1",
    };
  },
  async run() {
    const database_url = new sst.Secret("DATABASE_URL");
    const next_public_url = new sst.Secret("NEXT_PUBLIC_URL");
    const auth_secret = new sst.Secret("AUTH_SECRET");
    const auth_github_id = new sst.Secret("AUTH_GITHUB_ID");
    const auth_github_secret = new sst.Secret("AUTH_GITHUB_SECRET");
    const auth_trust_host = new sst.Secret("AUTH_TRUST_HOST");
    const auth_allowed_email = new sst.Secret("AUTH_ALLOWED_EMAIL");
    new sst.aws.Nextjs("letusdev", {
      environment: {
        DATABASE_URL: database_url.value,
        NEXT_PUBLIC_URL: next_public_url.value,
        AUTH_SECRET: auth_secret.value,
        AUTH_GITHUB_ID: auth_github_id.value,
        AUTH_GITHUB_SECRET: auth_github_secret.value,
        AUTH_TRUST_HOST: auth_trust_host.value,
        AUTH_ALLOWED_EMAIL: auth_allowed_email.value,
      },
      domain: {
        name:
          $app.stage === "production"
            ? "letusdev.io"
            : `${$app.stage}.letusdev.io`,
        dns: sst.aws.dns({
          zone: "Z0600725332UFN0OF4ISC",
        }),
      },
    });
  },
});
