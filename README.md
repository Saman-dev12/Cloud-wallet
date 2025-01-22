# Cloud Wallet

## Overview
Cloud Wallet is a blockchain-based wallet application built on the Solana Devnet. This project provides users with a seamless and secure way to create and manage Solana wallets. Upon login, each user is automatically assigned a unique Solana wallet, and the platform enables a variety of essential wallet functionalities.

## Features
- **Automated Wallet Creation:** Automatically generates a new Solana wallet for users upon login.
- **Airdrop Solana:** Allows users to receive free Solana tokens on the Solana Devnet for testing purposes.
- **Transfer Solana:** Enables users to send Solana tokens to other wallets.
- **Transaction History:** Displays a detailed history of all past transactions.
- **Balance Check:** Allows users to view their current wallet balance in real time.

## Technologies Used
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Blockchain:** Solana Web3.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Saman-dev12/Cloud-wallet.git
   cd Cloud-wallet
   ```
2. Install dependencies for both the client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `server` directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=<Your MongoDB Connection String>
     JWT_SECRET=<Your JWT Secret>
     ```
4. Start the development server:
   ```bash
   cd server
   npm run dev
   ```
5. Start the client:
   ```bash
   cd client
   npm start
   ```

## Usage
1. Visit the application in your web browser.
2. Log in or sign up to create a new Solana wallet.
3. Use the dashboard to perform the following actions:
   - Airdrop Solana tokens.
   - Transfer Solana to other wallets.
   - View transaction history and check wallet balance.

## Future Improvements
- Integration with the Solana Mainnet.
- Multi-wallet support for advanced users.
- Improved analytics and reporting for transactions.
- Support for additional Solana-based tokens.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push to the branch:
   ```bash
   git push origin feature-name
   ```
4. Open a pull request describing your changes.

## License
This project is licensed under the [MIT License](LICENSE).

---

For any questions or support, please open an issue in the repository or contact me directly.
