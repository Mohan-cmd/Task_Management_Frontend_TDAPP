import { useState } from "react";
//import { ethers } from "ethers";
import { RPC_URl,tokenContractAddress,taskContractAddress,prvk,AdminAccount } from "../utils/constants";
import abi from '../utils/NewTask.json';
const ethers = require("ethers")
const contractAddress = taskContractAddress; // Replace with your contract address

const Register = () => {
    const [name, setName] = useState('');
    const [waddress, setWaddress] = useState('');

    const submitRegistration = async (e) => {
        e.preventDefault();
        console.log("name:", name, "address:", waddress);

        try {
            if (window.ethereum) {
                // Create a Web3Provider from the injected Ethereum provider
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                console.log('signers:'+JSON.stringify((signer)));
                // Instantiate your contract
                const contract = await new ethers.Contract(contractAddress, abi.abi, signer);

                // Request access to user's MetaMask accounts
                //await window.ethereum.request({ method: 'eth_requestAccounts' });
                //console.log('hello')
                // Send transaction to register employee
                const tx = await contract.registerEmployee({name:name, empWallet:waddress, empID:123})
                await tx.wait(); // Wait for transaction to be mined
                console.log(JSON.stringify(tx));
                console.log('Transaction Hash:', tx.hash);
                //const eventLogs = tx.logs.map(log => contract.interface.parseLog(log));
                //console.log('logs: '+eventLogs);
                // const eventFilter = contract.filters.EmployeeRegistered();
                // const events = await contract.queryFilter(eventFilter);
                // console.log('Employee registration events:', events);
                alert('Employee registered successfully!');
                //const filter = contract.filters.MessageLogged(null, null); // Filter events
                //const events = await contract.queryFilter(filter);
                //console.log('events: '+events);
            }
        } catch (error) {
            console.error('Error registering employee:', error);
            if (error?.revert?.args[0]) {
                const errorMessage = error.revert.args[0];
                alert('Revert reason: '+errorMessage)
               // console.error('Revert reason:', errorMessage);
            }else if(error?.operation=='getEnsAddress'){
                alert('Revert reason: '+'invalid employee address')
            }
        }
    };

    return (
        <form onSubmit={submitRegistration}>
            <div className="form-style">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input-style" />
                <input type="text" placeholder="Wallet Address" value={waddress} onChange={(e) => setWaddress(e.target.value)} className="input-style" />
                <button type="submit" className="button-style">Submit</button>
            </div>
        </form>
    );
};

export default Register;
