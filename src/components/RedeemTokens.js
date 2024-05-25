import { useEffect, useState } from "react";
import GetbalanceOf from "./GetbalanceOf";
import { tokenContractAddress } from "../utils/constants";
import abi1 from '../utils/Token.json';
import { imageTag } from "../utils/constants";
import { StoreObject } from "../utils/StoreObject";
import Popup from "reactjs-popup";
import PurchaseItem from "./PurchaseItem";
const ethers = require('ethers');

const RedeemTokens=()=>{
    const[userLoggedIn,setUserLoggedIn]=useState();
    const[balanceTokens,setBalanceTokens]=useState(0);
   //let UserLoggedIn;
    const getUserAccountAddress= async ()=>{
         try{
            const provider =new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            await setUserLoggedIn(signer.address);
            // const tokenContract = new ethers.Contract(tokenContractAddress,abi1.abi1,userLoggedIn);

            // const balance = await tokenContract.balanceOf(userLoggedIn);
            // console.log('token balance of '+userLoggedIn+' is : '+balance);
            const balance=await GetbalanceOf(signer.address);
            console.log(typeof(balance))
            setBalanceTokens(balance);
            console.log(StoreObject.data[0])
         }
         catch(error){
            console.log('Error in Redeem Tokens: '+error);
         }
    }
   
    useEffect(()=>{
        getUserAccountAddress();
    },[])

    return(
        <div>
           <div style={{fontWeight:'bold'}}>Balance Tokens of the user is  ▶︎ : {balanceTokens.toString()}</div>
           <br/>
           <br/>
           <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',margin:'auto',width:'90%'}}>
             { StoreObject.data.map((val,key)=>
                <div  >
                    <div key={key} id={key} style={{border:'1px solid black',width:'200px',height:'300px'}}>
                       
                        <div>
                        <div>
                            <img src={val.image_URL} style={{width:'150px'}}></img>
                        </div>
                        <div>
                           {val.name}
                        </div>
                        <div>
                            Tokens Required : {val.Tokens_Required}
                        </div>
                        <Popup trigger={
                        <div>
                            <button className="button-style" >Redeem</button>
                        </div>
                        
                        }modal nested>
                           {
                            close =>(
                                <div key={key} style={{margin:'50px',width:'900px',background:'grey',height:'600px',display:'flex',justifyContent:'center',alignItems:'center',opacity:'0.95'}}>
                                        
                                        <div style={{height:'500px',width:'700px', backgroundColor:'lightblue'}}>
                                        <div>
                                         <PurchaseItem data={StoreObject.data[key]} balance={balanceTokens} loggedIn={userLoggedIn}></PurchaseItem>
                                         
                                        <button className='button-style' onClick={() => close()}>
                                                    Close
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                            )
                           }
                        </Popup> 
                        </div>
                    </div>
                </div>
             )}
           </div>
        </div>
    )
}

export default RedeemTokens;