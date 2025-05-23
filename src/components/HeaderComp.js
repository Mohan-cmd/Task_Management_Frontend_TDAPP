import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HeaderComp.css"; // Import external CSS

const HeaderComp = () => {
  const accountData = useSelector(store => store.user.userAccount);
  const isAdmin = useSelector(store => store.user.isAdmin);
  const isManager = useSelector(store => store.user.isManager);
  const [selectedButton, setSelectedButton] = useState("");

  const handleClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div>
    <br></br>
    <div className="dashboard-title">
        {isAdmin && "Admin Dashboard"}
        {isManager && "Manager Dashboard"}
        {!isManager && !isAdmin && "Employee Dashboard"}
      </div>
    <div className="header-wrapper">
      

      <div className="nav-links">
        <Link to="/" className={selectedButton === 'home' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('home')}>Home</Link>

        {isAdmin && (
          <>
            <Link to="/register" className={selectedButton === 'register' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('register')}>Register</Link>
            <Link to="/viewemployees" className={selectedButton === 'viewEmployees' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('viewEmployees')}>View Employees</Link>
            <Link to="/addnewmgr" className={selectedButton === 'addNewMgr' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('addNewMgr')}>Add New Manager</Link>
            <Link to="/viewmgrs" className={selectedButton === 'viewMgrsData' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('viewMgrsData')}>View Managers</Link>
            <Link to="/createteams" className={selectedButton === 'createTeams' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('createTeams')}>Create Teams</Link>
            <Link to="/viewteams" className={selectedButton === 'viewTeams' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('viewTeams')}>View Teams</Link>
          </>
        )}

        {isManager && (
          <>
            <Link to="/createtask" className={selectedButton === 'createTask' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('createTask')}>Create Task</Link>
            <Link to="/viewtasks" className={selectedButton === 'viewTasks' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('viewTasks')}>View Tasks</Link>
            <Link to="/myteam" className={selectedButton === 'myTeam' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('myTeam')}>My Team</Link>
            <Link to="/verifyapprove" className={selectedButton === 'verifyandApprove' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('verifyandApprove')}>Verify & Approve</Link>
          </>
        )}

        {!isAdmin && !isManager && (
          <>
            <Link to="/mytasks" className={selectedButton === 'myTasks' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('myTasks')}>My Tasks</Link>
            <Link to="/tasksapprovedprocessed" className={selectedButton === 'tasksAppProce' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('tasksAppProce')}>Approved & Processed</Link>
            <Link to="/redeemtokens" className={selectedButton === 'redeemTokens' ? 'nav-btn active' : 'nav-btn'} onClick={() => handleClick('redeemTokens')}>Redeem Tokens</Link>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default HeaderComp;
