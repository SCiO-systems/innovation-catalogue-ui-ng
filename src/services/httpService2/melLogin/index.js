import { http } from '../index';

class melService {

    getAccessToken = async (code) => {
        const result = await http.post(`/api/melLogin/accessToken`, {
            code: code
        })
        return result.data
    }

    getMelUserData = async (accessToken) => {
        const result = await http.post(`/api/melLogin/userData`, {
            accessToken: accessToken
        })
        return result.data
    }
}

export default new melService();