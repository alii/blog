import {stripIndent} from 'common-tags';
import {Post} from '../../Post';

export class ServerlessDiscordOAuth extends Post {
	public name = 'Serverless Discord OAuth with Next.js';
	public slug = 'serverless-discord-oauth';
	public date = new Date('2 January 2022');
	public excerpt = "Implementing basic Discord OAuth on Vercel's serverless platform";

	public keywords = ['serverless', 'vercel', 'discord', 'oauth', 'node'];

	public render() {
		return (
			<>
				<h1>serverless discord oauth with Next.js</h1>
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
					Discord. Additionally, we'll be encoding our user info into a JWT token & using the cookie
					package to serialize and send cookies down to the client.
				</p>
				<pre>
					{stripIndent`
						yarn add axios cookie jsonwebtoken
						yarn add --dev discord-api-types @types/jsonwebtoken @types/cookie
					`}
				</pre>
				<h2>code</h2>
				<p>dope, you made it this far already! let's get some code written</p>
				<p>
					firstly, you're going to want to open up the folder <code>pages/api</code> and create a
					new file. we can call it <code>oauth.ts</code>. the api folder is where Next.js will
					locate our serverless functions. handily, i've written a library called{' '}
					<code>nextkit</code> that can assist us with this process but for the time being it's out
					of scope for this post – i'll eventually write a small migration guide.
				</p>
				<code>pages/api/oauth.ts</code>
				<span className="select-none">:</span>
				<pre>
					{stripIndent`
						import type {NextApiHandler} from 'next';
						import type {APIUser} from 'discord-api-types/v8';
						import {serialize} from 'cookie';

						async function exchangeCode(code: string) {
							// TODO: Exchange the code for a valid user token
						}

						function createJWT(user: APIUser) {
							// TODO: Sign a JWT token with the user info encoded
						}

						function getCookieHeader(token: string) {
							// TODO: Serialize and create a valid set-cookie header
						}

						const handler: NextApiHandler = async (req, res) => {
							const {code = null} = req.query as {code?: string};

							if (!code) {
								// TODO: Redirect the user since there was no code provided
							}

							const user = await exchangeCode(code);
							const token = createJWT(user);
							const cookie = getCookieHeader(token);

							res.setHeader('Set-Cookie', cookie);

							res.redirect('/');
						}

						export default handler;
					`}
				</pre>

				<p>
					cool! this is the barebones that we will need to start writing our oauth. we're still
					missing a few prerequesits to tell Discord who we ares: the client id and secret.
				</p>

				<p>
					these tokens can be obtained by visiting{' '}
					<a href="https://discord.com/developers/applications" target="_blank" rel="noreferrer">
						discord.com/developers/applications
					</a>{' '}
					and registering a new application.
				</p>
			</>
		);
	}
}
