'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@app/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@app/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@app/components/ui/popover'
import { cn } from '@app/lib/utils'

type ComboboxProps<T> = {
	items: T[]
	selectedValue: T | null
	onSelect: (value: T) => void
	getLabel: (item: T) => string
	getValue: (item: T) => string
	placeholder?: string
	className?: string
}

export default function Combobox<T>({
	items,
	selectedValue,
	onSelect,
	getLabel,
	getValue,
	placeholder = 'Select an option...',
	className
}: ComboboxProps<T>) {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn('w-[200px] justify-between', className)}
				>
					{selectedValue ? getLabel(selectedValue) : placeholder}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search..." className="h-9" />
					<CommandList>
						<CommandEmpty>No items found.</CommandEmpty>
						<CommandGroup>
							{items.map((item) => {
								const value = getValue(item)
								return (
									<CommandItem
										key={value}
										value={value}
										onSelect={() => {
											onSelect(item)
											setOpen(false)
										}}
									>
										{getLabel(item)}
										<Check
											className={cn(
												'ml-auto',
												selectedValue && getValue(selectedValue) === value
													? 'opacity-100'
													: 'opacity-0'
											)}
										/>
									</CommandItem>
								)
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
