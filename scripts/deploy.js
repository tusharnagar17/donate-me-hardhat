// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// 1. getBalance - a specific address.
// 2. consoleBalance - iterate no. of address to return their balance via getBalance
// 3. getAllDonor - function to iterate over Donor array in smart contract.
async function getBalance(address) {
  try {
    const BalanceInWei = await hre.ethers.provider.getBalance(address);
    const BalanceInEther = hre.ethers.formatEther(BalanceInWei);
    return BalanceInEther;
  } catch (error) {
    console.log("Error:");
    console.log(error.message);
  }
}

async function consoleBalance(addresses) {
  let count = 0;
  for (const account of addresses) {
    // console.log("consoling address", account.address);
    console.log(`At ${count} has : `, await getBalance(account));
    count++;
  }
}

function getAllDonor(data) {
  for (const ptr of data) {
    console.log(
      `At ${ptr.timestamp}, name: ${ptr.name}, address: ${ptr.from}, message: ${ptr.message}`
    );
  }
}

async function main() {
  // get owner, from1, from2, from3 --fake addresses.
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();

  const allAccount = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];

  // Before buying
  consoleBalance(allAccount);

  // step
  // 1.deploy
  console.log("Contract Owner :", owner.address);
  const contract = await hre.ethers.deployContract("DonateMe");

  // 2. wait for deployed.
  await contract.waitForDeployment();

  console.log(
    "Contract is deployed at address : ",
    await contract.getAddress()
  );
  // run specific funtion on chain in hardhat node.
  const amount = { value: hre.ethers.parseEther("1") };
  await contract.connect(from1).Donate("from1", "Very nice chai", amount);
  await contract.connect(from2).Donate("from2", "Very nice course", amount);
  await contract
    .connect(from3)
    .Donate("from3", "Very nice information", amount);
  // After buying

  consoleBalance(allAccount);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
