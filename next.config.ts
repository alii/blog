import type {NextConfig} from 'next';

const config: NextConfig = {
	async redirects() {
		return [
			{
				source: '/post/:slug',
				destination: 'https://old.alistair.blog/post/:slug',
				statusCode: 301,
			},
			{
				source: '/:slug',
				destination: 'https://alistair.sh/:slug',
				statusCode: 301,
			},
			{
				source: '/',
				destination: 'https://alistair.sh/blog',
				statusCode: 301,
			},
		];
	},
};

export default config;
