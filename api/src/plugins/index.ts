import { PluginObject } from '@hapi/glue';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import accountsPlugin from './accountsPlugin';

const plugins : PluginObject[] = [
    Inert,
    Vision,
    accountsPlugin
];

export default plugins;