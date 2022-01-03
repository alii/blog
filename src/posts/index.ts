import {ensure} from '../types';
import {Post} from './Post';

import {Goals} from './2022/01/goals/goals';
import {ServerlessDiscordOAuth} from './2022/01/serverless-discord-oauth/serverless-discord-oauth';

const ensurePosts = ensure<Post[]>();

export const posts = ensurePosts([new ServerlessDiscordOAuth(), new Goals()]);
