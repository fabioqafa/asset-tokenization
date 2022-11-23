import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
//import { prisma }  from '../../server';
import * as Bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const validate = async (decoded : any, request : Request, h : ResponseToolkit) => {
    const user = await prisma.users.findUnique({
        where : {
            username : decoded.username
        }
    });
    
    if (user) {
        const isValid = await Bcrypt.compare(decoded.password, user.password);
        if (isValid) {return {credentials : {user}, isValid} }
        else { return { credentials : null, isValid}; }
    }
    else { return { credentials: null, isValid : false }}

}

const plugin = {
    name: 'app/v1/auth',
    register: async function (server: Server) {
        await server.register({
            plugin: require('hapi-auth-jwt2')
        });
        server.auth.strategy('jwt', 'jwt', { key: "1234", validate} );
        server.auth.default('jwt');
    }
};

const options = {
    route: true
};



export default {
    plugin,
    options
} as PluginObject;