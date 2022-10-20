import ContractProvider from "./ContractProvider";
import executeTransaction from "../utils/ExeTrnx";
import { web3, contract, networkId } from "./ContractProvider";

const publicKey = "0x6f93DD12FE5d891760a5551F1A56bB9E28de92F9";
const privateKey = '0x0685bad96bb2b61821cdeaa022418fe05b2e606333c79e6a079f53e8dedbbecf';

class AccountsService {
    // contractProvider : ContractProvider
    // constructor() {
    //     this.contractProvider = new ContractProvider();
    // }

    getBalance = async(id : number, address: string) : Promise<number> => {
        console.log(id, address)
        const balance : number = await contract.methods.balanceOf(address, id).call();
        
        return balance;
    }

}

export default AccountsService;