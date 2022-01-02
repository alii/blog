import {stripIndent} from 'common-tags';
import {Highlighter} from '../../../client/components/highlighter';
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

						// Configuration constants
						// TODO: Add these to environment variables
						const CLIENT_ID = 'CLIENT_ID';
						const CLIENT_SECRET = 'CLIENT_SECRET';
						const JWT_SECRET = 'CHANGE ME!!!';
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
								grant_type: "authorization_code",
								code,
								scope,
							}).toString()

							const {data: auth} = await axios.post<{access_token: string, token_type: string}>('https://discord.com/api/oauth2/token', body, {
								headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							});

							const {data: user} = await axios.get<RESTGetAPIUserResult>('https://discord.com/api/users/@me', {
								headers: {Authorization: \`Bearer \${auth.access_token}\`},
							});

							return {user, auth};
						}

						/**	
						 * Signs a user object into a secure jwt
						 * @param user The user object to encode
						 */
						function createJWT(user: APIUser) {
							return sign(user, JWT_SECRET, {expiresIn: '24h'});
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
							const token = createJWT(user);

							// Serialize a cookie and set it
							const cookie = getCookieHeader(token);
							res.setHeader('Set-Cookie', cookie);

							// Redirect the user to wherever we want
							// in our application
							res.redirect('/');
						}

						export default handler;
					`}
				</Highlighter>

				<p>
					cool! this is the barebones that we will need to start writing our oauth. it's quite a lot
					to bite but if you break it down line by line and read the comments, it should be fairly
					self explanatory. we're still missing a few prerequesits to tell Discord who we ares: the
					client id and secret.
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
