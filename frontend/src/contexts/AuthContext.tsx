'use client'

import { api } from '@app/lib/api'
import { AppCookies } from '@app/lib/types'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useAccount } from 'wagmi'

type AuthContextType = {
	isAuthenticated: boolean | null
	token: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
	children: React.ReactNode
	initialCookies?: Record<string, string>
}

export function AuthProvider({ children, initialCookies }: AuthProviderProps) {
	const { isConnected, isReconnecting } = useAccount()
	const [isValidToken, setIsValidToken] = useState(false)
	const [cookies, , removeCookie] = useCookies(Object.values(AppCookies))
	const [authToken, setAuthToken] = useState(() => initialCookies?.[AppCookies.AUTH_TOKEN] || cookies[AppCookies.AUTH_TOKEN] || null)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

	const validateSession = useCallback(async () => {
		if (!authToken) {
			setIsValidToken(false)
			return
		}
		try {
			const res = await api.verifyToken(authToken)
			setIsValidToken(res.valid)
		} catch {
			setIsValidToken(false)
		}
	}, [authToken])

	useEffect(() => {
		if (cookies[AppCookies.AUTH_TOKEN] && cookies[AppCookies.AUTH_TOKEN] !== authToken) {
			setAuthToken(cookies[AppCookies.AUTH_TOKEN])
		}
	}, [cookies, authToken])

	useEffect(() => {
		if (authToken) {
			validateSession()
		}
	}, [authToken, validateSession])

	useEffect(() => {
		// Remove all cookies if the user disconnects their wallet
		if (!isConnected && !isReconnecting) {
			Object.values(AppCookies).forEach((cookieKey) => {
				if (cookies[cookieKey]) {
					removeCookie(cookieKey, { path: '/' })
				}
			})
			setIsAuthenticated(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this effect when the user disconnects their wallet
	}, [isConnected, isReconnecting])

	useEffect(() => {
		if (isValidToken !== null) {
			setIsAuthenticated(isConnected && isValidToken)
		}
	}, [isConnected, isValidToken])

	const value = useMemo(
		() => ({ isAuthenticated, token: authToken }),
		[isAuthenticated, authToken]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
