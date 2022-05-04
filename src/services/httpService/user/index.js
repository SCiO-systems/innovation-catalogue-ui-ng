import { http } from '../index';

class UserService {

    getUserData = async (id) => {
        const result = await http.post(`/api/user/getUserData`, {
            user_id: id,
        })
        return result.data
    }

    getUserDataById = async (id) => {
        const result = await http.post(`/api/user/getUserDataById`, {
            user_id: id,
        })
        return result.data
    }

    editUser = async (id,role,website,organization_logo) => {
        const result = await http.post(`/api/user/edit`, {
            user_id: id,
            role: role,
            website,
            organization_logo
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