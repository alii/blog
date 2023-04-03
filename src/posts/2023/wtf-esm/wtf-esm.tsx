import {stripIndent} from 'common-tags';
import {ExternalLink} from '../../../client/components/external-link';
import {Highlighter} from '../../../client/components/highlighter';
import {Post} from '../../Post';
import {Note} from '../../../client/components/note';

export class WTFESM extends Post {
	public name = 'WTF, ESM!?';
	public slug = 'wtf-esm';
	public date = new Date('2023-04-03');
	public hidden = true;
	public excerpt =
		'I recently Tweeted about publishing a dual ESM and CJS package to npm. It got a lot of likes, and here is why that matters.';
	public keywords = ['javascript', 'esm', 'typescript', 'publish', 'package', 'npm', 'node'];

	public render(): JSX.Element {
		return (
			<>
				<h1>WTF, ESM!?</h1>

				<p>
					I{' '}
					<ExternalLink href="https://twitter.com/alistaiir/status/1634274673876783120">
						recently Tweeted
					</ExternalLink>{' '}
					about publishing a dual ESM and CJS package to npm. It got a lot of likes, and here is why
					that matters. It's important that you understand that I was wrong in my Tweet, and things
					are arguably easier or more difficult than they seem. This is the current state of
					publishing a JS package.
				</p>

				<h3>Preface</h3>

				<p>
					I am so incredibly grateful for the absolutely wonderful{' '}
					<ExternalLink href="https://twitter.com/atcb">Andrew Branch</ExternalLink>, who took a lot
					of time out of his vacation to correct my Tweet and wrote{' '}
					<ExternalLink href="https://twitter.com/atcb/status/1634653474041503744">
						this excellent thread
					</ExternalLink>
					. A lot of this blog post is regurgitated text of how I interpreted his Tweets.
				</p>

				<p>
					Andrew works on TypeScript itself at Microsoft, specifically on auto imports and modules.
					He's the only person on the planet who knows exactly how this works inside out. He will be
					summoned if you say "module resolution" three times in the dark. Thank you Andy - you're
					truly a super star ⭐💖
				</p>

				<hr />

				<p>
					Right now, it's extradordinarly clear we are experiencing growing pains in our great
					migration to ECMAScript Modules. Below is the part of my <code>package.json</code> that I
					posted.
				</p>

				<Highlighter language="json">
					{stripIndent`
                        {
                            "type": "module",
                            "main": "./dist/index.cjs",
                            "module": "./dist/index.js",
                            "types": "./dist/index.d.ts",
                            "exports": {
                                ".": {
                                    "types": "./dist/index.d.ts",
                                    "import": "./dist/index.js",
                                    "require": "./dist/index.cjs"
                                },
                                "./package.json": "./package.json"
                            }
                        }
                    `}
				</Highlighter>

				<p>
					As mentioned above, I made some mistakes here. First of all, it's important to
					diffrentiate between what is runtime code that engines will understand (what is
					JavaScript), and what is type definitions (what is TypeScript). This (seems) easy enough,
					we can see clearly that there are two <code>types</code> fields. One is under the{' '}
					<code>.</code> entrypoint for <code>exports</code>, the other is at the root. Let's break
					it down.
				</p>

				<h3>Where did I go wrong?</h3>

				<p>
					It's pretty hard to get a conclusive answer from the "crowd" of JavaScript developers
					about the best way to publish a package to npm. Everyone will have different answers. We
					all seem to be following what already exists on GitHub and npm. There are lots of packages
					that are published technically incorrectly but used and installed by millions of people.
					To me, this is a colloquial standard. Here's what I <b>*thought to be true*</b>, and so do
					most other devs...
				</p>

				<Note variant="warning" title="Warning">
					Below is not the correct way to publish a package to npm. This is what I thought was
					correct at the time of Tweeting.
				</Note>

				<ul>
					<li>
						<code>.types</code> at the root is for TypeScript type definitions. A single{' '}
						<code>.d.ts</code> file can define all exported symbols in your package.
					</li>

					<li>
						<code>.main</code> is for CJS before <code>exports</code> existed. You can emit a single
						CJS compatible file that can be consumed by (legacy) runtimes.
					</li>

					<li>
						<code>.module</code> is for an ESM entrypoint before <code>exports</code> existed. This
						was mostly used by bundlers like Webpack, and has never been part of any standard. It's
						superseded by <code>exports</code>, but it might be good to keep supporting the older
						bundlers.
					</li>

					<li>
						<code>.exports</code> is the new standard for defining entrypoints for your package. It
						is a map of entrypoints to files. The <code>.</code> entrypoint is the default
						entrypoint. We also include <code>./package.json</code> so the package.json file is also
						accessible. The <code>exports</code> field is supported in modern runtimes. Node has
						supported it since v16.0.0 - for this reason, you will see <code>exports</code>{' '}
						sometimes referenced as node16.
					</li>

					<li>
						<code>.exports[].types</code> is for TypeScript type definitions. A single
						<code>.d.ts</code> file can define all exported symbols in your package for both CJS and
						ESM.
					</li>

					<li>
						<code>.exports[].import</code> is for ESM. This is the entrypoint for how a modern
						runtime should import your package when running under CommonJS. It is a single ESM
						compatible file.
					</li>

					<li>
						<code>.exports[].require</code> is for CJS. This is the entrypoint for how a modern
						runtime should import your package when running under CommonJS. It is a single CJS
						compatible file.
					</li>
				</ul>

				<p>
					I made a few mistakes here. First of all, types are specific to ESM and CJS. This means
					there should be <b>two</b> <code>types</code> fields. One for ESM, one for CJS. Even the
					TypeScript documentation gets this wrong, and is something they're working on updating.
					Solutions for this are also pretty wild. I've managed to get things working by simply
					copying my <code>index.d.ts</code> to <code>index.d.cts</code> after bundling, and making
					the following changes to my <code>package.json</code>.
				</p>

				<Highlighter language="json">
					{stripIndent`
                            {
                                "exports": {
                                    ".": {
                                        "import": {
                                            "default": "./dist/index.js",
                                            "types": "./dist/index.d.ts"
                                        },
                                        "require": {
                                            "default": "./dist/index.cjs",
                                            "types": "./dist/index.d.cts"
                                        }
                                    },
                                    "./package.json": "./package.json"
                                }
                            }
                        `}
				</Highlighter>

				<p>
					Note that we point to a .js file and not .mjs when targeting ESM. This is because our
					package.json has <code>type</code> set to <code>module</code>. This tells our runtime that
					all files are assumed to be ESM unless they have a <code>.cjs</code> extension. There's no
					such thing as an esm package, only esm files. Using <code>"type": "module",</code> is just
					a way to tell the runtime to interpret existing files as ESM.
				</p>

				<p>
					Wow, this is getting quite messy. We shouldn't have to expand the object so much that it
					starts to get unreadible.
				</p>

				<p>Also, I thought that col</p>

				<h3>What gives?</h3>

				<Note variant="info" title="Note">
					I'm still figuring this all out, and I'm not an expert. I'm just trying to share what I
					have learned so far. If you have any corrections or suggestions, please let me know!
				</Note>
			</>
		);
	}
}
