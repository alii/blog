import type {APIUser} from 'discord-api-types/v10';
import {verify} from 'jsonwebtoken';
import type {GetServerSideProps, PageConfig} from 'next';
import Link from 'next/link';
import {env} from '../../server/constants';

type Props = {
	readonly user: APIUser | undefined;
};

export const config: PageConfig = {
	unstable_runtimeJS: false,
};

export default function ServerlessDiscordOAuthDemoPage({user}: Props) {
	if (!user) {
		return (
			<div>
				<h1>you are not signed in!</h1>

				<Link className="text-blue-500 dark:text-blue-300" href="/api/oauth">
					Log in with Discord ↗
				</Link>
			</div>
		);
	}

	return (
		<div>
			<h1>
				hello, {user.username}#{user.discriminator}!
			</h1>

			<p>clear your cookies to logout!</p>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
	const {token = null} = ctx.req.cookies;

	if (!token) {
		return {
			props: {user: undefined},
		};
	}

	return {
		props: {
			user: verify(token, env.JWT_SECRET) as APIUser,
		},
	};
};
