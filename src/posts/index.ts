import {ensure} from '../types';
import {Post} from './Post';

import {Goals} from './2022/01/goals';

const ensurePosts = ensure<Post[]>();

export const posts = ensurePosts([new Goals()]);
