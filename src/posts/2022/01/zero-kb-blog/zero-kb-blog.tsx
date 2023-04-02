import {stripIndent} from 'common-tags';
import {Highlighter} from '../../../../client/components/highlighter';
import {Post} from '../../../Post';

export class ZeroKbBlog extends Post {
	public name = 'The 0kb Next.js blog';
	public slug = 'zero-kb-nextjs-blog';
	public date = new Date('6 Jan 2022');
	public hidden = false;
	public excerpt = 'How I shipped a Next.js app with a 0kb bundle';
	public keywords = ['nextjs', 'zero', 'bundle', 'nextjs-zero-bundle', 'unstable_runtimeJS'];

	public render() {
		return (
			<>
				<h1>The 0kb Next.js blog</h1>
				<p>
					Ok so this was a little bit clickbaity, but it's not technically a lie. This entire
					website has zero JavaScript on <i>every single page</i>... a Next.js app with zero
					client side JS. How can this be possible?
				</p>
				<h2>Context</h2>
				<p>
					Next.js is a huge abstraction of ReactDOMServer and other helpful utilities for building
					server side rendered apps powered by React. It's really easy to get started with, and
					features things like file system routing, statically generated content and much much more.
					I'm not trying to advertise it but I really really love it. There are a couple things to
					take in from the first sentence here, server side rendering and React.
				</p>
				<p>
					For those of you who are not familiar with React, it's a <b>JavaScript</b> framework for
					building user interfaces. It handles the view layer of an app and is used to render the
					UI. Next.js takes this a step further and allows you to write your own view layer to have
					the first render performed on a server, which allows for a lot of performance and UI
					optimizations because we can ship back a lot less to the client (foreshadowing).
				</p>
				<h2>Runtime JS</h2>
				<p>
					With something called the Next.js <code>PageConfig</code>, we can instruct Next.js to
					supply zero runtime JS to the client. It comes with a couple trade offs but the general
					idea is that we perform our first render on the server (executing JavaScript) and the
					resulting HTML and CSS is "frozen" and sent down to the client over the wire. Zero
					JavaScript runtime in the browser, no <code>&lt;script&gt;</code> tags in sight!
				</p>
				<h2>Why not...?</h2>
				<p>
					As the saying goes, there's no such thing as free lunch. As with anything, doing this
					comes with some tradeoffs. For example, Next has a lot of built in React components that
					can speed up not only your app, but also development speed. Using the zero kb mode, we
					unfortunately cannot make full use of the <code>next/link</code> component; a component
					that prefetches pages so that clicks on links don't cause a full page reload.
					Additionally, we cannot use <code>next/image</code> as this also requires some minimal
					runtime JavaScript (a regular <code>img</code> works just fine). This also means zero
					state updates or literally any JavaScript that would've otherwise been bundled can run.
				</p>
				<p>
					However, apart from that, we are able to eliminate all JavaScript completely. No more
					worrying about installing momentjs and watching your user count drop in realtime. See your
					gorgeous website in pure static HTML & CSS. Gone are the days of bundlephobia.com... I bet
					at this point you are itching to know how to enable it. Well, here's a quick example:
				</p>

				<Highlighter>
					{stripIndent`
						import {PageConfig} from 'next';

						export const config: PageConfig = {
							unstable_runtimeJS: false,
						};

						export default function IndexPage() {
							return <h1>This page has no JavaScript!</h1>;
						}
					`}
				</Highlighter>

				<p>
					And boom! just like that, 0kb bundle. If you are going to use this though, just bear in
					mind that as well as the trade offs mentioned above, you literally cannot use any
					JavaScript in the client anymore for this page. Zero. Nada. Null. Void. That means no
					state updates, no SWR requests. No <code>useEffects</code> (thank god tbh).
				</p>

				<p>
					p.s please check out my twitter <a href="https://twitter.com/alistaiir">@alistaiir</a>{' '}
					:)
				</p>
			</>
		);
	}
}
