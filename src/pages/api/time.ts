import {api} from '../../server/api';

export default api({
	async GET() {
		return Date.now();
	},
});
