import {stripIndent} from 'common-tags';
import {Highlighter} from '../../../client/components/highlighter';
import {Note} from '../../../client/components/note';
import {Post} from '../../Post';

export class AmbientDeclarations extends Post {
	public name = 'Ambient Declarations in TypeScript: The Complete Guide';
	public slug = 'ambient-declarations';
	public date = new Date('9 May 2025');
	public hidden = true;
	public keywords = ['Ambient Modules', 'TypeScript', 'Module Resolution'];
	public excerpt =
		"I recently landed a pull request in Bun that reorganised and rewrote significant portions of Bun's TypeScript definitions. Here's what I learned.";

	public render() {
		return (
			<>
				<h1>Ambient Declarations</h1>

				<p>
					I recently landed a pull request (
					<a href="https://github.com/oven-sh/bun/pull/18024">#18024</a>) in{' '}
					<a href="https://bun.sh/">Bun</a> that reorganized and rewrote significant portions of
					Bun's TypeScript definitions. Working on this PR made me realize how little documentation
					there is on ambient declarations, so I wanted to write about it.
				</p>

				<h2>What are ambient declarations?</h2>
				<p>I'll start by answering this question with a couple questions...</p>
				<blockquote>
					1. How does TypeScript know the types of my <code>node_modules</code>, which are mostly
					all .js files?
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
					They use the file extension <code>.d.ts</code>, with the `.d` denoting "declaration".
				</p>
				<p>
					By <i>things</i> I mean anything you import and use. That could be functions, classes,
					variables, modules themselves, APIs from your runtime, etc.
				</p>

				<p>
					If you've ever imported a package and magically got autocomplete and type checking, you've
					benefited from ambient declarations.
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
					It's completely legitimate and legal to use the <code>declare</code> keyword inside of
					regular .ts files. There are many use cases for this, a common one being declaring types
					of globals.
				</Note>

				<hr />

				<h2>How Does TypeScript Find Types?</h2>
				<p>
					Module resolution is an incredibly complex topic, but it boils down to TypeScript looking
					for relevant types in a few places.
				</p>
				<ul className="space-y-6">
					<li>
						<b>Bundled types</b>: Some packages include their own <code>.d.ts</code> files.
					</li>
					<li>
						<b>DefinitelyTyped</b>: If not, TypeScript looks in <code>@types/</code> packages in{' '}
						<code>node_modules</code>.
					</li>
					<li>
						<b>Your own project</b>: You can add <code>.d.ts</code> files anywhere in your project
						to describe types for JS code, global variables, or even new modules.
					</li>
					<li>
						<b>Source</b>: If the module resolution algorithm resolves to an actual TypeScript file,
						then the types can be read from the original source code anyway. Some packages on NPM
						also publish their TypeScript source and allow modern tooling to consume it directly.{' '}
						<b>
							<u>Ambient declarations are NOT used in either of these scenarios</u>
						</b>
						.
					</li>
				</ul>

				<h2>Ambient vs. Regular Declarations</h2>
				<p>
					<b>Regular declarations</b> are for code you write and control.
				</p>
				<Highlighter filename="add.ts">
					{stripIndent`
						export function add(a: number, b: number): number {
							return a + b;
						}`}
				</Highlighter>
				<p>
					<b>Ambient declarations</b> are for code that exists elsewhere.
				</p>
				<Highlighter filename="add.d.ts">
					{stripIndent`
						export declare function add(a: number, b: number): number;
					`}
				</Highlighter>
				<p>
					The <code>declare</code> keyword tells TypeScript: "This exists at runtime, but you won't
					find it here."
				</p>

				<h2>Module vs. Script Declarations</h2>
				<p>
					<b>Module declarations:</b> Any <code>.d.ts</code> file with a top-level{' '}
					<code>import</code> or <code>export</code>. Types are scoped to the module.
					<br />
					<b>Script (global) declarations:</b> No top-level import/export. Types are added to the
					global scope.
				</p>
				<table className="border my-4">
					<thead>
						<tr>
							<th>File Type</th>
							<th>Example Syntax</th>
							<th>Scope</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Module</td>
							<td>
								<code>export declare function foo(): void;</code>
							</td>
							<td>Module only</td>
						</tr>
						<tr>
							<td>Script (global)</td>
							<td>
								<code>declare function setTimeout(...): number;</code>
							</td>
							<td>Global</td>
						</tr>
					</tbody>
				</table>
				<p>
					<b>Rule of thumb:</b> An ambient declaration file is global unless it has a top-level
					import/export.
				</p>

				<Note variant="warning" title="Global pollution">
					Script files can pollute the global namespace and can very easily{' '}
					<a href="https://github.com/oven-sh/bun/issues/8761">clash with other declarations</a>.
					Prefer the module pattern unless you <i>really</i> need to patch <code>globalThis</code>.
				</Note>

				<p>
					Why does this distinction exist? TypeScript is old in JavaScript's history - it predates
					the modern module system (ESM) and needed to support the "everything is global" style of
					early JS. That's why it still supports both module and script (global) declaration files.
				</p>

				<p>
					<b>How does TypeScript treat these differently?</b>
				</p>

				<ul>
					<li>
						<b>Module:</b> Everything you declare is private to that module and must be explicitly
						imported by the consumer - just like regular TypeScript/ESM code.
					</li>
					<li>
						<b>Script (global):</b> Everything is injected directly into the global scope of every
						file in your program. This is how the DOM lib ships types like <code>window</code>,{' '}
						<code>document</code>, and functions like <code>setTimeout</code>.
					</li>
				</ul>

				<p>
					<b>When would you use each?</b>
				</p>
				<ul>
					<li>
						<b>Module:</b> For packages, libraries, and almost all modern code.
					</li>
					<li>
						<b>Script:</b> For patching browser globals, legacy code, or when you really need to add
						something to the global scope.
					</li>
				</ul>

				<Note variant="info" title="Edge case: Augmenting the global scope from a module">
					You can still augment the global scope from inside a module-style declaration file by
					using the <code>global {'{ ... }'}</code> escape hatch, but that should be reserved for
					unavoidable edge-cases.
				</Note>
				<p>
					<b>Real-world gotchas:</b> If you accidentally omit an import/export, your types might
					leak everywhere! If two script files declare the same global, you'll get conflicts and
					headaches.
				</p>

				<h2>Declaring global types</h2>
				<p>Suppose you want to add a global variable for your project:</p>
				<Highlighter filename="globals.d.ts">
					{stripIndent`
						declare const MY_API_KEY: string;
					`}
				</Highlighter>
				<p>
					Now you can use <code>MY_API_KEY</code> anywhere, and TypeScript won't complain.
				</p>
				<p>
					To add types to the <code>window</code> object:
				</p>
				<Highlighter filename="globals.d.ts">
					{stripIndent`
						interface Window {
							myCustomProperty: number;
						}
					`}
				</Highlighter>

				<h2>Declaring modules by name</h2>

				<p>
					You can declare a module by its name. As long as the ambient declaration file gets
					referenced/ included in your build somehow then TypeScript then the module will be
					available.
				</p>

				<Highlighter filename="my-legacy-lib.d.ts">
					{stripIndent`
						declare module 'my-legacy-lib' {
							export function doSomething(): void;
						}
					`}
				</Highlighter>

				<p>
					This syntax also allows for declaring modules with wildcard matching. We do this in{' '}
					<code>@types/bun</code>, since Bun allows for importing <code>.toml</code> and{' '}
					<code>.html</code> files.
				</p>

				<Highlighter filename="bun.d.ts">
					{stripIndent`
						declare module '*.toml' {
							const content: unknown;
							export default content;
						}
						declare module '*.html' {
							const content: string;
							export default content;
						}
					`}
				</Highlighter>

				<h2>Writing Your Own .d.ts Files</h2>
				<p>Suppose you're using a JS library with no types. Here's how to add them:</p>

				<ol>
					<li>
						Create a new <code>.d.ts</code> file (you could put this in a <code>types/</code>{' '}
						folder)
					</li>

					<li>
						<p>Write a module declaration:</p>

						<Highlighter filename="types/my-lib.d.ts">
							{stripIndent`
						declare module 'my-lib' {
							export function coolFeature(x: string): number;
						}
					`}
						</Highlighter>
					</li>

					<li className="pt-4">
						Make sure your <code>tsconfig.json</code> includes the types folder (usually automatic).
					</li>
				</ol>

				<h2>Compiler contract</h2>
				<p>
					Since ambient modules don't contain runtime code, they should be treated like "promises"
					or "contracts" that you are making with the compiler. They're like documentation that
					TypeScript can understand. Just like documentation for humans, it can get out of sync with
					the actual runtime code. A lot of the work I'm doing at Bun is ensuring our type
					definitions are up to date with Bun's runtime APIs.
				</p>
				<h2>Conflicts</h2>
				<p>
					While doing research for the pull request mentioned at the beginning, I found a few cases
					where the compiler was not able to resolve the types of some of Bun's APIs because we had
					declared that certain symbols existed, where they might have already been declared by{' '}
					<code>lib.dom.d.ts</code> (the builtin types that TypeScript provides by default) or
					things like <code>@types/node</code> (the types for Node.js).
				</p>
				<p>
					Avoiding these conflicts is unfortunately not always possible. Bun implements a really
					solid best-effort approach to this, but sometimes you just have to get creative (and maybe
					a little hacky).
				</p>

				<h2>Gotchas</h2>
				<ul>
					<li>
						<b>"Cannot find module" or "type not found" errors:</b> Make sure your{' '}
						<code>.d.ts</code> file is included in the project (check <code>tsconfig.json</code>'s{' '}
						<code>include</code>/<code>exclude</code>).
					</li>

					<li>
						<b>Conflicts:</b> If two libraries declare the same global, you'll get errors. Prefer
						module declarations, and avoid globals unless necessary.
					</li>
				</ul>

				<h2>Resources</h2>
				<ul>
					<li>
						<a href="https://github.com/oven-sh/bun/tree/main/packages/bun-types">
							Bun's TypeScript types
						</a>
					</li>
					<li>
						<a href="https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html">
							TypeScript Handbook: Declaration Files
						</a>
					</li>
					<li>
						<a href="https://github.com/DefinitelyTyped/DefinitelyTyped">DefinitelyTyped</a>
					</li>
				</ul>

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
