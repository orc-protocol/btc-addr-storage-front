import React, { useState } from 'react';
import Web3 from 'web3';

const CONTRACT_ABI = []; // Paste your contract ABI here
const CONTRACT_ADDRESS = ''; // Paste your contract address here

function App() {
  const [btcAddress, setBtcAddress] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputBTCAddress, setInputBTCAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Please install MetaMask to use this dApp!');
    }
  };

  const storeBTCAddress = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const accounts = await web3.eth.getAccounts();

      try {
        await contract.methods.storeBTCAddress(btcAddress).send({ from: accounts[0] });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getBTCAddressByAddress = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

      try {
        const result = await contract.methods.getBTCAddressByAddress(inputAddress).call();
        console.log('BTC Address:', result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getAddressByBTCAddress = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

      try {
        const result = await contract.methods.getAddressByBTCAddress(inputBTCAddress).call();
        console.log('Address:', result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Store your BTC Address</h2>
      <input
        type="text"
        placeholder="Enter your BTC address"
        value={btcAddress}
        onChange={(e) => setBtcAddress(e.target.value)}
      />
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={storeBTCAddress}>Submit</button>
      <hr />
      <input
        type="text"
        placeholder="Enter address"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      <button onClick={getBTCAddressByAddress}>Get BTC Address</button>
      <hr />
      <input
        type="text"
        placeholder="Enter BTC address"
        value={inputBTCAddress}
        onChange={(e) => setInputBTCAddress(e.target.value)}
      />
      <button onClick={getAddressByBTCAddress}>Get Address</button>
    </div>
  );
}

export default App;
