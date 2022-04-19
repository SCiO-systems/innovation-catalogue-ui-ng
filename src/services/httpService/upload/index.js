import { http } from '../index';

class UploadService {

    upload = async (data) => {
        const result = await http.post(`/api/upload`, data)
        return result.data
    }
}

export default new UploadService();