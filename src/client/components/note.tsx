import type {ReactNode} from 'react';
import {VscWarning} from 'react-icons/vsc';

export type NoteProps = {
	title?: string;
	children: ReactNode;
	variant: 'warning';
};

// TODO: Implement variants
export function Note(props: NoteProps) {
	return (
		<div className="bg-yellow-100 shadow-md shadow-yellow-700/25 dark:shadow-none text-yellow-600 dark:bg-yellow-800/50 dark:text-yellow-500 p-2 not-prose rounded-md space-y-2">
			<div>
				<VscWarning className="inline mr-2 select-none" />
				{props.title && <h2 className="text-sm inline italic">{props.title}</h2>}
			</div>

			<div className="text-sm">{props.children}</div>
		</div>
	);
}
