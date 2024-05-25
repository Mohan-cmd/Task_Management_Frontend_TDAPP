import { tokenContractAddress } from "../utils/constants";
import abi1 from '../utils/Token.json';
const ethers = require('ethers');

const GetbalanceOf=async (accountAddress)=>{
    const provider =new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
            //setUserLoggedIn(signer);
    const tokenContract = new ethers.Contract(tokenContractAddress,abi1.abi1,signer);

     const balance = await tokenContract.balanceOf(accountAddress);
     console.log('token balance of '+accountAddress+' is : '+balance);
     return balance;

}

export default GetbalanceOf;