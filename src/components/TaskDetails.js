
import Web3 from "web3";
import { taskContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
const ethers = require('ethers');
const TaskDetails =(props)=>{
   const {resData} =props;
//    console.log('this is res data: '+resData.title);
   let userAccount;
   const changeToInProgress=async ()=>{
        // const web3 = new Web3(window.ethereum);
        // await window.ethereum.request({method:'eth_requestAccounts'}).then(function(accounts){
        //     userAccount=accounts[0];
        // });
        // const contract = new web3.eth.Contract(abi.abi,taskContractAddress)
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userLoggedIn=signer;
        const contract = new ethers.Contract(taskContractAddress,abi.abi,userLoggedIn);
        const tx= await contract.inProgressTask(resData.taskId);
        tx.wait();
            console.log(JSON.stringify(tx));
            console.log('transaction hash of task changed to inprogress : '+tx.hash);
          
   }
   const changeToCompleted=async ()=>{
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userLoggedIn=signer;
      const contract = new ethers.Contract(taskContractAddress,abi.abi,userLoggedIn);
      const tx= await contract.completeTask(resData.taskId);
      tx.wait();
          console.log(JSON.stringify(tx));
          console.log('transaction hash of task change to completed : '+tx.hash);
   }
   return(
    <div>
        <div  style={{display:'inline-block',verticalAlign:'center'}}>
              <div style={{display:'flex',alignItems:'flex-start',flexDirection:'column', backgroundColor: 'lightblue', borderRadius:'10px',width:'100%',padding:'4px',marginBottom:'15px'}}>
               <div>Task Name: {resData.title}</div>
               <div>Task Description: {resData.description}</div>
               <div style={{fontSize:'14px'}}>Assigned By: {resData.assignedBy}</div>
               <div>Assigned Tokens: {resData.tokens}</div>
               {resData.inprogress=='false'&&
               <button className='button-style' onClick={()=>changeToInProgress()}>Change to In-Progress</button>
               }
               {resData.inprogress=='true'&&resData.completed=='false'&&
               <button className='button-style' onClick={()=>changeToCompleted()}>Change to Completed</button>
               }
               {resData.inprogress=='true'&&resData.completed=='true'&&resData.approved=='true'&&
               <button className='button-style' onClick={()=>changeToCompleted()}>Change to Approved</button>
               }
              </div>
        </div>      
    </div>
   )
}

export default TaskDetails;