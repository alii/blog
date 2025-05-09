// Slightly broken rule
/* eslint-disable react/jsx-child-element-spacing */

import {Post} from '../../Post';

export class AmbientModules extends Post {
	public name = 'Ambient Modules';
	public slug = 'ambient-modules';
	public date = new Date('9 May 2025');
	public hidden = true;
	public excerpt = 'Understand ambient modules';
	public keywords = ['Ambient Modules', 'TypeScript', 'Module Resolution'];

	public render() {
		return (
			<>
				<h1>Ambient Modules</h1>

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
