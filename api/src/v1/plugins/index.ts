import { PluginObject } from '@hapi/glue';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import accountsKeysPlugin from './accountKeysPlugin';
import accountsPlugin from './accountsPlugin';
import assetsManagementPlugin from './assetsManagementPlugin';
import authPlugin from './authPlugin';
import rolesPlugin from './rolesPlugin';
import smartContractPlugin from './smartContractPlugin';
import tenantsPlugin from './tenantsPlugin';
import tokenManagementPlugin from './tokenManagementPlugin';
import usersPlugin from './usersPlugin';
import whitelistsPlugin from './whitelistsPlugin';

const plugins : any[] = [
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: {
            securityDefinitions: {
                'jwt': {
                    'type': 'apiKey',
                    'name': 'Authorization',
                    'in': 'header',
                    'x-keyPrefix': 'Bearer '
                }
            },
            security: [{ jwt: [] }],
        }
    },
    accountsPlugin,
    rolesPlugin,
    whitelistsPlugin,
    smartContractPlugin,
    tokenManagementPlugin,
    assetsManagementPlugin,
    tenantsPlugin,
    usersPlugin,
    accountsKeysPlugin,
    authPlugin
];

export default plugins;