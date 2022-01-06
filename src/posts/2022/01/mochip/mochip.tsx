import {Post} from '../../../Post';

export class Mochip extends Post {
	public name = 'mochip.xyz';
	public slug = 'mochip';
	public date = new Date('6 Jan 2022');
	public excerpt = 'The eventful tale of me getting fed up with my homework';
	public hidden = true;
	public keywords = [
		'school',
		'homework',
		'clout',
		'hegarty maths',
		'educake',
		'homework hack',
		'maths homework',
		'programming',
	];

	public render() {
		return (
			<div>
				<h1>mochip.xyz</h1>
				<p>
					the long awaited story of mochip is finally here. a twisted tale of homework, the 2020
					lockdown, and the end of the world. welcome to the story of mochip, perhaps my most
					ambitious project and indeed interesting.
				</p>
			</div>
		);
	}
}
