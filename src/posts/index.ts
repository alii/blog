import {Goals} from './2022/01/goals/goals';
import {Mochip} from './2022/01/mochip/mochip';
import {ServerlessDiscordOAuth} from './2022/01/serverless-discord-oauth/serverless-discord-oauth';
import {ZeroKbBlog} from './2022/01/zero-kb-blog/zero-kb-blog';
import {OpenSource} from './2022/03/open-source/open-source';
import {ServerlessOAuthPart2} from './2022/05/serverless-oauth-pt2/serverless-oauth-pt2';
import {StrictTSConfig} from './2022/08/strict-tsconfig/strict-tsconfig';
import {WhichFruitsMayYouReap} from './2023/which-fruits-may-you-reap/which-fruits-may-you-reap';
import {WTFESM} from './2023/wtf-esm/wtf-esm';

export const posts = [
	new WhichFruitsMayYouReap(),
	new WTFESM(),
	new ServerlessOAuthPart2(),
	new OpenSource(),
	new Mochip(),
	new ZeroKbBlog(),
	new ServerlessDiscordOAuth(),
	new Goals(),
	new StrictTSConfig(),
] as const;

export function sortPosts(p: typeof posts) {
	return [...p].sort((a, b) => {
		if (a.date > b.date) {
			return -1;
		}

		if (a.date < b.date) {
			return 1;
		}

		return 0;
	});
}
