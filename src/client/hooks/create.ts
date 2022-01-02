import useSWR from 'swr';
import {NextkitException, InferAPIResponse} from 'nextkit';

export type URLGetter<Args extends string[]> = (...args: Args) => `/api/${string}`;

export function endpoint<T>() {
	return <Args extends string[]>(url: URLGetter<Args>) =>
		(...args: Args) =>
			useSWR<InferAPIResponse<T, 'GET'>, NextkitException>(url(...args));
}
