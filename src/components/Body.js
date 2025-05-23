import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { tokenContractAddress, AdminAccount } from "../utils/constants";
import abi1 from '../utils/Token.json';
import GetbalanceOf from './GetbalanceOf';

const { ethers } = require('ethers');

const Body = () => {
  const isAdmin = useSelector(state => state.user.isAdmin);
  const [balanceOf, setBalanceOf] = useState(null);
  const [mintValue, setMintValue] = useState(0);

  const getBalanceOfUser = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = signer.address;
      const balance = await GetbalanceOf(address);
      setBalanceOf(balance);
    } catch (err) {
      console.error("Failed to get balance", err);
    }
  };

  const mintCoins = async (e) => {
    e.preventDefault();
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(tokenContractAddress, abi1.abi1, signer);
      const tx = await contract.mint(AdminAccount, mintValue);
      console.log('Minted! Transaction hash:', tx.hash);
      window.location.reload();
    } catch (error) {
      console.log('Error while minting tokens:', error);
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      getBalanceOfUser();
    }
  }, []);

  return (
    <div>
    <br></br>
      <div style={{ fontWeight: 'bold' }}>
        {balanceOf !== null ? (
          <>Balance Tokens ▶︎ : {balanceOf.toString()} TTKK</>
        ) : (
          <>Loading balance...</>
        )}
      </div>

      <br /><br />

      {isAdmin && (
        <div>
          <form onSubmit={mintCoins}>
            <div className="form-style">
              <div>Mint Tokens</div>
              <br />
              <input
                className="input-style"
                type="number"
                min='0'
                placeholder="tokens"
                onChange={(e) => setMintValue(e.target.value)}
              />
              <button type='submit' className="button-style">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Body;
