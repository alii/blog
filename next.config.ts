import type {NextConfig} from 'next';

const config: NextConfig = {
	async redirects() {
		return [
			{
				source: '/post/:slug',
				destination: 'https://old.alistair.blog/post/:slug',
				permanent: true,
			},
		];
	},
};

export default config;
