import createAPI from 'nextkit';

export const api = createAPI({
	async onError(req, res, error) {
		return {
			status: 500,
			message: error.message,
		};
	},
});
