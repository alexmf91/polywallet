'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { ThemeProvider, useTheme } from 'next-themes'
import type React from 'react'
import { Toaster } from 'react-hot-toast'
import { WagmiProvider } from 'wagmi'

import { ErrorBoundary } from '@app/components'
import { AuthGuard } from '@app/components/guards'
import { AuthProvider } from '@app/contexts'
import { queryClient } from '@app/lib/react-query'
import { config } from '@app/lib/wagmi'

type ProvidersProps = {
	children: React.ReactNode
	cookies: Record<string, string>
}

function AppProviders({ children, cookies }: ProvidersProps) {
	const { theme } = useTheme()

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider mode={theme === 'dark' ? 'dark' : 'light'}>
					<AuthProvider initialCookies={cookies}>
						<Toaster position="bottom-right" />
						<AuthGuard>{children}</AuthGuard>
					</AuthProvider>
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}

export function Providers({ children, cookies }: ProvidersProps) {
	return (
		<ThemeProvider attribute="class">
			<ErrorBoundary>
				<AppProviders cookies={cookies}>{children}</AppProviders>
			</ErrorBoundary>
		</ThemeProvider>
	)
}
