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
					Your biggest threat is complacency, I think. It's a threat on productivity and on general
					wellbeing. Oftentimes I feel that I've let myself become complacent and comfortable{' '}
					<i>just enough</i> to make it through each day. Achieving great things will be impossible
					for me if I'm constantly in the "comfortable" state I am. Sometimes it feels like I'm
					waiting for some change to happen to me, rather than that change be something I make
					happen myself, or possibly waiting for a bad change in order to make myself realise that
					I'm complacent; the logic is flawed, though. Shouldn't the acknowledgement of my perhaps
					deficient behaviour prompt me to amend it? Some elucidation would be superb.
				</p>

				<hr />

				<p>
					I realise that introduction is quite depressive. In reality life is sunshines and
					rainbows. I'm a pretty optimistic person in general, so this post exists because I've been
					trying to turn some thoughts from the past few years into something tangible. I find it
					somewhat therapeutic to write, and to an extent it helps me rationalise and argue with
					myself. So, I hope you can find some use reading this, like I do writing it.
				</p>

				<p>
					Through periods of reflection (often as I'm drifting off to sleep each night), I've come
					to see "Which fruits may you reap?" as a question urging us to look inward. Are we truly
					satisfied with what we're getting out of life not just financially but also in terms of
					time spent with family or outdoors or doing non-work things. It's so easy to stick with
					what's comfortable because it requires no thought.
				</p>

				<p>
					When I reflect on my personal experiences, I realize how often I've leaned on
					circumstance, perhaps more than I care to admit in conversation. In questioning which
					fruits I "deserve," I can't ignore all the times I've needed a nudge, a resource, or a
					helping hand, many times it feels like I am reaping the rewards undeservedly.
				</p>

				<p>
					Another layer to this is the ethics of claiming fruits that we may not have entirely
					earned. Are there times when I've seized credit for a group effort? Or have I ever
					overestimated my own contributions while downplaying others'? Asking these questions
					shines a light not only on my actions as well as expectations, revealing whether I might
					be reaping more than my share. Recognizing these blind spots offers a sobering glance into
					how we measure our merits including how we overestimate them.
				</p>

				<hr />

				<p>Living is like 100% good 98.5% of the time. I'm not worried.</p>
			</>
		);
	}
}
