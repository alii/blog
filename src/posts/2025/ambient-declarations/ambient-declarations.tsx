// Slightly broken rule
/* eslint-disable react/jsx-child-element-spacing */

import {stripIndent} from 'common-tags';
import {Highlighter} from '../../../client/components/highlighter';
import {Note} from '../../../client/components/note';
import {Post} from '../../Post';

export class AmbientDeclarations extends Post {
	public name = 'Ambient Declarations';
	public slug = 'ambient-declarations';
	public date = new Date('9 May 2025');
	public hidden = true;
	public keywords = ['Ambient Modules', 'TypeScript', 'Module Resolution'];
	public excerpt =
		"I recently landed a large pull request in Bun that reorganised/rewrote significant portions of Bun's TypeScript definitions.";

	public render() {
		return (
			<>
				<h1>Ambient Declarations</h1>

				<p>
					I recently landed a larger pull request (
					<a href="https://github.com/oven-sh/bun/pull/18024">#18024</a>) in{' '}
					<a href="https://bun.sh/">Bun</a> that reorganised/rewrote significant portions of Bun's
					TypeScript definitions. Working on this PR made me realise how little documentation there
					is on ambient declarations, so I wanted to write about it.
				</p>

				<hr />

				<h2>What even are ambient declarations??</h2>

				<p>I'll start by answering this question with a couple questions...</p>

				<blockquote>
					1. How does TypeScript know the types of my node_modules, which are mostly all .js files?
				</blockquote>

				<blockquote>
					2. How does TypeScript know the types of APIs that exist in the my runtime?
				</blockquote>

				<p>Answer: It can't!</p>

				<p>Thanks for reading!</p>

				<br />
				<br />
				<p>...</p>
				<br />
				<br />

				<p>
					The short but slightly longer answer is that it <i>CAN</i> with ambient declarations!
					These are files that exist somewhere in your project (usually in <code>node_modules</code>
					) that contain type information and tell TypeScript what <i>things</i> exist at runtime.
					They use the file extension <code>.d.ts</code>, with the `.d` denoting "declaration"
				</p>

				<p>
					By <i>things</i> I mean anything you import and use. That could be functions, classes,
					variables, modules themselves, etc.
				</p>

				<p>A simple ambient declaration file could look like this:</p>

				<Highlighter filename="add.d.ts">
					{stripIndent`
						/**
						 * Performs addition using AI and LLMs
						 * 
						 * @param a - The first number
						 * @param b - The second number
						 * 
						 * @returns The sum of a and b (probably)
						 */
						export declare function add(a: number, b: number): Promise<number>;
					`}
				</Highlighter>

				<p>
					If you can already read TypeScript this ambient declaration will be very easy to
					understand. You can clearly see a JSDoc comment, the types of the arguments, the return
					type, an export keyword, etc. It almost looks like real TypeScript, except the really
					important part to note here is the keyword <code>declare</code> is used. This keyword
					tells TypeScript to not expect any runtime code to exist here, it's purely a type
					declaration only.
				</p>

				<Note variant="info" title="Using the declare keyword in source code">
					It's useful to note that it is completely legitimate and legal to use the{' '}
					<code>declare</code> keyword inside of regular .ts files. There are many use cases for
					this, a common one being declaring types of globals.
				</Note>

				<h2>Module? Script? Global?... What?</h2>

				<p>
					One of the most confusing quirks of ambient declarations is that there are technically two
					types of these files: Modules and Scripts.
				</p>

				<p>
					Ambient declarations are almost always defined as modules. The reason for this is that
					TypeScript is old. Like, really old. It predates the modern module system, ESM/ES Modules.
					It's for this reason that TypeScript has support for global script-like files that exist
					in the global scope. Almost all apps authored in TypeScript nowadays use some kind of
					module system and bundler if being used on the web.
				</p>

				<p>
					At first glance every <code>.d.ts</code> file looks the same — there is no runtime
					JavaScript in any of them. The distinction between a <i>module</i> declaration file and a{' '}
					<i>script</i> declaration file is therefore <b>purely about scope</b> — how TypeScript
					wires the names you declare.
				</p>

				<p>
					If a declaration file has <b>any</b> top-level <code>import</code> or
					<code>export</code> (even something as small as <code>export &#123;&#125;</code>) it is
					treated as a <b>module</b>. Everything you declare is private to that module and must be
					explicitly imported by the consumer — exactly the same semantics you are used to at
					runtime. This is the form you will use for virtually every package you publish to npm.
				</p>

				<Highlighter filename="add.d.ts">
					{stripIndent`
						// ✅ A <module> declaration file
						export declare function add(a: number, b: number): number;
					`}
				</Highlighter>

				<p>
					If the file contains <b>no</b> top-level imports or exports, TypeScript falls back to the
					older <b>script</b> semantics: everything is injected directly into the global scope of
					every file in your program. This is how the DOM lib ships types such as{' '}
					<code>window</code>, <code>document</code>, and functions like <code>setTimeout</code>.
				</p>

				<Highlighter filename="globals.d.ts">
					{stripIndent`
						// ✅ A <script> declaration file
						declare const process: {
						  env: Record<string, string | undefined>;
						};

						declare function setTimeout(cb: () => void, ms?: number): number;
					`}
				</Highlighter>

				<p>
					You can still augment the global scope from inside a module-style declaration file by
					using the <code>declare global &#123; ... &#125;</code> escape hatch, but that should be
					reserved for unavoidable edge-cases.
				</p>

				<Note variant="warning" title="Be explicit">
					Script files pollute the global namespace and can easily clash with other libraries.
					Prefer the module pattern unless you <i>really</i> need to patch <code>globalThis</code>.
				</Note>

				<h2>Gotchas</h2>

				<h3>Compiler contract</h3>
				<p>
					Since ambient modules don't contain runtime code, they should be treated like "promises"
					or "contracts" that you are making with the compiler. They're like documentation that
					TypeScript understands - meaning they can get out of sync with the actual runtime js!
				</p>

				<h3>Module vs Script</h3>

				<hr />

				<p>Thanks goes to the following people for reading revisions and helping with this post</p>

				<ul>
					<li>
						<a href="https://cnrad.dev">Conrad Crawford</a>
					</li>
				</ul>
			</>
		);
	}
}
