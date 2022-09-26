import Link from 'next/link';
import {Post} from '../../../Post';

export class ServerlessOAuthPart2 extends Post {
	public name = 'Serverless OAuth with Next.js (part 2)';
	public slug = 'serverless-discord-oauth-pt-2';
	public date = new Date('31 May 2022');
	public hidden = true;
	public keywords = ['serverless', 'oauth', 'discord', 'nextjs'];
	public excerpt =
		"The second part of implementing basic Discord OAuth on Vercel's serverless platform";

	public render() {
		return (
			<>
				<h1>Serverless Discord OAuth with Next.js</h1>

				<p>
					This post assumes you've read part one,{' '}
					<Link href="/serverless-discord-oauth">which can be found here</Link>.
				</p>

				<p>
					So, you've got your OAuth setup, how can we improve it? Today we'll be implementing a
					library I've written called <code>nextkit</code>, as well as doing a couple of other nice
					validation and UX improvements.
				</p>

				<h2>nextkit</h2>

				<p>
					nextkit (or Nextkit or NextKit) is a library I wrote to accelerate the development of API
					routes in Next.js — given our setup is already using Next's API routes, nextkit is really
					a perfect fit.
				</p>

				<h3>Installation</h3>

				<p>
					To install <code>nextkit</code>, you can run <code>yarn add nextkit</code> — or if you
					prefer NPM, <code>npm i --save nextkit</code>
				</p>
			</>
		);
	}
}
