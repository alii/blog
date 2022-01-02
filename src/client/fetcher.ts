import {APIResponse, NextkitException} from 'nextkit';

export async function fetcher<T>(url: string) {
	const request = await fetch(url);
	const body = (await request.json()) as APIResponse<T>;

	if (!body.success) {
		throw new NextkitException(request.status, body.message);
	}

	return body.data;
}
