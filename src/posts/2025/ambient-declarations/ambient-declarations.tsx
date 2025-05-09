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
					TypeScript definitions. It taught me a lot about ambient declarations, so I wanted to
					share what I learnt.
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

				<p>The shortest answer is that it can't.</p>

				<p>
					The short but longer answer is that it <i>can</i>, with ambient declarations. Ambient
					declarations are files that exist somewhere in your project (usually in{' '}
					<code>node_modules</code>) that contain no runtime code, only type information. They end
					in the file extension <code>.d.ts</code>, with the `.d` denoting "declaration"
				</p>

				<p>A simple ambient declaration could look like this:</p>

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
					This is easy enough to understand. You can see we have a JSDoc comment, the types of the
					arguments, the return type, an export keyword, etc. It almost looks like real TypeScript,
					except the really important part to note here is the keyword <code>declare</code> is used.
					This keyword tells TypeScript to not expect any runtime code to exist here, it's purely a
					type declaration only.
				</p>

				<Note variant="tip" title="Using the declare keyword in source code">
					It's useful to note that it is completely legitimate and legal to use the{' '}
					<code>declare</code> keyword inside of regular .ts files. There are many use cases for
					this, a common one being declaring types of globals.
				</Note>

				<h2>Module? Script? Global?... What?</h2>

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
