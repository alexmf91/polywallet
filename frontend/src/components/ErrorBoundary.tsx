'use client'

import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import React, { Component, ReactNode } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@app/components/ui/alert'
import { Button } from '@app/components/ui/button'
import { PublicRoutes } from '@app/lib/routes'

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
	error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false, error: undefined }
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: undefined })
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="flex min-h-screen flex-col items-center justify-center p-6">
					<Alert className="max-w-md text-center" variant="destructive">
						<AlertTitle className="text-destructive">Something went wrong</AlertTitle>
						<AlertDescription className="text-muted-foreground">
							{this.state.error?.message || 'An unexpected error occurred.'}
						</AlertDescription>
					</Alert>
					<div className="mt-8 flex gap-4">
						<Button variant="outline" onClick={this.handleRetry}>
							<AlertCircle className="mr-2 h-4 w-4" />
							Retry
						</Button>
						<Link href={PublicRoutes.HOME} legacyBehavior passHref>
							<Button asChild>
								<a>Back to Home</a>
							</Button>
						</Link>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}
