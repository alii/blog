import 'tailwindcss/tailwind.css';
import '../styles/main.css';

import React from 'react';
import Head from 'next/head';
import type {AppProps} from 'next/app';
import Script from 'next/script';

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
			</footer>

			<Script src="https://lab.alistair.cloud/latest.js" />
			<noscript>
				<img
					src="https://lab.alistair.cloud/noscript.gif"
					alt=""
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</noscript>
		</div>
	);
}
