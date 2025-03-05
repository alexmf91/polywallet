import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import { api } from '@app/lib/api'
import { queryClient } from '@app/lib/react-query'
import { PublicRoutes } from '@app/lib/routes'
import { AppCookies } from '@app/lib/types'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { NFTsTable, TokensTable } from './components'

export default async function Dashboard() {
	const cookiesStore = await cookies()
	const token = cookiesStore.get(AppCookies.AUTH_TOKEN)?.value
	const walletAddress = cookiesStore.get(AppCookies.WALLET_ADDRESS)?.value

	if (!token || !walletAddress) redirect(PublicRoutes.SIGN_IN)

	const tokens = await api.getBalances(walletAddress, token)

	await queryClient.prefetchQuery({
		queryKey: ['nfts', walletAddress],
		queryFn: () => api.getNFTs(walletAddress, token)
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Tabs defaultValue="tokens">
				<TabsList>
					<TabsTrigger value="tokens">Tokens</TabsTrigger>
					<TabsTrigger value="nfts">NFT&apos;s</TabsTrigger>
				</TabsList>
				<TabsContent value="tokens">
					<TokensTable balances={tokens} />
				</TabsContent>
				<TabsContent value="nfts">
					<NFTsTable walletAddress={walletAddress} token={token} />
				</TabsContent>
			</Tabs>
		</HydrationBoundary>
	)
}
