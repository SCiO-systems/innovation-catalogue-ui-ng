import { http } from '../index';

class ClarisaService {

    getClarisaResults = async () => {
        const result = await http.post(`/api/clarisaResults`)
        return result.data
    }
}

export default new ClarisaService();