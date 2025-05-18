/* eslint-disable new-cap */

import 'tailwindcss/tailwind.css';
import '../styles/main.css';

import clsx from 'clsx';
import type {AppProps} from 'next/app';
import {JetBrains_Mono} from 'next/font/google';
import Head from 'next/head';
import {CiGlobe, CiTwitter} from 'react-icons/ci';
import {VscGithubAlt} from 'react-icons/vsc';
import {ExternalLink} from '../client/components/external-link';

const mono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

const footerLink =
	'hover:underline cursor-default text-sm decoration-blue-500/20 hover:decoration-blue-500/50 text-zinc-400 dark:text-zinc-700';

export default function App({Component, pageProps, router}: AppProps) {
	return (
		<div className={clsx('py-24 px-4', mono.variable)}>
			<Head>
				<title>blog • alistair smith</title>
			</Head>

			<div className="space-y-20 max-w-prose mx-auto">
				<Component {...pageProps} />

				<footer>
					<p className="font-mono [&_a]:inline-block [&_a]:py-4 [&_a]:px-6 [&_a:first-child]:pl-0 [&_a:last-child]:pr-0">
						<ExternalLink href="https://alistair.sh" className={footerLink}>
							<CiGlobe className="inline size-[15px] mr-[3px] mb-[1.5px]" />
							<span>alistair.sh</span>
						</ExternalLink>

						<ExternalLink href="https://twitter.com/alistaiir" className={footerLink}>
							<CiTwitter className="inline size-[18px] mr-0.5" />
							<span>alistaiir</span>
						</ExternalLink>

						<ExternalLink href="https://github.com/alii" className={footerLink}>
							<VscGithubAlt className="inline size-[14px] mr-[3px]" />
							<span>alii</span>
						</ExternalLink>
					</p>
				</footer>
			</div>
		</div>
	);
}
