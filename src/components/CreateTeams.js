import { useState } from "react";
import { taskContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
const ethers = require('ethers');
const CreateTeams=()=>{
   const [empaddress,setEmpaddress]=useState( );
   const [mgraddress,setMgraddress] = useState( );

   const createTeam =async (e) =>{
      e.preventDefault();
    if(window.ethereum){
        try{
            await window.ethereum.request({method:'eth_requestAccounts'});

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = await new ethers.Contract(taskContractAddress,abi.abi,signer);
            const tx= await contract.CreateTeam(empaddress,mgraddress);
             tx.wait();
            console.log('transaction hash is :'+tx.hash);
            alert('Added Employee to the team');
        }
        catch(error){
            console.log('Error in Create team: '+error);
        }
    }
   }
   return(
    <div>
      <form onSubmit={createTeam}>
        <div className="form-style">
             <label>Employee Address</label>
             <input type="text" placeholder="employee Wallet Address" value={empaddress} className="input-style" onChange={(e)=>setEmpaddress(e.target.value)}></input>
             <label>Manager Address</label>
             <input type="text" placeholder="manager Wallet Address" value={mgraddress} className="input-style" onChange={(e)=>setMgraddress(e.target.value)}></input>
             <button type="submit" className="button-style">submit</button>
        </div>
      </form>
    </div>
   )
}

export default CreateTeams;