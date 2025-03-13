'use client'

import { ConnectKitButton } from 'connectkit'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useSignMessage } from 'wagmi'

import { Button, Input, Label } from '@app/components/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@app/components/ui/card'
import { useAuth } from '@app/contexts'
import { api } from '@app/lib/api'
import { PrivateRoutes, PublicRoutes } from '@app/lib/routes'
import { ApiErrors, AppCookies } from '@app/lib/types'

export default function SignInPage() {
	const router = useRouter()
	const [walletAddress, setWalletAddress] = useState('')
	const { setCookies } = useAuth()
	const { address, isConnected } = useAccount()
	const { signMessageAsync } = useSignMessage()

	const [state, formAction, pending] = useActionState<
		{ success: boolean; error: { code: string; message: string } },
		FormData
	>(
		async (_prevState, formData) => {
			try {
				const wallet = address || (formData.get('walletAddress') as string)

				if (!wallet) {
					return {
						success: false,
						error: {
							code: ApiErrors.USER_NOT_REGISTERED,
							message: 'Wallet address is required'
						}
					}
				}

				const { message } = await api.genLoginChallenge(wallet)
				const signature = await signMessageAsync({ message })

				const loginRes = await api.login(wallet, signature)

				if (loginRes.token) {
					setCookies(AppCookies.AUTH_TOKEN, loginRes.token)
					setCookies(AppCookies.WALLET_ADDRESS, loginRes.walletAddress)
					setTimeout(() => router.push(PrivateRoutes.DASHBOARD), 2000)
					return { success: true, error: { code: '', message: '' } }
				} else {
					if (Object.values(ApiErrors).includes(loginRes.error)) {
						return {
							success: false,
							error: { code: loginRes.error, message: loginRes.message }
						}
					}
					return {
						success: false,
						error: { code: ApiErrors.UNKNOWN_ERROR, message: 'Login failed' }
					}
				}
			} catch (error) {
				console.error(error)
				return {
					success: false,
					error: {
						code: ApiErrors.UNKNOWN_ERROR,
						message: 'Something went wrong. Please try again.'
					}
				}
			}
		},
		{ success: false, error: { code: '', message: '' } }
	)

	useEffect(() => {
		if (address) {
			setWalletAddress(address)
		}
	}, [address])

	useEffect(() => {
		if (state.error.message) {
			toast.error(state.error.message)
			if (state.error.code === ApiErrors.USER_NOT_REGISTERED) {
				router.push(PublicRoutes.SIGN_UP)
			}
		}
		if (state.success) {
			toast.success('Sign-in successful! Redirecting...')
		}
	}, [router, state])

	return (
		<div className="flex flex-col items-center justify-center">
			<Card className="flex w-full max-w-[400px] flex-col justify-center">
				<CardHeader>
					<CardTitle className="text-2xl">Sign In</CardTitle>
					<CardDescription>
						{!isConnected
							? 'Please connect your wallet to sign in.'
							: 'Sign the message to sign in.'}
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
								<Button type="submit" className="w-full" disabled={pending}>
									{pending ? 'Signing In...' : 'Sign In'}
								</Button>
							</div>
						</form>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
