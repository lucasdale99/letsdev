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
    new sst.aws.Nextjs("letusdev", {
      environment: {
        DATABASE_URL: database_url.value,
        NEXT_PUBLIC_URL: next_public_url.value,
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
