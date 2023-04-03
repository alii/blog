import clsx from 'clsx';
import type {ReactNode} from 'react';
import {VscWarning, VscInfo} from 'react-icons/vsc';

export type NoteProps = {
	title?: string;
	children: ReactNode;
	variant: 'warning' | 'info';
};

const icons = {
	warning: <VscWarning className="inline mr-2 select-none" />,
	info: <VscInfo className="inline mr-2 select-none" />,
};

export function Note(props: NoteProps) {
	const className = clsx('p-4 not-prose rounded-md space-y-2', {
		'bg-yellow-100/90 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-500':
			props.variant === 'warning',

		'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-500': props.variant === 'info',
	});

	return (
		<div className={className}>
			<div>
				{icons[props.variant]}
				{props.title && <h2 className="text-sm inline italic">{props.title}</h2>}
			</div>

			<div className="text-sm">{props.children}</div>
		</div>
	);
}
