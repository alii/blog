import type {PropsWithChildren} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import light from 'react-syntax-highlighter/dist/cjs/styles/hljs/lightfair';
import dark from 'react-syntax-highlighter/dist/cjs/styles/hljs/night-owl';

const Pre = ({children}: PropsWithChildren) => <pre className="px-[1rem]">{children}</pre>;

export function Shell({children}: {readonly children: string}) {
	const lines = children.split('\n');

	return (
		<pre className="px-[1rem]">
			{lines.map(line => (
				<p key={line} className="before:content-['$_'] before:select-none my-0">
					{line}
				</p>
			))}
		</pre>
	);
}

export function Highlighter({
	children,
	language = 'typescript',
}: {
	readonly children: string;
	readonly language?: 'typescript' | 'javascript' | 'bash' | 'json' | 'css' | 'html' | 'markdown';
}) {
	return (
		<div className="no-pre-margin">
			<div className="hidden dark:block">
				<SyntaxHighlighter language={language} style={dark} PreTag={Pre}>
					{children}
				</SyntaxHighlighter>
			</div>

			<div className="dark:hidden">
				<SyntaxHighlighter language={language} style={light} PreTag={Pre}>
					{children}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}
