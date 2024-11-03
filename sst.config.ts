/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "portfolio",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("LucasPortfolio", {
      domain: {
        name: "letusdev.io",
        dns: sst.aws.dns({
          zone: "Z0600725332UFN0OF4ISC"
        }),
      }
    });
   
  },
});
