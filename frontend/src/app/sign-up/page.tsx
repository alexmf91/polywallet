'use client'

import { ConnectKitButton } from 'connectkit'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useSignMessage } from 'wagmi'

import { Button, Input, Label } from '@app/components/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@app/components/ui/card'
import { api } from '@app/lib/api'
import { PrivateRoutes } from '@app/lib/routes'
import { ApiErrors } from '@app/lib/types'

export default function SignUpPage() {
	const router = useRouter()
	const { address, isConnected } = useAccount()
	const { signMessageAsync } = useSignMessage()
	const [walletAddress, setWalletAddress] = useState('')
	const [username, setUsername] = useState('')

	const [state, formAction, pending] = useActionState<
		{ success: boolean; error: string },
		FormData
	>(
		async (_prevState, formData) => {
			try {
				const wallet = address || (formData.get('walletAddress') as string)
				const user = formData.get('username') as string

				if (!wallet || !user) {
					return { success: false, error: 'Wallet address and username are required' }
				}

				const { message } = await api.genRegisterUserChallenge(wallet)
				const signature = await signMessageAsync({ message })

				const registerRes = await api.registerUser(wallet, user, signature)

				if (registerRes.success) {
					router.push(PrivateRoutes.DASHBOARD)
					return { success: true, error: '' }
				} else {
					return {
						success: false,
						error: Object.values(ApiErrors).includes(registerRes.error)
							? registerRes.message
							: 'Sign-up failed'
					}
				}
			} catch (error) {
				console.error({ error })
				return { success: false, error: 'Something went wrong. Please try again.' }
			}
		},
		{ success: false, error: '' }
	)

	useEffect(() => {
		if (address) {
			setWalletAddress(address)
		}
	}, [address])

	useEffect(() => {
		if (state.error) {
			toast.error(state.error)
		}
		if (state.success) {
			toast.success('Sign-up successful! Redirecting...')
		}
	}, [state])

	return (
		<div className="flex flex-col items-center justify-center">
			<Card className="flex w-full max-w-[400px] flex-col justify-center">
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
						{!isConnected
							? 'Please connect your wallet to create an account.'
							: 'Choose a username to get started.'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{!isConnected ? (
						<ConnectKitButton />
					) : (
						<form action={formAction}>
							<div className="flex min-w-full flex-1 flex-col gap-6 sm:max-w-[300px]">
								<div className="grid gap-2">
									<Label htmlFor="wallet-address">Wallet Address</Label>
									<Input
										id="wallet-address"
										name="walletAddress"
										type="text"
										placeholder="0x..."
										value={address || walletAddress}
										onChange={(e) => setWalletAddress(e.target.value)}
										disabled={!!address}
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="username">Username</Label>
									<Input
										id="username"
										name="username"
										type="text"
										placeholder="insomnia-67"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
								</div>
								<Button type="submit" className="w-full" disabled={pending}>
									{pending ? 'Signing Up...' : 'Sign Up'}
								</Button>
							</div>
						</form>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
