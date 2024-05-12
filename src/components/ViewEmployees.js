import { useEffect, useState } from "react";
import { AdminAccount,taskContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
import Web3 from "web3";
const ViewEmployees = ()=>{
    
    const [employeeData,setEmployeeData]=useState([]);


    const getEmployees =async ()=>{
        try{
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' })
                   
        const newTaskContract = new web3.eth.Contract(abi.abi,taskContractAddress);
        console.log('new contract call :'+newTaskContract);
        const employeesData=await newTaskContract.methods.getEmployees().call({from: AdminAccount})
        setEmployeeData(employeesData);
            console.log('returned: '+employeesData) 
            const employees = [];
            for (const employee of employeesData) {
                
                employees.push({
                    name: employee.name,
                    empWallet: employee.empWallet,
                    empID: employee.empID,
                });
            }
            console.log('Employees:', employees);  
        }
        catch(error){
            console.log('Error in View Employees :'+JSON.stringify(error))
        }
    }

    useEffect(()=>{
        getEmployees();
    },[])
    

    return(
        <div style={{margin:"auto",width:"50%"}}>
           <table style={{border:"1px solid black"}}>
           <thead>
           <tr style={{border:"1px solid black"}}>
              <th style={{border:"1px solid black"}}>Employee Name</th>
              <th style={{border:"1px solid black"}}>Employee Address</th>
              <th style={{border:"1px solid black"}}>Employee ID</th>
           </tr>
          </thead>
          <tbody>
          {employeeData.map((emp,key)=>
            <tr key={key} style={{border:"1px solid black"}}>
            <td style={{border:"1px solid black"}}>{emp.name}</td>
            <td style={{border:"1px solid black"}}>{emp.empWallet}</td>
            <td style={{border:"1px solid black"}}  >{emp.empID}</td>
            </tr>
          )
          }
          </tbody>
          </table>
        </div>
        
    )
}

export default ViewEmployees;