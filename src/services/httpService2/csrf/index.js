import { http } from '../index';

class csrfService {

    getCsrfToken = async () => {
        const result = await http.get(`/form`)
        return result.data.csrfToken
    }
}

export default new csrfService();