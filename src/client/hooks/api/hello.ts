import type api from '../../../pages/api/hello';
import {createAPIHook} from '../create';

export const useHello = createAPIHook<typeof api>('/api/hello');
