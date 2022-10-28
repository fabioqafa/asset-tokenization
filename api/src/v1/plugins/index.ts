import { PluginObject } from '@hapi/glue';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import accountsKeysPlugin from './accountKeysPlugin';
import accountsPlugin from './accountsPlugin';
import assetsManagementPlugin from './assetsManagementPlugin';
import rolesPlugin from './rolesPlugin';
import smartContractPlugin from './smartContractPlugin';
import tenantsPlugin from './tenantsPlugin';
import tokenManagementPlugin from './tokenManagementPlugin';
import usersPlugin from './usersPlugin';
import whitelistsPlugin from './whitelistsPlugin';

const plugins : PluginObject[] = [
    Inert,
    Vision,
    accountsPlugin,
    rolesPlugin,
    whitelistsPlugin,
    smartContractPlugin,
    tokenManagementPlugin,
    assetsManagementPlugin,
    tenantsPlugin,
    usersPlugin,
    accountsKeysPlugin
];

export default plugins;