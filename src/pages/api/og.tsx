import {findLargestUsableFontSize} from '@altano/satori-fit-text';
import {unstable_createNodejsStream} from '@vercel/og';
import type {NextApiRequest, NextApiResponse, ServerRuntime} from 'next';
import type {Font} from 'satori';
import {posts} from '../../posts';

export const runtime: ServerRuntime = 'nodejs';

async function loadGoogleFont(font: string) {
	const url = `https://fonts.googleapis.com/css2?family=${font}`;
	const css = await (await fetch(url)).text();
	const resource = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css);

	if (resource) {
		const response = await fetch(resource[1]);

		if (response.status === 200) {
			return response.arrayBuffer();
		}
	}

	throw new Error('failed to load font data');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {slug} = req.query;

	if (typeof slug !== 'string') {
		return new Response('Missing slug', {status: 400});
	}

	const post = posts.find(p => p.slug === slug);

	if (!post) {
		return new Response('Not found', {status: 404});
	}

	const fontData = await loadGoogleFont('JetBrains+Mono');

	const JETBRAINS_MONO: Font = {
		name: 'JetBrains Mono',
		data: fontData,
		style: 'normal',
	};

	const dimensions = {
		width: 1200,
		height: 630,
	};

	const xPadding = 60;

	const titleFontSize = await findLargestUsableFontSize({
		text: post.name,
		font: JETBRAINS_MONO,
		maxWidth: dimensions.width - xPadding * 2,
		maxHeight: (dimensions.height / 3) * 0.5,
	});

	const excerptFontSize = await findLargestUsableFontSize({
		text: post.excerpt,
		font: JETBRAINS_MONO,
		maxWidth: dimensions.width - xPadding * 2,
		maxHeight: (dimensions.height / 3) * 1.5,
		lineHeight: 1.2,
	});

	const node = (
		<div
			tw="flex flex-col justify-center items-start w-full h-full text-white font-mono"
			style={{
				fontFamily: 'JetBrains Mono, monospace',
				padding: `0 ${xPadding}px`,
				backgroundColor: '#030712',
			}}
		>
			<div tw="font-bold mb-6 leading-tight" style={{fontSize: titleFontSize}}>
				{post.name}
			</div>
			<div tw="font-normal text-gray-300" style={{fontSize: excerptFontSize, lineHeight: 1.2}}>
				{post.excerpt}
			</div>
			<div tw="text-[20px] text-gray-400 mt-10">alistair.blog</div>
		</div>
	);

	const stream = await unstable_createNodejsStream(node, {
		width: 1200,
		height: 630,
		fonts: [JETBRAINS_MONO],
	});

	res.setHeader('Content-Type', 'image/png');
	res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
	res.statusCode = 200;
	res.statusMessage = 'OK';

	stream.pipe(res);
}
