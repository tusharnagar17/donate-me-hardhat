const hre = require("hardhat");

async function main() {
  const DonateMeContract = await hre.ethers.getContractFactory("DonateMe");
  const contract = await DonateMeContract.deploy();

  await contract.waitForDeployment();
  console.log("Contract address : ", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
