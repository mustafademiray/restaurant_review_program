# Full-stack Solana DApp - README

Welcome to the **Full-stack Solana DApp** project repository! This decentralized application (DApp) leverages blockchain technology to implement a movie review platform on the Solana network. Participants can rate a movie by sharing its title, description and the location information.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Programs](#programs)
- [Testing](#testing)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Features

- Publish movie review
- Update an existing movie review
- Security-related implementations such as rating validations and checking the PDA accounts

## Getting Started

/program folder contains all the files that needed to build and deploy our Solana program to Solana Devnet.
/frontend folder contains all the files and folders for building and serving our frontend application.

### Prerequisites

1. NPM
2. Program ID given from the Solana Playground after deploying the program (can be found from the Solana Explorer by using the used wallet address.)

### Installation

#### Solana Program Deployment

1. Navigate to [soldev](https://beta.solpg.io/)
2. Import the files in the program folder to the playground compiler
3. Make sure you're connected to Devnet with a wallet that has a SOL balance for the deployment (go to [faucet](https://faucet.solana.com/) for free SOL airdrop)
4. Navigate to Build & Deploy tab to build and deploy your program
5. After a successful deployment, copy the Program ID from the Build & Deploy page

#### Front-end Build

1. Clone the repository:

```bash
  git clone https://github.com/mustafademiray/restaurant_review_program.git
```

2. Navigate to the frontend directory:

```bash
  cd frontend
```

3. Install required npm packages:

```bash
 npm install
```

## Usage

1. Navigate to /frontend/src/pages/index.tsx and paste the Program ID we have got from the Playground.

2. Start the development server:

```bash
 npm start
```

3. Open your web browser and navigate to `http://localhost:3000` to access the DApp.

4. Connect your Solana wallet (e.g., Phantom, Backpack) to the DApp.

5. Enter the relevant information for submitting a movie review.

## Programs

The files in the ./program directory contains the following three files:

- `instruction.rs`: Contains an implementation of the program logic to select the correct instruction.
- `state.rs`: Helps us accessing the data types and data itself on the Solana account, basically keeps the current state.
- `lib.rs`: Configures the entrypoint of our program and processes the returned instruction.

## Contributing

Contributions to this project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Make changes and test thoroughly.
4. Commit with clear and concise messages.
5. Push changes to your fork.
6. Submit a pull request describing your changes.

## License

This project is licensed under the [MIT License](LICENSE).
