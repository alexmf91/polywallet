import { NftTokenType } from 'alchemy-sdk'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { encodeFunctionData } from 'viem'

/**
 * A function to merge tailwind and clsx classes
 * @param inputs - The classes to merge
 * @returns The merged classes
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
/**
 * Format a number to a string with a minimum of 2 and maximum of 4 decimal places
 * @param value - The number to format
 * @returns The formatted number
 */
export const formatNumber = (value: number | string): string => {
	const num = typeof value === 'number' ? value : parseFloat(value)
	if (isNaN(num)) return String(value)
	return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
}
/**
 * Build transaction data for sending an NFT
 * @param sender - The address of the sender
 * @param receiver - The address of the receiver
 * @param tokenType - The type of NFT token
 * @param tokenId - The ID of the NFT token
 * @returns The transaction data
 */
export const buildTransactionData = ({
	sender,
	receiver,
	tokenType,
	tokenId
}: {
	sender: string
	receiver: string
	tokenType: NftTokenType
	tokenId: string
}) => {
	const transferFunction =
		tokenType === NftTokenType.ERC721
			? 'safeTransferFrom(address,address,uint256)' // ERC721 transfer function
			: 'safeTransferFrom(address,address,uint256,uint256,bytes)' // ERC1155 transfer function

	return encodeFunctionData({
		abi: [
			{
				type: 'function',
				name: transferFunction,
				stateMutability: 'nonpayable',
				inputs:
					tokenType === NftTokenType.ERC721
						? [
								{ name: 'from', type: 'address' },
								{ name: 'to', type: 'address' },
								{ name: 'tokenId', type: 'uint256' }
							]
						: [
								{ name: 'from', type: 'address' },
								{ name: 'to', type: 'address' },
								{ name: 'tokenId', type: 'uint256' },
								{ name: 'amount', type: 'uint256' },
								{ name: 'data', type: 'bytes' }
							]
			}
		],
		functionName: transferFunction,
		args:
			tokenType === NftTokenType.ERC721
				? [sender, receiver, BigInt(tokenId)]
				: [sender, receiver, BigInt(tokenId), BigInt(1), '0x']
	})
}
