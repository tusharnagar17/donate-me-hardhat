import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
// import { connectToContract } from "../service/ContractService";
import abi from "./contracts/DonateMe.json";

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    async function setupContract() {
      // contract address and contract abi
      const deployedContractAddress =
        "0x36e9133E718c5d01FCE037a1BF3CE9B81090b341";
      const ContractAbi = abi.abi;
      const { ethereum } = window;
      try {
        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
        }
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          deployedContractAddress,
          abi.abi,
          signer
        );
        setState({ provider, signer, contract });
        console.log(state);
      } catch (error) {
        console.log(error.message);
      }
    }

    setupContract();
  }, []);
  return (
    <div>
      <h1>Main App</h1>
    </div>
  );
};

export default App;
