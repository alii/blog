import React from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
import {fetcher} from '../client/fetcher';

import 'tailwindcss/tailwind.css';
import '../styles/main.css';

export default function App({Component, pageProps}: AppProps) {
	return (
		<SWRConfig value={{fetcher}}>
			<div className="px-4 md:px-16 py-24 max-w-3xl">
				<Component {...pageProps} />
			</div>
		</SWRConfig>
	);
}
