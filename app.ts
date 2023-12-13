import { NFTDataProcessor } from "./NFTProcessor"; // Adjust the path if necessary
import { COUNTER_CONTRACT_ADDRESSES } from "./services/constants";

const nftProcessor = new NFTDataProcessor(COUNTER_CONTRACT_ADDRESSES);

async function main() {
  await nftProcessor.findOwnersOfNFTs();
  await nftProcessor.convertToCSV();
}

main();
