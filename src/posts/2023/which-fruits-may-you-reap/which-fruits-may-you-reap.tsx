import {Post} from '../../Post';

export class WhichFruitsMayYouReap extends Post {
	public name = 'Which fruits may you reap?';
	public slug = 'fruits';
	public date = new Date('14 Sep 2023');
	public hidden = true;
	public excerpt = "Which fruits of a mans' labor may you reap?";
	public keywords = ['self-care', 'ethics'];
	public render() {
		return (
			<>
				<h1>Which fruits may you reap?</h1>
				<p>
					I would not say I am lost, but some elucidation would be superb. I believe that the
					biggest threat to oneself is complacency. In terms of the impact it can have on
					productivity, on wellbeing, happiness. I fear I've let myself become entirely complacent
					and comfortable <i>enough</i> to get by. I know I won't achieve great things if I remain
					in the comfortable state I am, but I think I am waiting for something to change and for
					something to happen. Maybe I am waiting for something really bad, in order to make myself
					realise that I'm complacent; the logic is flawed, though. Shouldn't the acknowledgement of
					my perhaps deficient behaviour prompt me to amend it?
				</p>

				<hr />

				<p>
					I realise that the introduction above jumps into the deep end quite quickly <i>(pun)</i>,
					but bear with me for a moment. I've been trying to pin down into words some of my emotions
					and thoughts, and I wanted to share how I've felt. Obviously I've worked and learnt a lot
					in the past few years since dropping out of school and properly entering the software
					workforce.
				</p>
			</>
		);
	}
}
