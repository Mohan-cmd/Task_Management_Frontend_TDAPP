import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
const HeaderComp=()=>{
  const accountData = useSelector(store => store.user.userAccount);
  const isAdmin = useSelector(store => store.user.isAdmin);
  const isManager = useSelector(store => store.user.isManager);
  //  console.log('hurry got account :'+accountData)
  //  console.log('is Admin: '+isAdmin);
  //  console.log('is Manager: '+isManager);
    // const [bgColor,setBgColor]=  useState(
    //   {
    //     // home:'white',
    //     // register:'white',
    //     // viewEmployees: 'white',
    //     // addnewMgr: 'white',
    //     // viewMgrs: 'white',
    //     // createTeams : 'white',
    //     // viewTeams : 'white',
    //     // createTask : 'white',
    //     // viewTask : 'white',
    //     // myTeam :'white',
    //     // verifyApprove :'white',
    //     // myTasks :'white',
    //     // tasksApprovedProcessed :'white',
    //     // redeemTokens : 'white'
    // //   }
    // )
    const [selectedButton,setSelectedButton] = useState('');

    const handleClick= (buttonName)=>{
     setSelectedButton(buttonName);
    }
  return(
    <div>
    {isAdmin && <div style={{fontWeight:'bold',fontSize:'27px'}}>Admin Dashboard</div>}
    {isManager && <div style={{fontWeight:'bold',fontSize:'27px',color:"coral"}}>Manager Dashboard</div>}
    {!isManager && !isAdmin && <div style={{fontWeight:'bold',fontSize:'27px'}}>Employee Dashboard</div>}
    <div className="App-header">
    {<Link to='/' className="button-style" style={{backgroundColor: selectedButton==='home' ? 'coral': 'white'}} onClick={()=> handleClick('home')}> Home</Link>}
    {isAdmin&&<Link to="/register" className="button-style" style={{backgroundColor: selectedButton === 'register' ? 'coral':'white'}} onClick={()=>handleClick('register')}>Register</Link>}
    {isAdmin&&<Link to="/viewemployees" className="button-style" style={{backgroundColor: selectedButton === 'viewEmployees' ? 'coral':'white'}} onClick={()=>handleClick('viewEmployees')}>View Employees</Link>}
    {isAdmin&&<Link to="/addnewmgr" className="button-style" style={{backgroundColor: selectedButton === 'addNewMgr' ? 'coral':'white'}} onClick={()=>handleClick('addNewMgr')}>Add New Manager</Link>}
    {isAdmin&&<Link to="/viewmgrs" className="button-style" style={{backgroundColor: selectedButton === 'viewMgrsData' ? 'coral':'white'}} onClick={()=>handleClick('viewMgrsData')}>View Managers Data</Link>}
    {isAdmin&&<Link to="/createteams" className="button-style" style={{backgroundColor: selectedButton === 'createTeams' ? 'coral':'white'}} onClick={()=>handleClick('createTeams')}>Create Teams</Link>}
    {isAdmin&&<Link to="/viewteams" className="button-style" style={{backgroundColor: selectedButton === 'viewTeams' ? 'coral':'white'}} onClick={()=>handleClick('viewTeams')}>View Teams</Link>}
    {isManager&&<Link to="/createtask" className="button-style" style={{backgroundColor: selectedButton === 'createTask' ? 'coral':'white'}} onClick={()=>handleClick('createTask')}>CreateTask</Link>}
    {isManager&&<Link to="/viewtasks" className="button-style" style={{backgroundColor: selectedButton === 'viewTasks' ? 'coral':'white'}} onClick={()=>handleClick('viewTasks')}>View Tasks</Link>}
    {isManager&&<Link to="/myteam" className="button-style" style={{backgroundColor: selectedButton === 'myTeam' ? 'coral':'white'}} onClick={()=>handleClick('myTeam')}>My Team</Link>}
    {isManager&&<Link to="/verifyapprove" className="button-style" style={{backgroundColor: selectedButton === 'verifyandApprove' ? 'coral':'white'}} onClick={()=>handleClick('verifyandApprove')}>Verify & Approve Tasks</Link>}
    {(!isAdmin && !isManager)&& <Link to="/mytasks" className="button-style" style={{backgroundColor: selectedButton === 'myTasks' ? 'coral':'white'}} onClick={()=>handleClick('myTasks')}>My Tasks</Link>}
    {/* {(!isAdmin && !isManager)&& <Link to="/taskpendingppproval" className="button-style">Tasks Pending Approval</Link>} */}
    {(!isAdmin && !isManager)&& <Link to="/tasksapprovedprocessed" className="button-style" style={{backgroundColor: selectedButton === 'tasksAppProce' ? 'coral':'white'}} onClick={()=>handleClick('tasksAppProce')}>Tasks Approved & Processed</Link>}
    {(!isAdmin && !isManager)&& <Link to="/redeemtokens" className="button-style" style={{backgroundColor: selectedButton === 'redeemTokens' ? 'coral':'white'}} onClick={()=>handleClick('redeemTokens')}>Redeem Tokens</Link>}
    </div>
    </div>
  )
}

export default HeaderComp;