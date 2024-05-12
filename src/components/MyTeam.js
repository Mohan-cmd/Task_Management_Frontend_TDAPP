
import Web3 from "web3";
import abi from '../utils/NewTask.json';
import { taskContractAddress } from "../utils/constants"; 
import { useEffect, useState } from "react";
const MyTeam=()=>{
    let userAccount;
    const[teamData,setTeamData]=useState([]);
    const getMyteam=async ()=>{
        
    try{
        const web3 = new Web3(window.ethereum);
            await window.ethereum.request({method:'eth_requestAccounts'}).then(function(accounts){
                 userAccount=accounts[0];
            });
            console.log(userAccount)
            const newTaskContract = new web3.eth.Contract(abi.abi,taskContractAddress);
            const teamData=await newTaskContract.methods.viewTeam(userAccount).call({from: userAccount});
            setTeamData(teamData);
            //console.log(teamData)
    }
    catch(error){
        console.log('Error in Myteam: '+error);
    }
}
    useEffect(()=>{getMyteam()},[]);
    return(
     <div>
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
}


export default MyTeam;