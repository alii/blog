import React from 'react';
import {AppProps} from 'next/app';
import {SWRConfig} from 'swr';
<<<<<<< HEAD
import {fetcher} from '../client/fetcher';

export default function App({Component, pageProps}: AppProps) {
	return (
		<SWRConfig value={{fetcher}}>
=======
import {APIResponse, NextkitException} from 'nextkit';

export default function App({Component, pageProps}: AppProps) {
	return (
		<SWRConfig
			value={{
				async fetcher<T>(url: string) {
					const request = await fetch(url);
					const body = (await request.json()) as APIResponse<T>;

					if (!body.success) {
						throw new NextkitException(request.status, body.message);
					}

					return body.data;
				},
			}}
		>
>>>>>>> f70f926477d36ac855dcae744f6e43b2fada17dc
			<Component {...pageProps} />
		</SWRConfig>
	);
}
