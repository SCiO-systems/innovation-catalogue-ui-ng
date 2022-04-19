import { http } from '../index';

class UserService {

    getUserData = async (id) => {
        const result = await http.post(`/api/user/getUserData`, {
            user_id: id,
        })
        return result.data
    }

    updateUserRole = async (id,role) => {
        const result = await http.post(`/api/user/update/role`, {
            user_id: id,
            role: role
        })
        return result.data
    }

    getAllUserInnovations = async (id) => {
        const result = await http.post(`/api/user/getInnovations`, {
            user_id: id,
        })
        return result.data
    }
}

export default new UserService();