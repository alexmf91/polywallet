import { useEffect, useState } from 'react'

import { Combobox } from '@app/components'
import { api } from '@app/lib/api'
import { User } from '@app/lib/types'
import { useAccount } from 'wagmi'

type Props = {
	onSelectUser: (user: User) => void
}

export default function UserSearch({ onSelectUser }: Props) {
	const [users, setUsers] = useState<User[]>([])
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const { address: senderAddress } = useAccount()

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const userList = await api.getAllUsers()
				setUsers(userList.filter((user) => user.walletAddress !== senderAddress))
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		}

		fetchUsers()
	}, [senderAddress])

	return (
		<Combobox
			items={users}
			selectedValue={selectedUser}
			onSelect={(user) => {
				setSelectedUser(user)
				onSelectUser(user)
			}}
			getLabel={(user) => user.username || user.walletAddress}
			getValue={(user) => user.walletAddress}
			placeholder="Search user..."
			className="w-full"
		/>
	)
}
