import {stripIndent} from 'common-tags';
import {Highlighter} from '../../../../client/components/highlighter';
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
					ambitious and indeed interesting project.
				</p>

				<p>
					Small disclaimer: this post was written as a teenager with no will to partake in their
					home studies. Education is important! Are you sitting comfortably? Then I'll begin...
				</p>

				<h2>The back story</h2>
				<p>
					Let's set the scene. 2018, my school introduces a new online homework platform for
					students. It's called HegartyMaths and it does a <i>lot</i>. It's fairly simple, teachers
					choose a topic to set for us as homework, with that we get a 10-15 minute
					tutorial/informational video on the subject (of which we have to write down notes whilst
					watching) and a shortish quiz to complete after finishing the video. It's a lot of work,
					especially the quiz, and in the worst cases can take up to an hour to complete one topic
					(bad).
				</p>

				<p>
					Software engineers are naturally lazy individuals. Sure, some get up at 3:30am and go for
					a "light" 2 hour run in Silicon Valley (before stopping to get their Cloudy Toffee and
					Caramel Iced Frappe Latte with sprinkles and extra cream and sugar from Philz Coffee), but
					most of us are lazy. Homework then, naturally, is an arduous task. So, still 2018, myself
					and a close friend of mine by the name of{' '}
					<a href="https://hiett.dev" target="_blank" rel="noreferrer">
						Scott Hiett
					</a>{' '}
					decided to do something about the Hegarty situation. We started to reverse engineer the
					frontend app and eventually came up with a Tampermonkey userscript that would glitch the
					embedded YouTube player to say that we've watched the video at least 1x. Cruically, our
					teachers could see how many times we've watched the video, so being able to skip up to 20
					minutes of homework time was especially useful – and it was a lot of fun to build too.
				</p>

				<p>
					So we flexed it on our Snapchat stories and had our school friends message us to use it
					blah blah. We eventually figured out that we could also set it to be watched over 9999x
					times; every time we did that our accounts were reset by the Hegarty team.
				</p>

				<h2>The first email</h2>
				<p>
					After this, we got in contact with our Math teacher and got her to send an email to
					HegartyMaths informing them of our petty exploit and they got back to us very quickly. I
					don't have the original email anymore but I distinctly remember it saying something along
					the lines of "Stop trying to hack our platform and get back to doing your homework."
				</p>

				<p>
					This response excited us a bit, as they were now aware of us messing around with the site
					and they had no intention of fixing the minor vuln we had anyway, so we kept using it. We
					had tried to build a script to answer the questions for us, but it was too much work at
					the time (complex data structures, weird API responses, etc etc).
				</p>

				<h2>Educake</h2>
				<p>
					2018-19, our school gives us access to a new platform for science homework, Educake. It's
					good, and it doesn't have a video to watch at the beginning (woohoo)! But, it's still
					homework and I am still a software engineer. I accept my fate for around a year until 2019
					began to close just before the covid-19 update drops.
				</p>
				<p>
					One common factor between Hegarty and Educake is that they both give you straight away the
					correct answer if you got a question wrong, so I, now working on the project solo, took
					advantage of this and wrote a small js express app with mongodb and tampermonkey script to
					detect when I'm on a quiz page, and answer every question with a random number and then
					store the correct answer in mongo. I don't have the original source but it was{' '}
					<i>something</i> like the following.
				</p>

				<Highlighter>
					{stripIndent`
						const result = await post('/api/answer', {
							body: {
								answer: Math.random(),
							},
						});

						if (!result.success) {
							await post('http://localhost:8080/save', {
								body: {
									question_id: question.id,
									answer: result.correct_answer,
								},
							});
						}

						nextQuestion();
					`}
				</Highlighter>

				<p>
					As you can see, it was quite literally a loop through every question, saving the correct
					answer as we got it and moving on. Eventually I added a few more features to fetch from
					the database if we already had the right answer (meaning we don't answer{' '}
					<code>Math.random</code> every time) and also I added in support for multiple choice (so
					that we actually pick one of the possible answers rather than making it up – however I was
					surprised that the Educake backend would allow an answer that wasn't even in the possible
					choices).
				</p>

				<p>
					Once I'd had this down, I decided it would be time to build a nice UI for it all and
					bundle it all into a simple Tampermonkey script for both flexing rights on Snapchat
					(people constantly begging me to be able to use it was certainly ego fuel I hadn't
					experience before) and also for myself to get out of homework I didn't want to do.
				</p>
			</>
		);
	}
}
