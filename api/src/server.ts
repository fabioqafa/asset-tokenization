'use strict';
import ContractProvider from "./v1/services/1.ContractProvider";
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { compose, Manifest } from '@hapi/glue';
import plugins from "./v1/plugins";
import { Prisma, PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import Bcrypt from "bcrypt";

export let prisma;
const contractProvider = new ContractProvider();

const manifest: Manifest = {
    server: {
      port: 3000,
      host: '0.0.0.0',
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

    const server : Server = await compose(manifest, options);
    await server.register({
      plugin : require("hapi-api-version"),
      options : {
        validVersions: [1,2],
        defaultVersion: 1,
        vendorName: 'assetapi'
      }
    })

    await server.start();
  
    console.log('Server running on %s', server.info.uri);
    
    server.route({
      method: 'GET',
      path: '/',
      options : {
        auth : false
      },
      handler: (request : Request, h : ResponseToolkit) => {
        return {
          version: request.pre.apiVersion
          }
        }
    });

    await contractProvider.setContractData();
    prisma = new PrismaClient();
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();