'use client'

import { useQuery } from '@tanstack/react-query'
import { OwnedNft } from 'alchemy-sdk'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@app/components/ui'
import { api } from '@app/lib/api'
import { queryClient } from '@app/lib/react-query'
import SendNFTModal from './SendNFTModal'

type Props = {
	walletAddress: string
	token: string
}

export default function NFTsTable({ walletAddress, token }: Props) {
	const [selectedNFT, setSelectedNFT] = useState<OwnedNft | null>(null)

	const { data: nfts = [], isFetching } = useQuery({
		queryKey: ['nfts', walletAddress],
		queryFn: () => api.getNFTs(walletAddress, token),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false
	})

	const refreshNFTs = () => {
		queryClient.invalidateQueries({ queryKey: ['nfts', walletAddress] })
	}

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="">NFT&apos;s</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Balance</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="relative">
					{isFetching ? (
						<TableRow>
							<TableCell colSpan={4}>
								<Loader className="mx-auto mt-10 size-12 animate-spin-slow text-gray-500" />
							</TableCell>
						</TableRow>
					) : (
						nfts.map((nft) => (
							<TableRow key={JSON.stringify(nft)}>
								<TableCell className="flex max-w-xl items-center gap-4 font-medium">
									{nft.image.cachedUrl ? (
										<Image
											src={nft.image.cachedUrl}
											alt={nft.name ?? 'NFT Logo'}
											className="size-12 rounded-md"
											width={48}
											height={48}
										/>
									) : (
										<div className="size-12 rounded-md bg-slate-400" />
									)}
									<div className="grid">
										<span className="truncate">
											{nft.name || nft.contract.name}
										</span>
										<span className="truncate text-xs text-gray-500">
											{nft.description}
										</span>
									</div>
								</TableCell>
								<TableCell>{nft.tokenType}</TableCell>
								<TableCell>{nft.balance ?? 0}</TableCell>
								<TableCell className="text-right">
									<Button onClick={() => setSelectedNFT(nft)} size="sm">
										Send
									</Button>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			{selectedNFT && (
				<SendNFTModal
					nft={selectedNFT}
					open={Boolean(selectedNFT)}
					onOpenChange={() => {
						setSelectedNFT(null)
					}}
					onTransactionSuccess={refreshNFTs}
				/>
			)}
		</>
	)
}
