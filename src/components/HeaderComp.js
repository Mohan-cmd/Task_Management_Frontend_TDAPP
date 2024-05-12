import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const HeaderComp=()=>{
  const accountData = useSelector(store => store.user.userAccount);
  const isAdmin = useSelector(store => store.user.isAdmin);
  const isManager = useSelector(store => store.user.isManager);
  //  console.log('hurry got account :'+accountData)
  //  console.log('is Admin: '+isAdmin);
  //  console.log('is Manager: '+isManager);
  return(
    <div className="App-header">
    {isAdmin&&<Link to="/register" className="button-style">Register</Link>}
    {isAdmin&&<Link to="/viewemployees" className="button-style">View Employees</Link>}
    {isAdmin&&<Link to="/addnewmgr" className="button-style">Add New Manager</Link>}
    {isAdmin&&<Link to="/viewmgrs" className="button-style">View Managers Data</Link>}
    {isAdmin&&<Link to="/createteams" className="button-style">Create Teams</Link>}
    {isAdmin&&<Link to="/viewteams" className="button-style">View Teams</Link>}
    {isManager&&<Link to="/createtask" className="button-style">CreateTask</Link>}
    {isManager&&<Link to="/viewtasks" className="button-style">View Tasks</Link>}
    {isManager&&<Link to="/myteam" className="button-style">My Team</Link>}
    {(!isAdmin && !isManager)&& <Link to="/mytasks" className="button-style">My Tasks</Link>}
    {/* {(!isAdmin && !isManager)&& <Link to="/taskpendingppproval" className="button-style">Tasks Pending Approval</Link>} */}
    {(!isAdmin && !isManager)&& <Link to="/tasksapprovedprocessed" className="button-style">Tasks Approved & Processed</Link>}
    </div>
  )
}

export default HeaderComp;