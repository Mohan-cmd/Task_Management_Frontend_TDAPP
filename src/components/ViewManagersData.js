import { useEffect,useState } from "react";
import { taskContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
const ethers = require("ethers");

const ViewManagersData=()=>{
  const[managers,setManagers]=useState([]);
  const getManagersData=async ()=> {
    try{
    if(window.ethereum){
       await window.ethereum.request({method: 'eth_requestAccounts'});
       const provider = new ethers.BrowserProvider(window.ethereum);
       const signer = await provider.getSigner();
        //console.log(signer)
       const contract = await new ethers.Contract(taskContractAddress,abi.abi,signer);
       //console.log(contract)
       const managers= await contract.getManagers();
      //  console.log('managers')
       console.log('managers data'+managers)
       setManagers(managers);
    }
  }
  catch(error){
       console.log(error)
  }
  }
      useEffect(()=>{
        getManagersData();
      },[])
    return(
        <div style={{margin:"auto",width:"50%"}}>
          <table style={{border:"1px solid black"}}>
          <thead>
          <tr style={{border:"1px solid black"}}>
            <th style={{border:"1px solid black"}}>Managers Address</th>
          </tr>
          </thead>
          <tbody>
          {
            managers.map((empid,key)=>
            <tr key={key} style={{border:"1px solid black"}}>
               <td style={{border:"1px solid black"}}>{empid}</td>
            </tr>
            )
          }
          </tbody>
          </table>
        </div>
    );
}

export default ViewManagersData;