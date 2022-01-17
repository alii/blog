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
			<>
				<h1>mochip.xyz</h1>
				<p>
					the long awaited story of mochip is finally here. a twisted tale of homework, the 2020
					lockdown, and the end of the world. welcome to the story of mochip, perhaps my most
					ambitious project and indeed interesting.
				</p>

				<p>
					Small disclaimer: this post was written as a teenager with no will to partake in their
					home studies. Education is important!
				</p>

				<h2>the back story</h2>
				<p>
					2018, my school introduces a new online homework platform for students. It's called
					HegartyMaths and it's <i>absolutely fucking brilliant</i>... Teachers set a topic and
					HegartyMaths shows us an instructional video describing the topic including helpful tips
					and tricks that examiners would want us to know in a test. Our teachers can see how much
					of the video we've watched and to add insult to injury, there's a quiz afterwards to prove
					that we understand what we've just learnt. Knock knock. Who's there? More work? Oh right,
					now we have to write down notes in a separate book every time we watch one of the videos.
					Sigh...
				</p>
			</>
		);
	}
}
