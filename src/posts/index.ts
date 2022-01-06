import {Goals} from './2022/01/goals/goals';
import {ServerlessDiscordOAuth} from './2022/01/serverless-discord-oauth/serverless-discord-oauth';
import {Mochip} from './2022/01/mochip/mochip';
import {Post} from './Post';

export const posts: Post[] = [
	process.env.NODE_ENV === 'development' && new Mochip(),
	new ServerlessDiscordOAuth(),
	new Goals(),
].filter(post => typeof post !== 'boolean') as Post[];
