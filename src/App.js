import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Body from './components/Body';
import MainContainer from './components/MainContainer';
import Register from './components/Register';
import ViewTeams from './components/ViewTeam';
import ViewEmployees from './components/ViewEmployees';
import AddNewManager from './components/AddNewManager';
import ViewManagersData from './components/ViewManagersData';
import CreateTeams from './components/CreateTeams';
import CreateTask from './components/CreateTask';
import ViewTasks from './components/ViewTasks';
import MyTeam from './components/MyTeam';
import MyTasks from './components/MyTask';
import VerifyApproveTask from './components/VerifyApproveTask';
import RedeemTokens from './components/RedeemTokens';
import ApprovedProccessed from './components/ApprovedProcessed';

import { useDispatch } from 'react-redux';
import { addManagers, addUser } from './utils/UserSlice';
import { taskContractAddress } from './utils/constants';
import abi from './utils/NewTask.json';

const { ethers } = require('ethers');

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainContainer />,
    children: [
      { path: '/', element: <Body /> },
      { path: 'register', element: <Register /> },
      { path: 'viewteams', element: <ViewTeams /> },
      { path: 'viewemployees', element: <ViewEmployees /> },
      { path: 'addnewmgr', element: <AddNewManager /> },
      { path: 'viewmgrs', element: <ViewManagersData /> },
      { path: 'createteams', element: <CreateTeams /> },
      { path: 'createtask', element: <CreateTask /> },
      { path: 'viewtasks', element: <ViewTasks /> },
      { path: 'myteam', element: <MyTeam /> },
      { path: 'mytasks', element: <MyTasks /> },
      { path: 'verifyapprove', element: <VerifyApproveTask /> },
      { path: 'redeemtokens', element: <RedeemTokens /> },
      { path: 'tasksapprovedprocessed', element: <ApprovedProccessed /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const userAddress = accounts[0];
        const contract = new ethers.Contract(taskContractAddress, abi.abi, signer);

        const managers = await contract.getManagers();

        dispatch(addManagers(managers)); 
        dispatch(addUser(userAddress));  

        setIsLoggedIn(true);
        localStorage.setItem("dapp_logged_in", "true");

        window.ethereum.on('accountsChanged', () => {
          localStorage.removeItem("dapp_logged_in");
          window.location.reload();
        });
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.log('Error connecting MetaMask:', error);
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("dapp_logged_in");
    if (loggedIn) {
      connectWallet();
    }
  }, []);

  const handleLoginClick = () => {
    connectWallet();
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div style={{ marginTop: '30vh', textAlign: 'center' }}>
          <h2>Welcome to the Task Management DApp</h2>
          <button onClick={handleLoginClick} className="button-style">
            Connect with MetaMask
          </button>
        </div>
      ) : (
        <RouterProvider router={appRouter} />
      )}
    </div>
  );
}

export default App;
