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
		"I recently landed a large pull request in Bun that reorganised and rewrote significant portions of Bun's TypeScript definitions. Here's what I learned.";

	public render() {
		return (
			<>
				<h1>Ambient Declarations</h1>

				<p>
					I recently landed a pull request (
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
					2. How does TypeScript know the types of APIs that exist in my runtime?
				</blockquote>

				<p>
					The short answer: <b>It can't!</b>
				</p>

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
					Ambient declarations are almost always defined as modules. Modern apps and libraries are
					authored in ESM and use a bundler/other tooling if deploying to the web. TypeScript makes
					a differentiation, though, because TypeScript is old, like, really old in terms of
					JavaScript's history. It predates the modern module system, ESM, and so it's for this
					reason that TypeScript supports script-like declarations that exist in the global scope.
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
					The rule of thumb is: Ambient declaration file is a script/global unless top level imports
					and exports are present.
				</p>

				<p>
					You can still augment the global scope from inside a module-style declaration file by
					using the <code>declare global &#123; ... &#125;</code> escape hatch, but that should be
					reserved for unavoidable edge-cases.
				</p>

				<Note variant="warning" title="Be explicit">
					Script files can pollute the global namespace and can very easily{' '}
					<a href="https://github.com/oven-sh/bun/issues/8761">clash with other declarations</a>.
					Prefer the module pattern unless you <i>really</i> need to patch <code>globalThis</code>.
				</Note>

				<h2>Globally declaring modules by name</h2>

				<p>
					Ambient declarations can, at the global/top level scope, declare modules by name. This is
					how things like the <code>bun</code> module or the <code>node:fs</code> module are
					declared.
				</p>

				<p>
					Here's a boiled-down version of how Bun's <code>Bun.file()</code> function gets defined:
				</p>

				<Highlighter filename="bun.d.ts">
					{stripIndent`
						declare module 'bun' {
							function file(path: string): BunFile;

							interface BunFile extends Blob {
								/* ... */
							}
						}
					`}
				</Highlighter>

				<p className="text-sm">
					You can{' '}
					<a href="https://github.com/oven-sh/bun/blob/de487713ed48e8b170c7014534864aa61de212a2/packages/bun-types/bun.d.ts#L4340">
						see the full declaration here
					</a>
					.
				</p>

				<p>
					Since we've already used the <code>declare</code> keyword at the top of this scope AND the
					declaration file itself is a script (not a module)
				</p>

				<h3>Declaring modules by wildcard</h3>

				<p>
					Another great trick that the <code>declare module 'name'</code> syntax allows you to do is
					declare modules with wildcard matching. Since Bun allows for importing things like{' '}
					<code>.toml</code> files and <code>.html</code> files, we use this declaring the types of
					these files.
				</p>

				<div className="space-y-1.5">
					<Highlighter filename="bun.d.ts">
						{stripIndent`
							declare module '*.toml' {
								const content: unknown;
								export default content;
							}
						`}
					</Highlighter>

					<Highlighter filename="app.ts">
						{stripIndent`
							import myTomlFile from './my-file.toml';
							myTomlFile; // => typed as \`unknown\`
						`}
					</Highlighter>
				</div>

				<h2>Gotchas</h2>

				<h3>Compiler contract</h3>
				<p>
					Since ambient modules don't contain runtime code, they should be treated like "promises"
					or "contracts" that you are making with the compiler. They're like documentation that
					TypeScript can understand. Just like documentation for humans, it can get out of sync with
					the actual runtime code. A lot of the work I'm doing at Bun is ensuring our type
					definitions are up to date with Bun's runtime APIs.
				</p>

				<h3>Conflicts</h3>
				<p>
					While doing research for the pull request mentioned at the beginning, I found a few cases
					where the compiler was not able to resolve the types of some of Bun's APIs because we had
					declared that certain symbols existed, where they might have already been declared by{' '}
					<code>lib.dom.d.ts</code> (the builtin types that TypeScript provides by default) or
					things like <code>@types/node</code> (the types for Node.js).
				</p>

				<p>
					Avoiding these conflicts is unfortunately not always possible. Bun implements a really
					solid best-effort approach to this.
				</p>

				<hr />

				<p>Thanks to the following people for reading revisions and helping with this post</p>

				<ul>
					<li>
						<a href="https://cnrad.dev">Conrad Crawford</a>
					</li>
				</ul>
			</>
		);
	}
}
