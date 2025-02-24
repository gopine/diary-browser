import { GithubContent } from '@/types';
import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

interface Props {
	options: GithubContent[];
	value: GithubContent | null;
	onChange: (option: GithubContent) => void;
	placeholder?: string;
	disabled?: boolean;
}

function ComboBox({ options, value, onChange, placeholder, disabled }: Props) {
	const [query, setQuery] = useState('');
	const filtered = useMemo(() => {
		const lowered = query.toLowerCase();
		if (!query) {
			return options;
		}
		return options.filter(
			(option: GithubContent) =>
				option.name.toLowerCase().indexOf(lowered) !== -1,
		);
	}, [options, query]);
	return (
		<Combobox
			value={value}
			onChange={onChange}
			onClose={() => setQuery('')}
			disabled={disabled}
		>
			<div className="relative border border-black/5 rounded-lg">
				<ComboboxInput
					className={clsx(
						'w-full rounded-lg border-none bg-white/5 py-10 pr-20 pl-10 text-sm/6 text-primary',
						'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 disabled:cursor-not-allowed',
					)}
					placeholder={placeholder}
					displayValue={(option: GithubContent) => option?.name}
					onChange={(event) => setQuery(event.target.value)}
				/>
				<ComboboxButton className="group absolute inset-y-0 right-0 px-10 cursor-pointer">
					<ChevronDownIcon className="size-24 fill-black/10 group-data-[hover]:fill-black/20" />
				</ComboboxButton>
			</div>

			<ComboboxOptions
				anchor="bottom"
				transition
				className={clsx(
					'w-[var(--input-width)] rounded-xl border border-black/5 bg-white mt-8 p-8 [--anchor-gap:var(--spacing-1)] empty:invisible',
					'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-10',
				)}
			>
				{filtered.map((option: GithubContent) => (
					<ComboboxOption
						key={option.name}
						value={option}
						className="transition duration-100 group flex cursor-pointer items-center gap-2 rounded-lg py-12 px-8 select-none data-[focus]:bg-black/10"
					>
						<CheckIcon className="invisible size-12 fill-black group-data-[selected]:visible" />
						<div className="text-sm/6 text-dark">{option.name}</div>
					</ComboboxOption>
				))}
			</ComboboxOptions>
		</Combobox>
	);
}

export default ComboBox;
