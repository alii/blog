import clsx from 'clsx';
import type {ReactNode} from 'react';
import {VscInfo, VscWarning} from 'react-icons/vsc';

export type NoteProps = {
	readonly title?: string;
	readonly children: ReactNode;
	readonly variant: 'warning' | 'info';
};

const icons = {
	warning: <VscWarning className="inline text-sm mr-2 select-none" />,
	info: <VscInfo className="inline text-sm mr-2 select-none" />,
};

export function Note(props: NoteProps) {
	const className = clsx('p-4 pt-3 not-prose rounded-md space-y-2', {
		'bg-yellow-100/90 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-500':
			props.variant === 'warning',

		'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-500': props.variant === 'info',

		'[&_code]:p-1 [&_code]:-mx-1 [&_code]:inline [&_code]:rounded': true,

		'[&_code]:bg-yellow-50 [&_code]:dark:bg-yellow-900/40': props.variant === 'warning',
		'[&_code]:bg-blue-200/90 [&_code]:dark:bg-blue-900/40': props.variant === 'info',
	});

	return (
		<div className={className}>
			<div>
				{icons[props.variant]}
				{props.title && <h2 className="text-xs inline">{props.title}</h2>}
			</div>

			<div className="text-sm">{props.children}</div>
		</div>
	);
}
