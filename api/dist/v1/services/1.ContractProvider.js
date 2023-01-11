"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkId = exports.contract = exports.web3 = void 0;
const web3_1 = __importDefault(require("web3"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const contractdata = JSON.parse((fs.readFileSync(path.join(__dirname, '../../../../deployment/build/contracts/ERC1155PresetMinterPauserSupply.json'))).toString());
class ContractProvider {
    setContractData = async () => {
        const web3Instance = new web3_1.default("https://polygon-mumbai.g.alchemy.com/v2/m2FmG0mzHNpJ-O59iS4LQIRaOZjHJewD");
        const chainId = await web3Instance.eth.getChainId();
        const contractInstance = new web3Instance.eth.Contract(contractdata.abi, contractdata.networks[chainId].address);
        exports.web3 = web3Instance;
        exports.networkId = chainId;
        exports.contract = contractInstance;
    };
}
exports.default = ContractProvider;
//# sourceMappingURL=1.ContractProvider.js.map