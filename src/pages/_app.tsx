import 'tailwindcss/tailwind.css';
import '../styles/main.css';

import React from 'react';
import Head from 'next/head';
import type {AppProps} from 'next/app';
import urlcat from 'urlcat';

export default function App({Component, pageProps, router}: AppProps) {
	return (
		<div className="px-4 md:px-16 space-y-24 py-24 max-w-4xl">
			<Head>
				<title>alistair smith • blog</title>
			</Head>

			<Component {...pageProps} />

			<footer className="space-y-2">
				<a
					href="https://alistair.sh"
					className="underline decoration-blue-500/20 hover:decoration-blue-500/50 text-neutral-400 dark:text-neutral-700"
				>
					Alistair Smith
				</a>

				<img
					className="opacity-50"
					src={urlcat('https://hits.link', '/hits', {
						url: urlcat('https://alistair.blog', router.asPath),
					})}
				/>
			</footer>
		</div>
	);
}
