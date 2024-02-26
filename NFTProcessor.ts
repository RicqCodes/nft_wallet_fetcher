import * as fs from "fs";
import * as path from "path";
import { chainGrpcWasmApi } from "./services/services";
import { toBase64 } from "@injectivelabs/sdk-ts";

interface TokenInfo {
  name: string;
  address: string;
}

export class NFTDataProcessor {
  private tokenOwners: {
    tokenName: string;
    tokenId: number;
    tokenAddress: string;
    owner: string;
  }[] = [];

  constructor(private contractAddresses: TokenInfo[]) {}

  private logError(message: string, error: Error): void {
    console.error(message, error);
  }

  private async _getNFTSupply(tokenInfo: TokenInfo): Promise<number> {
    try {
      const response = await chainGrpcWasmApi.fetchSmartContractState(
        tokenInfo.address,
        toBase64({ num_tokens: {} })
      );

      const uint8Array = new Uint8Array(response.data);
      const textDecoder = new TextDecoder("utf-8");
      const resultString = textDecoder.decode(uint8Array);
      const result: { count: number } = JSON.parse(resultString);
      return result.count;
    } catch (error: any) {
      this.logError(`Error getting supply for ${tokenInfo.name}:`, error);

      return 0; // Return 0 if there's an error
    }
  }

  private async _ensureDirectoryExists(directoryPath: string): Promise<void> {
    try {
      await fs.promises.mkdir(directoryPath, { recursive: true });
    } catch (error: any) {
      this.logError(`Error creating directory:`, error);
    }
  }

  public async findOwnersOfNFTs(): Promise<void> {
    for (const tokenInfo of this.contractAddresses) {
      try {
        const supply = await this._getNFTSupply(tokenInfo);

        if (supply === 0) {
          console.log(
            `Skipping ${tokenInfo.name} - ${tokenInfo.address} due to supply retrieval error.`
          );
          continue;
        }

        for (let tokenId = 0; tokenId < supply; tokenId++) {
          try {
            const response = await chainGrpcWasmApi.fetchSmartContractState(
              tokenInfo.address,
              toBase64({
                owner_of: {
                  token_id: tokenId.toString(),
                  include_expired: false,
                },
              })
            );

            const uint8Array = new Uint8Array(response.data);
            const textDecoder = new TextDecoder("utf-8");
            const resultString = textDecoder.decode(uint8Array);
            const result: { owner: string } = JSON.parse(resultString);

            this.tokenOwners.push({
              tokenName: tokenInfo.name,
              tokenId: tokenId,
              tokenAddress: tokenInfo.address,
              owner: result.owner,
            });

            console.log(
              `Inserted ${tokenInfo.name} - ${tokenInfo.address} for owner ${result.owner}`
            );
          } catch (error: any) {
            this.logError(
              `Error processing ${tokenInfo.name} - ${tokenInfo.address} for tokenId ${tokenId}:`,
              error
            );
          }
        }
      } catch (error: any) {
        this.logError(
          `Error getting suppply for ${tokenInfo.name} - ${tokenInfo.address}:`,
          error
        );
      }
    }
  }

  public async convertToCSV(): Promise<void> {
    const outputDirectory = "res";
    const outputFileName = "ownersList.csv";
    const outputPath = path.join(outputDirectory, outputFileName);

    // Ensure the directory exists
    await this._ensureDirectoryExists(outputDirectory);

    const csvHeader = "TokenName,TokenAddress,Owner\n";

    // Batch writes (adjust batch size as needed)
    const batchSize = 100;
    for (let i = 0; i < this.tokenOwners.length; i += batchSize) {
      const batch = this.tokenOwners.slice(i, i + batchSize);
      const csvData = batch
        .map(
          (entry) => `${entry.tokenName},${entry.tokenAddress},${entry.owner}`
        )
        .join("\n");
      const csvContent = csvHeader + csvData;

      try {
        await fs.promises.appendFile(outputPath, csvContent, "utf-8");
      } catch (error: any) {
        this.logError("Error writing CSV file:", error);
        console.error("Error writing CSV file:", error);
      }
    }

    console.log(`CSV file successfully created at ${outputPath}`);
  }
}
