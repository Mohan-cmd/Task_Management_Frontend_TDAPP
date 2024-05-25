import { useSelector } from "react-redux";
import MainContainer from "./MainContainer";
import {useEffect,useState} from 'react';
import { taskContractAddress } from "../utils/constants";
import { tokenContractAddress } from "../utils/constants";
import abi from '../utils/NewTask.json';
import abi1 from '../utils/Token.json';
import GetbalanceOf from './GetbalanceOf';
import {AdminAccount} from '../utils/constants';
import { RPC_URl } from "../utils/constants";
import { api_key } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTransactionH } from "../utils/TransferSlice";
const {ethers} = require('ethers');
const Body=()=>{
 const isAdmin = useSelector(state=>state.user.isAdmin);
 const trans =  useSelector(state=>state.transfer.transactionHashs);
 //console.log('stored dats is: '+trans[0].fromAccount)
 
 const dispatch = useDispatch();
  const [balanceOf,setBalanceOf] = useState(0);
  const [mintValue,setMintValue] = useState(0);
  const [transData,getTrasData] = useState();
  // getTrasData(trans);
  const getBalanceOfUser =async ()=>{
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setBalanceOf(await GetbalanceOf(signer.address));

      getTransactionHistory();

      //console.log('balance of is : '+GetbalanceOf(signer.address));
      // const contract = new ethers.Contract(taskContractAddress,abi.abi,signer);
      // const tx = await contract.ba
      
  }

  const getTransactionHistory=()=>{
    const Web3 = require('web3');
    const web3 = new Web3(RPC_URl);

    const tokenAddress = tokenContractAddress;
    //const accountAddress = 'YourAccountAddress';  // Optional: use only if you want transactions for a specific account

    const minABI = [
        // ERC-20 Transfer event
        {
          "anonymous": false,
          "inputs": [],
          "name": "allEvents",
          "type": "event"
      }
    ];

    const contract = new web3.eth.Contract(minABI, tokenAddress);

    contract.getPastEvents(
        'allEvents',
        {	
          
            fromBlock: 7361122,
            toBlock: 7361123
        },
        (err, events) => {
            if (err) {
                console.error(err);
            } else {
                 console.log('events data : ')
                console.log(events);
                console.log(web3.utils.hexToNumberString(events[0].raw.data));
            }
        }
    );
  }

  const mintCoins = async (e)=>{
    e.preventDefault();

    try{
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(tokenContractAddress,abi1.abi1,signer);
    const tx= await contract.mint(AdminAccount,mintValue);
    console.log('transaction hash of Mint Tokens is : '+tx.hash);
     window.location.reload();
    }
    catch(error){
      console.log('Error while minting tokens : '+error);
    }
  }

  const getTransactionHis= async()=>{
    // console.log('transaction dat is:'+trans[0])
    // const Data= await fetch("https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash="+trans[0]+"&apikey="+api_key+"");
    // const json = await Data.json();
    // console.log('data is : '+JSON.stringify(json));

    const data = {fromAccount:'0xABCD',
      toAccount:'0xcdef',
      transactionHash:'0xtarsuahdba',
      transactionTokens:'1000'
    }
    await dispatch(addTransactionH(data))
    
    console.log('stored dats is: '+trans)

  }

 useEffect(()=>{
  getBalanceOfUser();
  //getTransactionHis();
 },[])
  return(
    <div>
        <div style={{fontWeight:'bold'}}>Balance Tokens  is  ▶︎ : {balanceOf.toString()} TTK</div>
        <br/>
        <br/>
        {isAdmin && 
          <div>
            <form onSubmit={(e)=>{mintCoins(e)}}>
              <div className="form-style">
              <div>Mint Tokens</div>
              <br></br>
              <input className="input-style" type="number" min='0' style={{overflow:'hidden'}} placeholder="tokens" onChange={(e)=>setMintValue(e.target.value)}></input>
              <button type='submit' className="button-style">Submit</button>
              </div>
            </form>
            <br/>
            <br/>
            {/* <div style={{fontWeight:'bold',fontSize:'20px'}}> Transaction History</div>
            <br/>
            <div style={{margin:"auto",width:'35%'}}>
                <table style={{border:"1px solid black"}}>
                <thead>
                  <tr style={{border:"1px solid black"}}>
                    <th style={{border:"1px solid black"}}>From Address</th>
                    <th style={{border:"1px solid black"}}>To Address</th>
                    <th style={{border:"1px solid black"}}>Transaction Hash</th>
                    <th style={{border:"1px solid black"}}>Token Transfered</th>
                  </tr>
                  
                </thead>
                <tbody>
                {trans.length>0 && trans.map((data,key)=>
                <tr key={key} style={{border:"1px solid black"}}>
                    <td style={{border:"1px solid black"}}> {data.fromAccount}</td>
                    <td style={{border:"1px solid black"}}> {data.toAccount}</td>
                    <td style={{border:"1px solid black"}}> {data.transactionHash}</td>
                    <td style={{border:"1px solid black"}}> {data.transactionTokens} </td>
                </tr>
                )
                }
                </tbody>
                </table>
            </div> */}
          </div>
          
        }
    </div>
  )
}

export default Body;