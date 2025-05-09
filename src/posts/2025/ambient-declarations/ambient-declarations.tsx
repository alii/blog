import {stripIndent} from 'common-tags';
import {Highlighter} from '../../../client/components/highlighter';
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
					If you've ever wondered how TypeScript "knows" about the types in your dependencies, or
					you've seen <code>.d.ts</code> files and felt lost, this is for you.
				</p>

				<hr />

				<h2>What are ambient declarations?</h2>
				<p>
					Ambient declarations are what allow TypeScript to "know" about the types in your
					dependencies and runtime.
				</p>
				<p>
					If you've ever imported a package and magically got autocomplete and type checking, you've
					benefited from ambient declarations.
				</p>

				<h2>How Does TypeScript Find Types?</h2>
				<p>When you import something, TypeScript looks for its types in a few places:</p>
				<ul>
					<li>
						<b>Bundled types:</b> Some packages include their own <code>.d.ts</code> files.
					</li>
					<li>
						<b>DefinitelyTyped:</b> If not, TypeScript looks in <code>@types/</code> packages in{' '}
						<code>node_modules</code>.
					</li>
					<li>
						<b>Your own code:</b> You can add <code>.d.ts</code> files anywhere in your project to
						describe types for JS code, global variables, or even new modules.
					</li>
				</ul>
				<p>
					<b>Example:</b>
					<br />
					If you install <code>lodash</code>, TypeScript will look for{' '}
					<code>node_modules/lodash/index.d.ts</code>. If it's not there, it'll look for{' '}
					<code>node_modules/@types/lodash/index.d.ts</code>.
				</p>

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
				<p>
					<b>
						You can use <code>declare</code> in .ts files too!
					</b>
				</p>
				<Highlighter filename="globals.ts">
					{stripIndent`
						declare const MY_API_KEY: string;
					`}
				</Highlighter>

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

				<h2>Declaring Global Types</h2>
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

				<h2>Declaring Modules by Name and Wildcard</h2>
				<p>
					<b>Named module:</b>
				</p>
				<Highlighter filename="my-legacy-lib.d.ts">
					{stripIndent`
						declare module 'my-legacy-lib' {
							export function doSomething(): void;
						}
					`}
				</Highlighter>

				<p>
					<b>Wildcard module (e.g. for CSS or JSON)</b>:
				</p>

				<div className="space-y-1 5">
					<Highlighter filename="css-modules.d.ts">
						{stripIndent`
						declare module '*.css' {
							const content: { [className: string]: string };
							export default content;
						}
					`}
					</Highlighter>
					<Highlighter filename="json-modules.d.ts">
						{stripIndent`
						declare module '*.json' {
							const value: any;
							export default value;
						}
					`}
					</Highlighter>
				</div>

				<p>Now you can import CSS or JSON files and get type safety!</p>

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
