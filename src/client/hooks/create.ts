import useSWR from 'swr';
import {NextkitException, InferAPIResponse} from 'nextkit';

export function createAPIHook<T>(url: `/api/${string}`) {
	return () => useSWR<InferAPIResponse<T, 'GET'>, NextkitException>(url);
}
