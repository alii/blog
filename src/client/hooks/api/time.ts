import type api from '../../../pages/api/time';
import {endpoint} from '../create';

const time = endpoint<typeof api>();

export const useTime = time(() => '/api/time');
