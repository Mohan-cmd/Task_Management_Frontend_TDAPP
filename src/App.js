import logo from './logo.svg';
import './App.css';
import HeaderComp from './components/HeaderComp';
import {Navigate, RouterProvider,createBrowserRouter} from 'react-router-dom';
import { Children, useEffect } from 'react';
import Body from './components/Body';
import MainContainer from './components/MainContainer';
import Register from './components/Register';
import ViewTeams from './components/ViewTeam';
import ViewEmployees from './components/ViewEmployees';
import AddNewManager from './components/AddNewManager';
import ViewManagersData from './components/ViewManagersData';
import CreateTeams from './components/CreateTeams';
import { addManagers } from './utils/UserSlice';
import { addUser } from './utils/UserSlice';
import { useDispatch } from 'react-redux';
import { taskContractAddress } from './utils/constants';
import abi from './utils/NewTask.json';
import CreateTask from './components/CreateTask';
import ViewTasks from './components/ViewTasks';
import MyTeam from './components/MyTeam';
import MyTasks from './components/MyTask';
import VerifyApproveTask from './components/VerifyApproveTask';
import RedeemTokens from './components/RedeemTokens';
import ApprovedProccessed from './components/ApprovedProcessed';

const {ethers} = require('ethers');

const appRouter =createBrowserRouter([
  {
    path:"/",
    element:<MainContainer/>,
    children:[
      {
        path:"/",
        element:<Body/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"viewteams",
        element:<ViewTeams/>
      },
      {
        path:"viewemployees",
        element:<ViewEmployees/>
      },
      {
        path:"addnewmgr",
        element:<AddNewManager/>
      },
      {
        path:"viewmgrs",
        element:<ViewManagersData/>
      },
      {
        path:"createteams",
        element:<CreateTeams/>
      },
      {
        path:"viewteams",
        element:<ViewTeams/>
      },
      {
        path:"createtask",
        element:<CreateTask/>
      },
      {
        path:"viewtasks",
        element:<ViewTasks/>
      },
      {
        path:'myteam',
        element:<MyTeam/>
      },
      {
        path:'mytasks',
        element:<MyTasks/>
      },
      {
        path:'verifyapprove',
        element:<VerifyApproveTask/>
      },
      {
        path:'redeemtokens',
        element:<RedeemTokens/>
      },
      {
        path:'tasksapprovedprocessed',
        element:<ApprovedProccessed/>
      }
    ]
  }
])
 function App() {
  const dispatch = useDispatch();
  const getUserAccount= async () =>{
  try{
  if(window.ethereum){
    const provider =  new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const user =JSON.stringify(signer);
    const userAddress = (JSON.parse(user)).address
    const contract = await new ethers.Contract(taskContractAddress,abi.abi,signer);
       //console.log(contract)
    const managers= await contract.getManagers();
    console.log('Managers data is : '+managers);
    await dispatch(addManagers(managers));
    await dispatch(addUser(userAddress));

    console.log('signer is : '+userAddress);
    window.ethereum.on('accountsChanged',async function(accounts){
      console.log('changed account is : '+accounts);
      window.location.reload();
      window.location.href='/';
   })

  }
  
  }
  catch(error){
    console.log('error in app comp: '+JSON.stringify(error));
  }
}
  // const accountChanged=()=>{
  //   if(window.ethereum){
  //     window.ethereum.on('accountsChanged',async function(accounts){
  //        console.log('changed account is : '+accounts);
  //     })
  //   }
  // }
  useEffect(()=>{
    getUserAccount()},[])
  return (
    
    <div className="App">
     
        <RouterProvider router={appRouter}>
        </RouterProvider>
      {/* </Provider>  */}
    </div>
    
  );
}

export default App;
