import { PluginObject } from '@hapi/glue';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import accountsPlugin from './accountsPlugin';
import rolesPlugin from './rolesPlugin';
import smartContractPlugin from './smartContractPlugin';
import tokenManagementPlugin from './tokenManagementPlugin';
import whitelistsPlugin from './whitelistsPlugin';

const plugins : PluginObject[] = [
    Inert,
    Vision,
    accountsPlugin,
    rolesPlugin,
    whitelistsPlugin,
    smartContractPlugin,
    tokenManagementPlugin
];

export default plugins;