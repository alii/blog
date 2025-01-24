import {Mochip} from './2022/01/mochip/mochip';
import {ServerlessDiscordOAuth} from './2022/01/serverless-discord-oauth/serverless-discord-oauth';
import {ZeroKbBlog} from './2022/01/zero-kb-blog/zero-kb-blog';
import {OpenSource} from './2022/03/open-source/open-source';
import {StrictTSConfig} from './2022/08/strict-tsconfig/strict-tsconfig';
import {WhichFruitsMayYouReap} from './2023/which-fruits-may-you-reap/which-fruits-may-you-reap';
import {WTFESM} from './2023/wtf-esm/wtf-esm';

export const posts = [
	new WhichFruitsMayYouReap(),
	new WTFESM(),
	new OpenSource(),
	new Mochip(),
	new ZeroKbBlog(),
	new ServerlessDiscordOAuth(),
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
