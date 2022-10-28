'use strict';
import ContractProvider from "./v1/services/1.ContractProvider";
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { compose, Manifest } from '@hapi/glue';
import plugins from "./v1/plugins";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
const contractProvider = new ContractProvider();

const manifest: Manifest = {
    server: {
      port: 3000,
      host: 'localhost',
      router: {
        stripTrailingSlash: true,
      },
      routes: {
        cors: {
          origin: ['*'], // an array of origins or 'ignore'
        },
      },
    },
    register: {
      plugins: plugins
    },
  };

  const options = {
    relativeTo: __dirname
  };

const init = async () => {

    const server : Server = await compose(manifest, options)
    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await contractProvider.setContractData();
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();