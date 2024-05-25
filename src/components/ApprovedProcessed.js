
import { useEffect,useState } from 'react';
import { taskContractAddress } from '../utils/constants';
import abi from '../utils/NewTask.json';
import Popup from 'reactjs-popup';
import TaskDetails from './TaskDetails';
const ethers= require('ethers');
let values=[];
const ApprovedProccessed= ()=>{
    const[taskData,setTaskData]=useState([]);
    // const[inprogressTasks,setInProgressTasks]=useState([]);
    // const[completedTasks,setCompletedTasks] =useState([]);
    const getData= async ()=>{
        await window.ethereum.request({method: 'eth_requestAccounts'});
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = await new ethers.Contract(taskContractAddress,abi.abi,signer);
        let teamData = await contract.getEmployeesTasks(signer);
        console.log(teamData);
        const dataArray = [];
        teamData=teamData.toString();
        console.log('Hello'+teamData.toString())
        values = await teamData.split(',');
            console.log('values: '+values);
            let tasks =[];
            for(let i=0; i<values.length;i +=12){
                //console.log(values[i]);
                tasks.push(createTaskObj(i));
            }
            setTaskData(tasks);
            
            console.log('task is: '+taskData);
    }

    const SelectedTask=(e)=>{
        
        console.log('trgetKey is : '+e)
     }

     useEffect(()=>{
        getData();
     },[])

   return(
    // <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
        
         
    //  <div>
        <div style={{flex:'1',padding:'20px',borderLeft:'1px solid black',borderRight:'1px solid black',marginLeft:'10px'}}>
                
        <div style={{marginBottom:'10px'}}>Tasks Approved & Processed</div>
        {taskData.map((data,key)=> 
            data.approved=='true'&&
                <div onClick={(e)=>SelectedTask(e)}>
                
                    <Popup trigger= {
                        <div key={key} style={{display:'inline-block',}} onClick={(e)=>SelectedTask(e)}> 
                            <div style={{display:'flex',alignItems:'flex-start',flexDirection:'column', border:'1px solid black',backgroundColor: 'lightblue', borderRadius:'10px',width:'100%',padding:'4px',marginBottom:'15px'}}>
                            <div>Task Name: {data.title}</div>
                            <div>Task Description: {data.description}</div>
                            <div style={{fontSize:'14px'}}>Assigned By: {data.assignedBy}</div>
                            <div>Assigned Tokens: {data.tokens}</div>
                            </div>
                        </div>
                    }modal nested>
                    {
                            close => (
                                <div key={key} style={{margin:'50px',width:'900px',background:'grey',height:'600px',display:'flex',justifyContent:'center',alignItems:'center',opacity:'0.95'}}>
                                    
                                    <div style={{height:'500px',width:'700px', backgroundColor:'lightblue'}}>
                                    <div>
                                    <TaskDetails resData={taskData[key]}></TaskDetails>
                                    <button className='button-style' style={{backgroundColor:'coral'}} onClick={() => close()}>
                                                Close
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            )
                        }
                    </Popup>
                </div>
    
    )}
    </div>
    // </div>
    // </div>
   )
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

export default ApprovedProccessed;