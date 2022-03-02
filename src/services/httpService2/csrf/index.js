import { http } from '../index';

class CsrfService {

    getCsrfToken = async () => {
        const result = await http.get(`/form`)
        return result.data.csrfToken
    }
}

export default new CsrfService();