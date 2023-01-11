import Web3 from "web3";
import {AbiItem} from "web3-utils";
import {Contract} from "web3-eth-contract";
import * as fs from "fs";
import * as path from "path";

export let web3 : Web3;
export let contract : Contract;
export let networkId : number;


const contractdata = JSON.parse((fs.readFileSync(path.join(__dirname, '../../../../deployment/build/contracts/ERC1155PresetMinterPauserSupply.json'))).toString());

class ContractProvider {

    setContractData = async() => {
        const web3Instance = new Web3("https://polygon-mumbai.g.alchemy.com/v2/m2FmG0mzHNpJ-O59iS4LQIRaOZjHJewD");
        const chainId = await web3Instance.eth.getChainId() as number;
        const contractInstance = new web3Instance.eth.Contract(contractdata.abi as AbiItem[], contractdata.networks[chainId].address as string);

        web3 = web3Instance;
        networkId = chainId;
        contract = contractInstance;
    }
}

export default ContractProvider;

    
