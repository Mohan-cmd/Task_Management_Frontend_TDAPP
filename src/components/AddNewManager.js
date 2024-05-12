import { useState } from "react";
import { taskContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
const ethers= require("ethers");
const AddNewManager = ()=>{
   const [mgrAddress,setmgrAddress]=useState( );
    const registerManager = async(e)=>{
        e.preventDefault();
        try{
            if(window.ethereum){
                await window.ethereum.request({method: 'eth_requestAccounts'});
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                console.log('signers:'+JSON.stringify((signer)));

                const contract = await new ethers.Contract(taskContractAddress,abi.abi,signer);
                const tx= await contract.CreateManager(mgrAddress);
                await tx.wait();
                console.log(JSON.stringify(tx));
                console.log('transaction Hash: '+tx.hash);
                alert('Manager Registered successfully');
            }
        }
        catch(e){
          console.log('Error registering Manager: '+e);
        }
    }
   return(
    <div>
        <form onSubmit={registerManager}> 
            <div className="form-style">
            <input type="text" placeholder="address" value={mgrAddress} onChange={(e)=>setmgrAddress(e.target.value)} className="input-style"></input>
            <button className="button-style">Submit</button>
            </div>
        </form>
    </div>
   )
}

export default AddNewManager;