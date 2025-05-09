import type {PropsWithChildren} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

import light from 'react-syntax-highlighter/dist/cjs/styles/hljs/lightfair';
import dark from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs2015';

import clsx from 'clsx';
import {TbBrandCss3, TbBrandHtml5, TbBrandJavascript, TbBrandTypescript} from 'react-icons/tb';

const Pre = ({children}: PropsWithChildren) => <pre className="px-4">{children}</pre>;

export function Shell({
	children,
	hasDollarOnFirstLineOnly,
}: {
	readonly children: string;
	hasDollarOnFirstLineOnly?: boolean;
}) {
	const lines = children.split('\n');

	return (
		<pre className="px-4">
			{lines.map((line, index) => {
				const isFirst = index === 0;

				return (
					<p
						key={line}
						className={clsx(
							'before:select-none my-0',
							hasDollarOnFirstLineOnly
								? isFirst &&
										'before:content-["$_"] before:text-yellow-600 text-yellow-800 dark:before:text-yellow-400 dark:text-yellow-200'
								: 'before:content-["$_"]',
						)}
					>
						{line === '' ? <br /> : line}
					</p>
				);
			})}
		</pre>
	);
}

function Filename({filename}: {readonly filename: string}) {
	const icon = (() => {
		switch (true) {
			case filename.endsWith('.ts'):
				return <TbBrandTypescript className="inline" />;
			case filename.endsWith('.js'):
				return <TbBrandJavascript className="inline" />;
			case filename.endsWith('.html'):
				return <TbBrandHtml5 className="inline" />;
			case filename.endsWith('.css'):
				return <TbBrandCss3 className="inline" />;
			default:
				return null;
		}
	})();

	return (
		<p className="text-sm text-gray-600 dark:text-gray-400 px-3 mx-1 mt-1 mb-0 rounded py-1.5 bg-gray-100 dark:bg-gray-900/50">
			<span className="mr-2">{icon}</span>
			<span>{filename}</span>
		</p>
	);
}

export function Highlighter({
	children,
	language = 'typescript',
	filename,
}: {
	readonly children: string;
	readonly language?: 'typescript' | 'javascript' | 'bash' | 'json' | 'css' | 'html' | 'markdown';
	readonly filename?: string;
}) {
	return (
		<div className="[&_pre]:!m-0 [&_pre]:border-none">
			<div className="hidden dark:block border rounded-md overflow-hidden border-gray-800">
				{filename && <Filename filename={filename} />}

				<SyntaxHighlighter language={language} style={dark} PreTag={Pre}>
					{children}
				</SyntaxHighlighter>
			</div>

			<div className="dark:hidden border rounded-md border-gray-200">
				{filename && <Filename filename={filename} />}

				<SyntaxHighlighter language={language} style={light} PreTag={Pre}>
					{children}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}
