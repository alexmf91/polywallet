'use client'

import { NftTokenType, OwnedNft } from 'alchemy-sdk'
import { Check, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { parseUnits } from 'viem'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

import { Button } from '@app/components/ui'
import { Card, CardContent, CardDescription, CardHeader } from '@app/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@app/components/ui/dialog'
import { User } from '@app/lib/types'
import { buildTransactionData } from '@app/lib/utils'
import UserSearch from './UserSearch'

enum TransactionStep {
	IDLE,
	SIGNING,
	BROADCASTING,
	DONE
}

type Props = {
	nft: OwnedNft
	open: boolean
	onOpenChange: () => void
	onTransactionSuccess: () => void
}

export default function SendNFTModal({ nft, open, onOpenChange, onTransactionSuccess }: Props) {
	const { address: senderAddress } = useAccount()
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const [transactionStep, setTransactionStep] = useState<TransactionStep>(TransactionStep.IDLE)
	const [txHash, setTxHash] = useState<string | null>(null)

	const { sendTransactionAsync } = useSendTransaction({
		mutation: {
			onSuccess: () => {
				toast.success('Transaction submitted successfully')
				setTransactionStep(TransactionStep.BROADCASTING)
			},
			onError(error) {
				console.error(error)
				toast.error('Failed to send transaction. Please try again.')
				setTransactionStep(TransactionStep.IDLE)
			}
		}
	})

	const {
		isLoading: isPending,
		isSuccess,
		isError
	} = useWaitForTransactionReceipt({
		hash: txHash as `0x${string}`
	})

	const handleSendTransaction = async () => {
		if (!selectedUser || !senderAddress) {
			toast.error('Missing recipient or sender address')
			return
		}

		if (nft.tokenType !== NftTokenType.ERC721 && nft.tokenType !== NftTokenType.ERC1155) {
			toast.error('Only ERC721 and ERC1155 tokens are supported')
			return
		}

		try {
			setTransactionStep(TransactionStep.SIGNING)

			const transactionHash = await sendTransactionAsync({
				to: nft.contract.address as `0x${string}`,
				data: buildTransactionData({
					sender: senderAddress,
					receiver: selectedUser.walletAddress,
					tokenType: nft.tokenType,
					tokenId: nft.tokenId
				}),
				value: parseUnits('0', 18) // Ensure zero ETH is sent
			})

			setTxHash(transactionHash)
		} catch (error) {
			console.error(error)
			toast.error('Failed to send transaction. Please try again.')
			setTransactionStep(TransactionStep.IDLE)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success('Transaction confirmed!')
			setTransactionStep(TransactionStep.DONE)
		} else if (isError) {
			toast.error('Transaction failed.')
			setTransactionStep(TransactionStep.IDLE)
		}
	}, [isSuccess, isError])

	useEffect(() => {
		if (isSuccess) {
			onTransactionSuccess()
		}
	}, [isSuccess, onTransactionSuccess])

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md space-y-1 rounded-sm">
				<DialogTitle>Send NFT</DialogTitle>

				<Card className="rounded-md bg-gray-100 dark:bg-slate-900">
					<CardHeader className="flex-row justify-between p-4">
						<CardDescription>1. Select a recipient to send the NFT.</CardDescription>
						{selectedUser && <Check className="!mt-0 text-green-500" />}
					</CardHeader>
					{!selectedUser && (
						<CardContent>
							<UserSearch onSelectUser={setSelectedUser} />
						</CardContent>
					)}
				</Card>

				<Card className="rounded-md bg-gray-100 dark:bg-slate-900">
					<CardHeader className="flex-row justify-between p-4">
						<CardDescription>2. Sign and send transaction</CardDescription>
						{transactionStep === TransactionStep.DONE && (
							<Check className="!mt-0 text-green-500" />
						)}
					</CardHeader>
					{transactionStep !== TransactionStep.DONE && (
						<CardContent>
							<Button
								onClick={handleSendTransaction}
								className="mt-3 w-full"
								disabled={
									transactionStep === TransactionStep.BROADCASTING || isPending
								}
							>
								{transactionStep === TransactionStep.BROADCASTING || isPending ? (
									<>
										Sending Transaction...
										<Loader className="ml-2 h-4 w-4 animate-spin-slow" />
									</>
								) : (
									'Confirm & Send'
								)}
							</Button>
						</CardContent>
					)}
				</Card>

				{isSuccess && (
					<div className="mt-2 text-center text-sm text-green-500">
						Transaction confirmed successfully! ✅
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
