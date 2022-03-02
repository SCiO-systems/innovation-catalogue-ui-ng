import { http } from '../index';

class AdministratorService {

    getAllUsers = async ( id) => {
        const result = await http.post(`/api/admin/getAllUsers`, {
            user_id: id,
        })
        return result.data
    }

    updateUserPermissions = async ( id,permissions,targetId) => {
        const result = await http.post(`/api/admin/update/permissions`, {
            user_id: id,
            permissions: permissions,
            target_id: targetId
        })
        return result.data
    }
}

export default new AdministratorService();