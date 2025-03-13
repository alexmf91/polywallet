import { Footer, Header } from '@app/components'
import { env } from '@app/lib/env'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import './globals.css'
import { Providers } from './providers'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: env.APP_NAME,
	description: env.APP_DESCRIPTION
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookieStore = await cookies()
	const serverCookies = Object.fromEntries(
		cookieStore.getAll().map(({ name, value }) => [name, value])
	)

	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers cookies={serverCookies}>
					<div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
						<Header />
						<main className="p-8 sm:p-20">{children}</main>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	)
}
