import clsx from 'clsx';
import type {ReactNode} from 'react';
import {VscWarning} from 'react-icons/vsc';

export type NoteProps = {
	title?: string;
	children: ReactNode;
	variant: 'warning';
};

export function Note(props: NoteProps) {
	const className = clsx('shadow-md dark:shadow-none p-2 not-prose rounded-md space-y-2', {
		'bg-yellow-100 shadow-yellow-700/25 text-yellow-600 dark:bg-yellow-800/50 dark:text-yellow-500':
			props.variant === 'warning',
	});

	return (
		<div className={className}>
			<div>
				<VscWarning className="inline mr-2 select-none" />
				{props.title && <h2 className="text-sm inline italic">{props.title}</h2>}
			</div>

			<div className="text-sm">{props.children}</div>
		</div>
	);
}
