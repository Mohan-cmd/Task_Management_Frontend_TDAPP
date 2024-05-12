import { useSelector } from "react-redux";
import Web3 from "web3";
import { taskContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
import { useState,useEffect } from "react";

// const {ethers} = require('ethers');
// import { useSelector } from "react-redux";
const ethers = require('ethers');
const ViewTasks = ()=>{
//    const userAddress = useSelector(state=>state.user.userAccount);
   const[useraccAddress,setUseraccAddress] = useState();
   const[taskData,setTaskData]=useState([]);
   let values=[];
    const getTask =async ()=>{
     try{
        if(window.ethereum){
            //const web3 = new Web3(window.ethereum);
           
            // const newTaskContract = new web3.eth.Contract(abi.abi,taskContractAddress) 
            // await window.ethereum.request({ method: 'eth_requestAccounts' }).then(function (accounts){
            //      const userAccount =accounts[0];
            //      setUseraccAddress(userAccount);
            //      console.log('userAccount: '+userAccount);
            // })
            // const teamData = await newTaskContract.methods.getManagerTasks(useraccAddress).call({from : useraccAddress});
            // console.log('task dat is :'+ teamData);
                await window.ethereum.request({method: 'eth_requestAccounts'});
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();

                const contract = await new ethers.Contract(taskContractAddress,abi.abi,signer);
                let teamData = await contract.getManagerTasks(signer);
                const dataArray = [];
                teamData=teamData.toString();
                console.log('Hello'+teamData.toString())
                // for (const [key, value] of Object.entries(teamData)) {
                //     dataArray.push(value.split(','));
                // }

                // console.log(dataArray);
            //     console.log('hello'+Object.entries(teamData));
            //     console.log('team data si :' +typeof(teamData));
            values = await teamData.split(',');
            console.log('values: '+values);
            let tasks =[];
             for(let i=0; i<values.length;i +=12){
                // console.log(values[i]);
                tasks.push(createTaskObj(i));
             }
             console.log('task is: '+tasks.length);
            setTaskData(tasks);
        }
     }
     catch(error){
        console.log('Error in ViewTasks: '+error)
     }
    }
    const createTaskObj = (startIndex)=>{
        return{
            taskId: values[startIndex],
            title: values[startIndex + 1],
            description: values[startIndex + 2],
            assignedEmployee: values[startIndex + 3],
            assignedBy: values[startIndex + 4],
            complexity: values[startIndex + 5],
            deadline: values[startIndex + 6],
            tokens: values[startIndex + 7],
            inprogress: values[startIndex + 8],
            completed: values[startIndex + 9],
            verified: values[startIndex + 10],
            approved: values[startIndex + 11]
        }
    }
    useEffect(()=>{getTask()},[])
    return(
        <div>
            <table className="table-border">
                <thead className="table-border">
                    <tr className="table-border">
                    <th className="table-border">TaskID</th>
                    <th className="table-border">taskName</th>
                    <th className="table-border">TaskDescription</th>
                    <th className="table-border">Assigned By</th>
                    <th className="table-border">Assigned To</th>
                    <th className="table-border">Task Complexity</th>
                    <th className="table-border">Task Created Date</th>
                    <th className="table-border">Tokens Assigned</th>
                    <th className="table-border">Task Completed</th>
                    <th className="table-border">Task Verified</th>
                    <th className="table-border">Approved & Processed</th>
                    </tr>
                </thead>
                <tbody className="table-border">
                {taskData.length>0 &&
                    taskData.map((data,key)=>
                    <tr className="table-border" key={key}>
                    <td className="table-border" >{data.taskId}</td>
                    <td className="table-border" >{data.title}</td>
                    <td className="table-border" >{data.description}</td>
                    <td className="table-border" >{data.assignedEmployee}</td>
                    <td className="table-border" >{data.assignedBy}</td>
                    <td className="table-border" >{data.complexity}</td>
                    <td className="table-border" >{data.deadline}</td>
                    <td className="table-border" >{data.tokens}</td>
                    <td className="table-border" >{data.completed}</td>
                    <td className="table-border" >{data.verified}</td>
                    <td className="table-border" >{data.approved}</td>
                    </tr>
                  )
                   
                }    
                </tbody>
            </table>
        </div>
    )
}

export default ViewTasks;