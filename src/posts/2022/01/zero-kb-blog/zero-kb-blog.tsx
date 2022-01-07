import {Post} from '../../../Post';

export class ZeroKbBlog extends Post {
	public name = 'The 0kb Next.js blog';
	public slug = 'zero-kb-nextjs-blog';
	public date = new Date('6 Jan 2022');
	public hidden = true;
	public excerpt = 'How I shipped a Next.js app with a 0kb bundle';
	public keywords = ['nextjs', 'zero', 'bundle', 'nextjs-zero-bundle', 'unstable_runtimeJS'];

	public render() {
		return (
			<>
				<h1>The 0kb Next.js blog</h1>
				<p>
					ok so this was a little bit clickbaity, but it's not technically a lie. this website has a
					zero kilobyte bundle on every single page, except it uses javascript... how?
				</p>
			</>
		);
	}
}
