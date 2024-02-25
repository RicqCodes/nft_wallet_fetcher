
# NFT Wallet Fetcher

The NFT Wallet Fetcher is a TypeScript library designed to facilitate the retrieval of NFT wallet information from the blockchain. It leverages the Injective Labs protocols to fetch and process NFT ownership data, making it easier for developers to integrate NFT data into their applications.

## Features

- Fetch NFT ownership data from specified smart contracts.
- Process and convert NFT data into a CSV format for easy analysis and reporting.
- Support for multiple blockchain networks via Injective Labs SDK.

## Installation

Install `nft_wallet_fetcher` using npm:

```bash
npm install nft_wallet_fetcher
```

Or using yarn:

```bash
yarn add nft_wallet_fetcher
```

## Usage

First, import `NFTDataProcessor` from `nft_wallet_fetcher`:

```typescript
import { NFTDataProcessor } from 'nft_wallet_fetcher';
```

Then, initialize it with your contract addresses:

```typescript
const contractAddresses = [
  { name: "Injective Quants", address: "inj16m9n05n80uylxaafk32qyha38fmwcfpssnpfak" },
  // Add more contracts as needed
];

const nftProcessor = new NFTDataProcessor(contractAddresses);
```

Fetch and process NFT data:

```typescript
async function fetchNFTData() {
  await nftProcessor.findOwnersOfNFTs();
  await nftProcessor.convertToCSV();
}

fetchNFTData();
```

This will fetch the NFT data and generate a CSV file in the specified output directory.

## API Reference

Please refer to the TypeScript interface definitions for detailed API information.

## Contributing

Contributions are always welcome! Please read the [contributing guide](CONTRIBUTING.md) for ways to contribute, and the process for submitting pull requests to us.

## Support

If you encounter any issues or require assistance, please open an issue on our [GitHub issues page](https://github.com/ricqcodes/nft_wallet_fetcher/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

