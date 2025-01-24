import 'tailwindcss/tailwind.css';
import '../styles/main.css';

import clsx from 'clsx';
import type {AppProps} from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import {CiGlobe, CiTwitter} from 'react-icons/ci';
import {VscGithubAlt} from 'react-icons/vsc';
import {ExternalLink} from '../client/components/external-link';

const iosevkaTerm = localFont({
	fallback: ['monospace'],
	display: 'block',
	adjustFontFallback: false,
	src: [
		// Thin
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Thin-02.ttf',
			weight: '100',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Thin-Italic-10.ttf',
			weight: '100',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Thin-Oblique-09.ttf',
			weight: '100',
			style: 'oblique',
		},
		// Extralight
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Extralight-20.ttf',
			weight: '200',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Extralight-Italic-28.ttf',
			weight: '200',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Extralight-Oblique-27.ttf',
			weight: '200',
			style: 'oblique',
		},
		// Light
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Light-38.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Light-Italic-46.ttf',
			weight: '300',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Light-Oblique-45.ttf',
			weight: '300',
			style: 'oblique',
		},
		// Regular
		{
			path: '../../public/fonts/Iosevka-Term-Curly-56.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Italic-64.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Oblique-63.ttf',
			weight: '400',
			style: 'oblique',
		},
		// Medium
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Medium-74.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Medium-Italic-82.ttf',
			weight: '500',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Medium-Oblique-81.ttf',
			weight: '500',
			style: 'oblique',
		},
		// Semibold
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Semibold-92.ttf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Semibold-Italic-100.ttf',
			weight: '600',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Semibold-Oblique-99.ttf',
			weight: '600',
			style: 'oblique',
		},
		// Bold
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Bold-110.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Bold-Italic-118.ttf',
			weight: '700',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Bold-Oblique-117.ttf',
			weight: '700',
			style: 'oblique',
		},
		// Extrabold
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Extrabold-128.ttf',
			weight: '800',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Extrabold-Italic-136.ttf',
			weight: '800',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Extrabold-Oblique-135.ttf',
			weight: '800',
			style: 'oblique',
		},
		// Heavy
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Heavy-146.ttf',
			weight: '900',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Heavy-Italic-154.ttf',
			weight: '900',
			style: 'italic',
		},
		{
			path: '../../public/fonts/Iosevka-Term-Curly-Heavy-Oblique-153.ttf',
			weight: '900',
			style: 'oblique',
		},
	],
	variable: '--font-mono',
});

const footerLink =
	'hover:underline cursor-default text-sm decoration-blue-500/20 hover:decoration-blue-500/50 text-gray-400 dark:text-gray-700';

export default function App({Component, pageProps, router}: AppProps) {
	return (
		<div className={clsx('py-24 px-4 font-mono', iosevkaTerm.variable)}>
			<Head>
				<title>alistair smith • blog</title>
			</Head>

			<div className="space-y-20 max-w-prose mx-auto">
				<Component {...pageProps} />

				<footer>
					<p className="[&_a]:inline-block [&_a]:py-4 [&_a]:px-6 [&_a:first-child]:pl-0 [&_a:last-child]:pr-0">
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
