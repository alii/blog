import {Post} from '../../Post';

export class ServerlessDiscordOAuth extends Post {
	public name = 'Serverless Discord OAuth';
	public slug = 'serverless-discord-oauth';
	public date = new Date('2 January 2022');
	public excerpt = "Implementing basic Discord OAuth on Vercel's serverless platform";

	public keywords = ['serverless', 'vercel', 'discord', 'oauth', 'node'];

	public render() {
		return (
			<>
				<h1>serverless discord oauth</h1>

				<p>
					oauth is arguably the number one way to authorize a user from a third party platform. it
					is a brilliant solution to a difficult problem, but it can be hard to implement,
					especially in a serverless environment. hopefully this post will help you get started
				</p>

				<h2>the setup</h2>
				<p>
					firstly, we're going to need to create a Next.js with TypeScript app. feel free to skip
					this if you "have one that you made earlier."
				</p>
				<pre>yarn create next-app my-app --typescript</pre>

				<h3>dependencies</h3>
				<p>
					we will be relying on a few dependencies, the first is <code>discord-api-types</code>{' '}
					which provides up-to-date type definitions for Discord's API (who could've guessed). we'll
					also need <code>axios</code> (or whatever your favourite http lib is) to make requests to
					Discord.
				</p>
				<pre>yarn add axios && yarn add discord-api-types --dev</pre>
			</>
		);
	}
}
