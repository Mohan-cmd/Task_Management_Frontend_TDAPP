import { taskContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import moment from 'moment';
const {ethers} = require('ethers');

const CreateTask =()=>{
    const[getEmpdata,setgetEmpdata]=useState();
    const[teamData,setTeamData]=useState([]);
    const[selectedEmp,setSelectedEmployee]= useState('Select');
    const signedInUser = useSelector((state)=>state.user.userAccount);
    let userLoggedIn;
    let formattedDate='';
    console.log('sign'+signedInUser);
    console.log('teamData'+teamData);
    const createTaskSubmit= async (e)=>{
        e.preventDefault();
       console.log(e.target[4].value)
       formattedDate = await parseInt(moment(e.target[4].value).format('YYYYMMDD'));
       console.log('formateddate'+parseInt(formattedDate));
       console.log('data is :'+e.target[0].value,e.target[1].value,signedInUser,selectedEmp,e.target[3].value,e.target[4].value,e.target[5].value,e.target[6].value);
       //createTask(string memory _title,string memory _description, address _assignedEmployee,uint _complexity,uint _deadline,uint _tokens)
       try{
       if(window.ethereum){
        //    await window.ethereum.request({method:'eth_requestAccounts'}).then(
        //     function(accounts){
        //         userLoggedIn=accounts[0];
        //     }
        //    );
           const provider = new ethers.BrowserProvider(window.ethereum);
           const signer = await provider.getSigner();
           userLoggedIn=signer;
           const contract = new ethers.Contract(taskContractAddress,abi.abi,userLoggedIn);
           //createTask(string memory _title,string memory _description,address _assignedByMgr, address _assignedEmployee,uint _complexity,uint _deadline,uint _tokens)
        console.log('actual data: ')
           console.log(e.target[5].value);
           const tx = await contract.createTask(e.target[0].value,e.target[1].value,userLoggedIn,Web3.utils.toChecksumAddress(selectedEmp),parseInt(e.target[3].value),formattedDate,e.target[5].value);
           tx.wait();
            console.log(JSON.stringify(tx));
            console.log('transaction hash of Create task is : '+tx.hash);
            alert('Task Created Successfully');
       }
    }
    catch(error){
        console.log('error in Create Task: '+error);
    }
    }
    const getEmployeesdrp=async ()=>{
        await window.ethereum.request({method:'eth_requestAccounts'});
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(taskContractAddress,abi.abi,signer);
        const tx = await contract.hash;
    }
    const getEmployeesData= async()=>{
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({method:'eth_requestAccounts'})
        .then(function (accounts){
            userLoggedIn=accounts[0];
        });
        const newTaskContract = new web3.eth.Contract(abi.abi,taskContractAddress);
        const teamData=await newTaskContract.methods.viewTeam(userLoggedIn).call({from: userLoggedIn});
        setTeamData(teamData);
        console.log('team data is : '+teamData);
    
    }
    const getselectedEmployee = (e)=>{
        console.log('selected emp is: '+ e.target.value);
              setSelectedEmployee(e.target.value)
    }
    
    useEffect(()=>{
            // if(window.ethereum){
            //     await window.ethereum.request({method: 'eth_requestAccounts'});
            //     const provider = new ethers.BrowserProvider(window.ethereum);
            //     const signer = await provider.getSigner();
            //     const contract = new ethers.Contract(taskContractAddress,abi.abi,signer);
            //     const data = await contract.get
            // }
            // if(window.ethereum){
            // await window.ethereum.request({method:'eth_requestAccounts'});
            // const provider = new ethers.BrowserProvider(window.ethereum);
            // const signer = await provider.getSigner();
            // const contract = new ethers.Contract(taskContractAddress,abi.abi,signer);
            // const data= await contract.getEmployees();
            // console.log('data is : '+data);
            // const teamData=await contract.viewTeam('0xE75Ca94c2B31dF5bABfbAe227C4B638c3823c00B')
            // console.log('team data is : '+JSON.stringify(teamData));
            // //const str=JSON.parse(teamData);
            // console.log('team data is: '+teamData.data);
            getEmployeesData();
            
    },[])
 return(
    <div>
        <form onSubmit={createTaskSubmit}>
            <div className="form-style-new">
            <label>Title</label>
            <input className="input-style"></input>
            <label>Description</label>
            <textarea className="input-style"></textarea>    
            <label>Assigned Employee</label>
            <select className="input-style" value={selectedEmp} onChange={getselectedEmployee}>
                <option disabled={true} value="Select">Select Employee Address</option>
                {teamData.map((data,key)=><option key={key} value={data}>{data}</option>)}
            </select>
            <label>Complexity</label>
            <input className="input-style" type="number" min='0' style={{overflow:'hidden'}}></input>
            <label>Deadline</label>
            <input className="input-style" type="date"></input>
            <label>Tokens</label>
            <input className="input-style" type="number" min='0' style={{overflow:'hidden'}}></input> 
            <button type="submit" className="button-style">Submit</button>
            </div>
        </form>
    </div>
 )
}

export default CreateTask;