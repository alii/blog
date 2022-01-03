import {PageConfig} from 'next';
import Link from 'next/link';
import {ReactNode} from 'react';
import {posts} from '../posts';

// Sweet zero js 🤑
export const config: PageConfig = {
	unstable_runtimeJS: false,
};

export default function Home() {
	return (
		<main className="space-y-8">
			<div>
				<a
					className="text-sm text-yellow-700 dark:text-yellow-500"
					href="https://old.alistair.blog"
				>
					⚠️ looking for the old blog?
				</a>
			</div>

			<h2>
				<span>alistair.blog</span>{' '}
				<a
					target="_blank"
					href="https://github.com/alii/blog"
					className="text-neutral-500 hover:text-blue-500"
					rel="noreferrer"
				>
					– github
				</a>
			</h2>

			<ul className="space-y-1">
				{posts.map(post => (
					<BlogLink key={post.slug} href={`/${post.slug}`}>
						{post.name}
					</BlogLink>
				))}
			</ul>
		</main>
	);
}

function BlogLink(props: {href: string; children: ReactNode}) {
	return (
		<li>
			<Link passHref href={props.href}>
				<a className="text-blue-500 hover:text-blue-800">{props.children}</a>
			</Link>
		</li>
	);
}
