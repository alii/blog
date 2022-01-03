import {stripIndent} from 'common-tags';
import Link from 'next/link';
import {Highlighter} from '../../../../client/components/highlighter';
import {Post} from '../../../Post';
import discordOAuthDashboardImage from './discord-oauth-dashboard.png';

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
				<p>
					live demo: <Link href="/api/oauth">/api/oauth</Link>
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
					Discord. additionally, we'll be encoding our user info into a JWT token & using the cookie
					package to serialize and send cookies down to the client. finally we'll use{' '}
					<code>dayjs</code> for basic date manipulation and <code>urlcat</code> to easily build
					urls with query params.
				</p>
				<pre>
					{stripIndent`
						yarn add axios cookie urlcat dayjs jsonwebtoken
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
				<p>
					<code>pages/api/oauth.ts</code>
					<span className="select-none">:</span>
				</p>
				<Highlighter>
					{stripIndent`
						import type {NextApiHandler} from 'next';
						import type {RESTGetAPIUserResult} from 'discord-api-types/v8';
						import {serialize} from 'cookie';
						import {sign} from 'jsonwebtoken';
						import dayjs from 'dayjs';
						import urlcat from 'urlcat';
						import axios from 'axios';

						// Configuration constants
						// TODO: Add these to environment variables
						const CLIENT_ID = 'CLIENT_ID';
						const CLIENT_SECRET = 'CLIENT_SECRET';
						const JWT_SECRET = 'CHANGE ME!!!';

						// The URL that we will redirect to
						// note: this should be an environment variable
						// but I'll cover that in part 2 since
						// it will work fine locally for the time being
						const REDIRECT_URI = 'http://localhost:3000/api/oauth';

						// Scopes we want to be able to access as a user
						const scope = ['identify'].join(' ');

						// URL to redirect to outbound (to request authorization)
						const OAUTH_URL = urlcat('https://discord.com/api/oauth2/authorize', {
							client_id: CLIENT_ID,
							redirect_uri: REDIRECT_URI,
							response_type: 'code',
							scope,
						});

						/**
						 * Exchanges an OAuth code for a full user object
						 * @param code The code from the callback querystring
						 */
						async function exchangeCode(code: string) {
							const body = new URLSearchParams({
								client_id: CLIENT_ID,
								client_secret: CLIENT_SECRET,
								redirect_uri: REDIRECT_URI,
								grant_type: 'authorization_code',
								code,
								scope,
							}).toString();

							const {data: auth} = await axios.post<{access_token: string; token_type: string}>(
								'https://discord.com/api/oauth2/token',
								body,
								{headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
							);

							const {data: user} = await axios.get<RESTGetAPIUserResult>(
								'https://discord.com/api/users/@me',
								{headers: {Authorization: \`Bearer \${auth.access_token}\`}},
							);

							return {user, auth};
						}

						/**
						 * Generates the set-cookie header value from a given JWT token
						 */
						function getCookieHeader(token: string) {
							return serialize('token', token, {
								httpOnly: true,
								path: '/',
								secure: process.env.NODE_ENV !== 'development',
								expires: dayjs().add(1, 'day').toDate(),
								sameSite: 'lax',
							});
						}

						const handler: NextApiHandler = async (req, res) => {
							// Find our callback code from req.query
							const {code = null} = req.query as {code?: string};

							// If it doesn't exist, we need to redirect the user
							// so that we can get the code
							if (typeof code !== 'string') {
								res.redirect(OAUTH_URL);
								return;
							}

							// Exchange the code for a valid user object
							const {user} = await exchangeCode(code);

							// Sign a JWT token with the user's details
							// encoded into it
							const token = sign(user, JWT_SECRET, {expiresIn: '24h'});

							// Serialize a cookie and set it
							const cookie = getCookieHeader(token);
							res.setHeader('Set-Cookie', cookie);

							// Redirect the user to wherever we want
							// in our application
							res.redirect('/');
						};

						export default handler;
					`}
				</Highlighter>
				<p>
					cool! this is the barebones that we will need to start writing our oauth. it's quite a lot
					to bite but if you break it down line by line and read the comments, it should be fairly
					self explanatory. we're still missing a few prerequesits to tell Discord who we ares: the
					client id and secret.
				</p>

				<h3>Obtaining keys</h3>
				<p>
					our tokens can be obtained by visiting{' '}
					<a href="https://discord.com/developers/applications" target="_blank" rel="noreferrer">
						discord.com/developers/applications
					</a>{' '}
					and registering a new application.
				</p>
				<img
					src={discordOAuthDashboardImage.src}
					alt="Screenshot of Discord's Developer OAuth page"
				/>
				<ol>
					<li>
						Copy and paste your client ID into your <code>oauth.ts</code> file
					</li>
					<li>
						Copy and paste your client secret into your <code>oauth.ts</code> file
					</li>
					<li>
						Add your redirect URI (<code>http://localhost:3000/api/oauth</code>) on the dashboard
					</li>
					<li>
						make sure all your changes are saved and then we are ready to test it out for the first
						time!
					</li>
				</ol>

				<h2>testing it</h2>
				<p>
					awesome, we've got everything setup correctly. now we can give it a quick spin. if you
					start your Next.js development server if you haven't already by running{' '}
					<code>yarn dev</code> in your terminal, you should be able to navigate to{' '}
					<a target="_blank" href="http://localhost:3000/api/oauth" rel="noreferrer">
						localhost:3000/api/oauth
					</a>{' '}
					and successfully authenticate
				</p>

				<p>
					afterwards, if you open up your browser's devtools and check for the cookie section, you
					should see a cookie by the name of <code>token</code> – this is ours! copy the value and
					paste it into{' '}
					<a href="https://jwt.io" target="_blank" rel="noreferrer">
						jwt.io
					</a>{' '}
					to decode it and see your details encoded inside it!
				</p>

				<h3>why jwt?</h3>
				<p>
					we've picked jwt because it lets us store information on the client side where only the
					server can mutate and verify that the server created it. this means users cant modify the
					data inside a jwt token allowing the server to make guarantees about the data encoded.
				</p>

				<h2>environment variables</h2>
				<p>okay, we're almost there. final stretch</p>
				<p>
					right now, we have our constants defined in this file which is fine for prototyping but it
					now means that if you want to push your code to github for example, your client secret and
					perhaps other private information will be publicly available on your project's repository!
					the solution? environment varibles.
				</p>
				<p>
					environment variables are bits of information that are provided to a process at runtime
					and it means we don't have to store secrets inside of our source code.
				</p>
				<p>
					thankfully, Next.js makes it super easy for us to use environment variables with something
					called an env file.
				</p>

				<h3>creating our env file</h3>
				<p>
					firstly, make a new file in your project's file structure called <code>.env</code> and add
					the content below. the format for env files is <code>KEY=value</code>
				</p>
				<pre>
					{stripIndent`
						CLIENT_ID=<our discord client id>
						CLIENT_SECRET=<our discord client secret>
						JWT_SECRET=<a secure, randomly generated string>
					`}
				</pre>
				<p>
					and finally, we need to update our code to make sure that our <code>api/oauth.ts</code>{' '}
					file can use the newly generated environment variables
				</p>
				<Highlighter>
					{stripIndent`
						const CLIENT_ID = process.env.CLIENT_ID;
						const CLIENT_SECRET = process.env.CLIENT_SECRET;
						const JWT_SECRET = process.env.JWT_SECRET;
					`}
				</Highlighter>

				<p>
					and that should be all good! i'll be writing a part two and three later on that will cover
					accessing the jwt from the server and also deployment to vercel.
				</p>

				<p>thanks for reading!</p>
			</>
		);
	}
}
