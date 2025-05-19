import type {NextConfig} from 'next';

const config: NextConfig = {
	async redirects() {
		return [
			{
				source: '/post/:slug',
				destination: 'https://old.alistair.blog/post/:slug',
				permanent: true,
			},
			{
				source: '/:slug',
				destination: 'https://alistair.sh/:slug',
				permanent: true,
			},
			{
				source: '/',
				destination: 'https://alistair.sh/blog',
				permanent: true,
			},
		];
	},
};

export default config;
