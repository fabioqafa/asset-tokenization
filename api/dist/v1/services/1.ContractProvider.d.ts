import Web3 from "web3";
import { Contract } from "web3-eth-contract";
export declare let web3: Web3;
export declare let contract: Contract;
export declare let networkId: number;
declare class ContractProvider {
    setContractData: () => Promise<void>;
}
export default ContractProvider;
//# sourceMappingURL=1.ContractProvider.d.ts.map