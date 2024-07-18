# Thrive  

## Thrive is a decentralized crowdfunding application where developers can share their project ideas and receive Ethereum (ETH) contributions from supporters as a token of appreciation.  
![Thrive](https://github.com/user-attachments/assets/c7b7d706-e2cd-46f9-b89f-0a9b0d0d0ca0)

## Overview  
Thrive is built to support developers in bringing their innovative ideas to life by providing a platform where they can present their projects and receive funding from the community. Users can browse various campaigns, learn about different projects, and contribute ETH to the ones they find promising.  
Currently Thrive uses sepolia testnet.

## Features
Developers can create and manage their campaigns.  
Supporters can browse through campaigns and contribute ETH.  
Transparent and secure transactions using smart contracts.  
User-friendly interface built with React and TailwindCSS.  

## Technologies Used  
Hardhat: For compiling and deploying smart contracts.  
React: For building the user interface.  
TailwindCSS: For styling the application.  
JavaScript: For frontend logic.  
HTML: For structuring the web pages.  
Ether.js: For interacting with the Ethereum blockchain.  

## Installation  
Clone the repository:  
```bash
git clone https://github.com/your-username/thrive.git
cd thrive
```

Install dependencies:
```bash
cd client
npm install
cd ../web3
npm install
```

Compile the smart contracts:
```bash
npx hardhat compile
```

Deploy the smart contracts:
```bash
npx hardhat run scripts/deploy.js --network your-network
```

Start the development server:
```bash
cd client
npm run dev
```

## Usage  
Navigate to the application in your web browser.  
Connect your Ethereum wallet using MetaMask or any other web3 wallet.  
Browse through the available campaigns.  
Create a new campaign by providing the necessary details.  
Contribute ETH to your preferred campaigns.  
Contributing  

## We welcome contributions to Thrive! To contribute:  

Fork the repository.   

Create a new branch with your feature or bugfix:    
```bash
git checkout -b feature-name
```

Commit your changes:   
```bash
git commit -m "Add new feature"
```

Push to the branch:  
```bash
git push origin feature-name
```

Create a pull request.

## License
This project is licensed under the MIT License.

# Feel free to customize this README further to suit your project's needs!
