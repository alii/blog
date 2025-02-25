import clsx from 'clsx';
import type {GetStaticPaths, GetStaticProps, PageConfig} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {Note} from '../client/components/note';
import {posts} from '../posts';

export const config: PageConfig = {
	unstable_runtimeJS: false,
};

type Props = {
	readonly slug: string;
};

export default function PostPage({slug}: Props) {
	const post = posts.find(post => post.slug === slug)!;

	return (
		<div className="space-y-4">
			<Head>
				<title>{post.name}</title>
				<meta name="description" content={post.excerpt} />
				<meta name="keywords" content={post.keywords.join(', ')} />
				<meta name="theme-color" content={post.hidden ? '#ebb305' : '#171717'} />
			</Head>

			<div>
				<Link
					className="text-blue-500 dark:text-gray-400 hover:text-blue-800 dark:hover:text-gray-600"
					href="/"
				>
					../
				</Link>
			</div>

			{post.hidden && (
				<Note variant="warning" title="Hidden post">
					<p>This post is not listed on the homepage. Please don't share the link</p>
				</Note>
			)}

			<p>
				<time dateTime={post.date.toISOString()} className="dark:text-gray-400">
					{post.date.toDateString()}
				</time>
			</p>

			<main
				className={clsx(
					'prose dark:text-gray-400 dark:prose-hr:border-gray-800 prose-blue prose-img:rounded-md prose-img:w-full dark:prose-invert',
					'prose-hr:border-gray-200',
					'dark:prose-headings:text-gray-300',

					'prose-pre:border prose-pre:border-gray-200 prose-pre:bg-transparent prose-pre:text-gray-700 dark:prose-pre:border-gray-800 dark:prose-pre:text-gray-300',
				)}
			>
				{post.render()}
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
	const slug = params!.slug as string;

	const post = posts.find(post => post.slug === slug);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			slug,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: posts.map(post => ({params: {slug: post.slug}})),
	fallback: 'blocking',
});
