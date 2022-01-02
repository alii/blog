/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import SyntaxHighlighter from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/cjs/styles/hljs/night-owl';
import light from 'react-syntax-highlighter/dist/cjs/styles/hljs/a11y-light';

export function Highlighter({
	children,
	language = 'typescript',
}: {
	children: string;
	language?: string;
}) {
	return (
		<div className="border-2 rounded-md overflow-hidden dark:border-gray-800 no-pre-margin">
			<div className="hidden dark:block">
				<SyntaxHighlighter language={language} style={dark}>
					{children}
				</SyntaxHighlighter>
			</div>

			<div className="dark:hidden">
				<SyntaxHighlighter language={language} style={light}>
					{children}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}
