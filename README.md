# NFT Data Processor

The NFT Data Processor is a small app written in TypeScript that fetches information about NFT owners from the Injective Protocol blockchain and generates a CSV file containing the data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [CSV Output](#csv-output)
- [License](#license)

## Prerequisites

Before using the NFT Data Processor, ensure that you have the following installed:

- Node.js (v14 or later)
- TypeScript
- yarn

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd nft-data-processor
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

## Usage

1. Open the app.ts file and update the COUNTER_CONTRACT_ADDRESSES array with the NFT contract addresses you want to fetch data for.

2. Run the app:

   ```bash
   yarn start
   ```

   This will fetch information about NFT owners and generate a CSV file in the res folder.

## Configuration

You can customize the behavior of the app by modifying the `NFTDataProcessor` class in the `NFTProcessor.ts` file. You may adjust the contract addresses, file paths, or other parameters as needed.

## CSV Output

The generated CSV file (`ownersList.csv`) contains the following columns:

- TokenName: Name of the NFT token
- TokenAddress: Address of the NFT contract
- Owner: Wallet address of the NFT owner

## License

This project is licensed under the MIT License.
