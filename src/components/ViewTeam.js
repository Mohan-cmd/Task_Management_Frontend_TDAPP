import { useState } from 'react';
import { taskContractAddress,AdminAccount } from '../utils/constants';
import Web3 from "web3";
import abi from '../utils/NewTask.json';
const ethers =require('ethers');
const ViewTeams=()=>{
    const [mgrAddress,setMgrAddress]=useState( );
    const [teamData,setteamData]=useState([]);
    const viewTeams=async ()=>{

        try{
          if(window.ethereum){
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({method:'eth_requestAccounts'});
            const newTaskContract = new web3.eth.Contract(abi.abi,taskContractAddress);
            const teamData=await newTaskContract.methods.viewTeam(mgrAddress).call({from: AdminAccount})
            // const provider = new ethers.BrowserProvider(window.ethereum);
            // const signer = await provider.getSigner();
            // const contract = new ethers.Contract(taskContractAddress,abi.abi,signer);
            // const teamData = await contract.viewTeam(mgrAddress);
            //   console.log('Team Data : '+JSON.stringify(teamData));
            //   const encodedData = teamData.data;
            //   const decodedData= ethers.utils.defaultAbiCoder.decode(["address[]",encodedData]);
            //   console.log(decodedData);
            // const encodedData = ethers.AbiCoder.defaultAbiCoder().encode("address[]", teamData.data);
            // const [decoded] = ethers.AbiCoder.defaultAbiCoder().decode("address[]", encodedData);
            // const output = decoded.toObject(); 
            // console.log(JSON.stringify(output));
            console.log('teamData: '+teamData);
            setteamData(teamData);
          }
        }
        catch(error){
            console.log(error);
        }
    }
   return(
    <div >
    <div className="form-style">
        <label>Manager Address</label>
        <input className="input-style" onChange={(e)=>setMgrAddress(e.target.value)}></input>
        <button className="button-style" onClick={()=>viewTeams()}>Submit</button>
    </div>
    {teamData.length>0 &&
      <div style={{margin:"auto",width:"50%"}}>
        <table style={{border:"1px solid black"}}>
        <thead>
        <tr style={{border:"1px solid black"}}>
          <th style={{border:"1px solid black"}}>Reporting Employees</th>
        </tr>
        </thead>
        <tbody>
        { teamData.map((emp,key)=>
        <tr key={key} style={{border:"1px solid black"}}>
            <td style={{border:"1px solid black"}}> {emp}</td>
        </tr>
        )
        }
        </tbody>
        </table>
        </div>
    }
    </div>
   )
};

export default ViewTeams;