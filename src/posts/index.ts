import {Post} from './Post';
import {ensure} from '../types';

import {Goals} from './2022/01/goals/goals';
import {ServerlessDiscordOAuth} from './2022/01/serverless-discord-oauth/serverless-discord-oauth';
import {Mochip} from './2022/01/mochip/mochip';

const ensurePosts = ensure<Post[]>();

export const posts = ensurePosts([new Mochip(), new ServerlessDiscordOAuth(), new Goals()]);
