import Image from 'next/image'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@app/components/ui'
import { TokenBalance } from '@app/lib/types'
import { formatNumber } from '@app/lib/utils'

type Props = {
	balances: TokenBalance[]
}

export default function TokensTable({ balances }: Props) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Token</TableHead>
					<TableHead>Balance</TableHead>
					<TableHead>Price</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{balances.map((balance) => (
					<TableRow key={JSON.stringify(balance)}>
						<TableCell className="flex items-center gap-2 font-medium">
							{balance.logo ? (
								<Image
									src={balance.logo}
									alt={balance.name ?? 'Token Logo'}
									className="h-6 w-6 rounded-full"
									width={24}
									height={24}
								/>
							) : (
								<div className="h-6 w-6 rounded-full bg-slate-400" />
							)}
							<div className="grid">
								<span>{balance.name}</span>
								<span className="text-xs text-gray-500">{balance.symbol}</span>
							</div>
						</TableCell>
						<TableCell>
							{formatNumber(balance.tokenBalance ?? 0)}
							<span className="ml-2 text-gray-500">
								$
								{formatNumber(
									Number(balance.tokenBalance ?? 0) * (balance.priceUsd ?? 0)
								)}
							</span>
						</TableCell>
						<TableCell>${formatNumber(balance.priceUsd ?? 0)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
