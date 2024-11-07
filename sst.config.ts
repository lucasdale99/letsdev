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
    new sst.aws.Nextjs("letusdev", {
      environment: {
        DATABASE_URL: database_url.value,
      },
      domain: {
        name: "letusdev.io",
        dns: sst.aws.dns({
          zone: "Z0600725332UFN0OF4ISC",
        }),
      },
    });
  },
});
