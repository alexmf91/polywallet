'use client'

import { ConnectKitButton } from 'connectkit'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	ModeToggle
} from '@app/components/ui'
import { useAuth } from '@app/contexts'
import { env } from '@app/lib/env'
import { PublicRoutes } from '@app/lib/routes'
import { cn } from '@app/lib/utils'

const NAV_ITEMS = [
	{ name: 'Home', href: '/' },
	{ name: 'Dashboard', href: '/dashboard', isPrivate: true }
]

const AuthButtons = () => (
	<>
		<Link href={PublicRoutes.SIGN_IN} legacyBehavior passHref>
			<Button variant="secondary">Sign In</Button>
		</Link>
		<Link href={PublicRoutes.SIGN_UP} legacyBehavior passHref>
			<Button variant="outline">Sign Up</Button>
		</Link>
	</>
)

export default function Web3Header() {
	const pathname = usePathname()
	const { isConnected } = useAccount()
	const { isAuthenticated } = useAuth()

	const visibleNavItems = useMemo(
		() => NAV_ITEMS.filter((item) => !item.isPrivate || (item.isPrivate && isAuthenticated)),
		[isAuthenticated]
	)

	return (
		<header className="w-full border-b border-zinc-200 bg-background/80 dark:border-zinc-800">
			<div className="mx-auto flex w-full items-center justify-between px-6 py-4 lg:container">
				<div className="flex items-baseline gap-6 lg:gap-12">
					{/* Logo */}
					<Link
						href={PublicRoutes.HOME}
						className="bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-2xl font-bold tracking-wide text-transparent"
					>
						{env.APP_NAME}
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden space-x-6 lg:flex">
						{visibleNavItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									'text-sm font-medium transition-colors',
									pathname === item.href
										? 'text-primary'
										: 'text-muted-foreground hover:text-foreground'
								)}
							>
								{item.name}
							</Link>
						))}
					</nav>
				</div>

				{/* Actions */}
				<div className="flex items-center space-x-4">
					{/* Desktop Connect Button */}
					<div className="hidden items-center space-x-4 lg:flex">
						{isConnected && <ConnectKitButton showBalance />}
						{!isAuthenticated && <AuthButtons />}
					</div>
					<ModeToggle />

					{/* Mobile Menu  */}
					<div className="lg:hidden">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700">
									<Menu className="h-6 w-6" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="mr-4 w-56 lg:hidden">
								{visibleNavItems.map((item) => (
									<DropdownMenuItem key={item.href}>
										<Link href={item.href}>{item.name}</Link>
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem className="hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
									{isConnected && <ConnectKitButton />}
								</DropdownMenuItem>
								<DropdownMenuItem className="hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
									{!isAuthenticated && <AuthButtons />}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	)
}
