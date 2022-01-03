import {APIUser} from 'discord-api-types/v8';
import {verify} from 'jsonwebtoken';
import {GetServerSideProps, PageConfig} from 'next';
import {env} from '../../server/constants';

interface Props {
	user: APIUser | undefined;
}

export const config: PageConfig = {
	unstable_runtimeJS: false,
};

export default function ServerlessDiscordOAuthDemoPage({user}: Props) {
	if (!user) {
		return <h1>you are not signed in!</h1>;
	}

	return (
		<h1>
			hello, {user.username}#{user.discriminator}!
		</h1>
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
