
import Web3 from "web3";
import { taskContractAddress } from "../utils/constants";
import { tokenContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
import abi1 from '../utils/Token.json';
import { empaddress } from "../utils/constants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTransactionH } from "../utils/TransferSlice";
const ethers = require('ethers');

const TaskDetails =(props)=>{
   const {resData} =props;
   const dispatch = useDispatch();
   const isManager = useSelector(store=> store.user.isManager);
//    console.log('this is res data: '+resData.title);
   let userAccount;
   const changeToInProgress=async ()=>{
       try{
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
            if(tx.hash){
               window.location.reload();
               window.location.href='/mytasks';
            }
       }
       catch(error){
         console.log('error while making task to inprogress: '+error)
       }
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
          if(tx.hash){
            window.location.reload();
            window.location.href='/mytasks';
         }
   }
   const changeToVerified=async ()=>{
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userLoggedIn=signer;
      const contract = new ethers.Contract(taskContractAddress,abi.abi,userLoggedIn);
      const tx= await contract.verifyTask(resData.taskId);
      tx.wait();
          console.log(JSON.stringify(tx));
          console.log('transaction hash of task change to Verified : '+tx.hash);
          if(tx.hash){
            window.location.reload();
            window.location.href='/verifyapprove';
         }
   }
   const changeToApproved = async()=>{
      try{
         const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userLoggedIn=signer;
      const contract = new ethers.Contract(tokenContractAddress,abi1.abi1,userLoggedIn);
      const tx = await contract.approve(taskContractAddress,resData.tokens);
      tx.wait();
      console.log('transaction hash of task approveTask :'+tx.hash);
      if(tx.hash){
         const provider = new ethers.BrowserProvider(window.ethereum);
         const signer = await provider.getSigner();
         const userLoggedIn=signer;
       const contract1 = new ethers.Contract(taskContractAddress,abi.abi,userLoggedIn);
      console.log('data is : '+userLoggedIn,resData.assignedEmployee,resData.tokens);
      const tx1 = await contract1.transferTokens(userLoggedIn,resData.assignedEmployee,resData.tokens);
      tx1.wait();
      console.log('transaction hash of task TranferTokens :'+tx1.hash);
         if(tx1.hash){
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userLoggedIn=signer;
      const contract = new ethers.Contract(taskContractAddress,abi.abi,userLoggedIn);
      const tx = await contract.approveTask(resData.taskId);
      tx.wait();
        console.log('transaction hash of task changed to approved & processed : '+tx.hash );
            
        if(tx.hash){
         const data = {fromAccount:JSON.stringify(userLoggedIn),
            toAccount:JSON.stringify(resData.assignedEmployee),
            transactionHash:tx.hash.toString(),
            transactionTokens:resData.tokens.toString()
            }
            await dispatch(addTransactionH(data))
         //    setTimeout(()=>{
         // window.location.reload();
         // window.location.href='/verifyapprove';},2000);
      }
      }
   }
      // if(tx.hash){
      //    const tx1= await contract.approveTransfer(resData.tokens);
      //      console.log('transaction hash of task changed to approved :'+tx1.hash);
      //    if(tx1.hash){
      //       const tx2 = await contract.transferTokens(resData.assignedBy,resData.assignedEmployee,resData.tokens);
      //       console.log('token transvered to employeed hash: '+tx2.hash);
      //    }
      //}
   }
      catch(error){
         console.log('error in taskdetails is : '+error);
      }
   }
   const approveTask =async ()=>{
      try{
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userLoggedIn=signer;
      const contract = new ethers.Contract(tokenContractAddress,abi1.abi1,userLoggedIn);
      const tx = await contract.approve(taskContractAddress,resData.tokens);
      tx.wait();
      console.log('transaction hash of task approveTask :'+tx.hash);
      if(tx.hash){
         const provider = new ethers.BrowserProvider(window.ethereum);
         const signer = await provider.getSigner();
         const userLoggedIn=signer;
       const contract1 = new ethers.Contract(taskContractAddress,abi.abi,userLoggedIn);
      console.log('data is : '+userLoggedIn,resData.assignedEmployee,resData.tokens);
      const tx1 = await contract1.transferTokens(userLoggedIn,resData.assignedEmployee,resData.tokens);
      tx1.wait();
      console.log('transaction hash of task TranferTokens :'+tx1.hash);
      const receipt = await provider.getTransactionReceipt(tx1.hash);
      console.log('receptis: ' +receipt);
      }
      // const web3 = new Web3(window.ethereum);
      // const tokenContract = new web3.eth.Contract(abi1.abi1, tokenContractAddress);
      // const taskContract = new web3.eth.Contract(abi.abi, taskContractAddress);
      
      // const accounts = await web3.eth.getAccounts();
      //   const userLoggedIn = accounts[0];

      //   // Approve tokens
      
      //   const tx = await tokenContract.methods.approve(taskContractAddress, resData.tokens).send({ from: userLoggedIn });
      //   console.log('Transaction hash of task approveTask:', tx.transactionHash);
      //   console.log('data ip is: '+resData.assignedEmployee, empaddress);
      //   if (tx.transactionHash) {
      //       // Transfer tokens
      //       const tx1 = await taskContract.methods.transferTokens(userLoggedIn,empaddress, resData.tokens).send({ from: userLoggedIn });
      //       console.log('Transaction hash of task TransferTokens:', tx1.transactionHash);
      //   }
       }
      
   catch(error){
      console.log('error in approvaltrnasfer: '+error)
   }
   }
   const TransferTokens =async ()=>{
      try{
         const provider = new ethers.BrowserProvider(window.ethereum);
         const signer = await provider.getSigner();
         const userLoggedIn=signer;
         const contract1 = new ethers.Contract(taskContractAddress,abi.abi,userLoggedIn);
         console.log('data is : '+userLoggedIn,resData.assignedEmployee,resData.tokens);
         const tx1 = await contract1.transferTokens(resData.assignedBy,resData.assignedEmployee,resData.tokens);
         tx1.wait();
         console.log('transaction hash of task TranferTokens :'+tx1.hash);
         const receipt = await provider.getTransactionReceipt(tx1.hash);
         console.log('receptis: ' +receipt);
      // const web3 = new Web3(window.ethereum);
      // await window.ethereum.request({method:'eth_requestAccounts'});
      // const newTaskContract = new web3.eth.Contract(abi.abi,taskContractAddress);
      // const Data=await newTaskContract.methods.transferTokens(resData.assignedBy,resData.assignedEmployee,resData.tokens).call({from: resData.assignedBy})
      // console.log('data is : '+Data);
      }
   catch(error){
      console.log('error in approvaltrnasfer: '+error)
   }
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
               {/* {resData.inprogress=='true'&&resData.completed=='true'&&resData.approved=='true'&&
               <button className='button-style' onClick={()=>changeToCompleted()}>Change to Approved</button>
               } */}
               {
                  resData.completed=='true'&& resData.verified=='false'&& isManager &&
                  <button className="button-style" onClick={()=>changeToVerified()}>Change to Verified</button> 
                  
               }
               {     
                  resData.verified=='true'&& resData.approved=='false'&&
                  <div>
                  <button className="button-style" onClick={()=>changeToApproved()}>Approve</button>
               
                  <br></br>
                  <br/>
                  <div style={{color:'red'}}>Awaiting Approval</div>
                  </div>  
               }
               {
                  resData.approved=='true'&&
                  <div>
                  <div  >** Task Approved & Processed **</div>
                  {/* <button className="button-style" onClick={()=>TransferTokens()}>Transfer Tokens</button> */}
                  </div>
               }
              </div>
        </div>      
    </div>
   )
}

export default TaskDetails;