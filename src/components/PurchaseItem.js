import { AdminAccount } from "../utils/constants";
import { tokenContractAddress } from "../utils/constants";
import { taskContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
import abi1 from '../utils/Token.json';
const{ethers} = require('ethers');
const PurchaseItem=(props)=>{
     const{data,balance,loggedIn} = props;
      console.log('data is :'+JSON.stringify(data));

      const payRequired = async ()=>{

        try{
            if(parseInt(balance) < parseInt(data.Tokens_Required)){
                alert('balance is Insufficeint')
            }else{
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await  provider.getSigner();
            const contract = new ethers.Contract(tokenContractAddress,abi1.abi1,signer);
            const tx = await contract.approve(taskContractAddress,data.Tokens_Required);
             if(tx.hash){
                const contract1 = new ethers.Contract(taskContractAddress,abi.abi,signer);
                const tx1 = await contract1.transferTokens(loggedIn,AdminAccount,data.Tokens_Required)
                console.log('transaction hash is of Purchase is: '+tx1.hash);
                window.location.href='/redeemtokens';
             }
           }
       }
        catch(error){
            console.log('error in purchaseItem: '+error);
        }
      }
     return(
        <div>
            <div>{data.name}</div>
            <div>Tokens Required : {data.Tokens_Required}</div>
            <button className="button-style" style={{backgroundColor:'coral',border:'1px solid black'}} onClick={()=>payRequired()}>Pay</button>
        </div>
     )
}

export default PurchaseItem;