import hre from "hardhat";

async function main() {
    const Thrive = await hre.ethers.getContractFactory("Thrive");
    const thrive = await Thrive.deploy();
    await thrive.waitForDeployment();

    console.log("Contract deployed to: ", await thrive.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });