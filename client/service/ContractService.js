// ContractService.js
import { ethers } from "ethers";
import MyContractArtifact from "./../src/contracts/DonateMe.json"; // Replace with your contract artifact path

const contractAddress = "0x36e9133E718c5d01FCE037a1BF3CE9B81090b341"; // Replace with your deployed contract address

async function connectToContract() {
  const { ethereum } = window;
  if (ethereum) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  }
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    MyContractArtifact.abi,
    signer
  );
  return contract;
}

export { connectToContract };
