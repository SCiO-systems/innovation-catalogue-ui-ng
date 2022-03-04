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

    getAllInnovations = async ( id) => {
        const result = await http.post(`/api/admin/getInnovations`, {
            user_id: id,
        })
        return result.data
    }

    getAllReviewers = async ( id) => {
        const result = await http.post(`/api/admin/getReviewers`, {
            user_id: id,
        })
        return result.data
    }

    assignReviewer = async ( id,innovationId,reviewer_id) => {
        const result = await http.post(`/api/admin/assignReviewer`, {
            user_id: id,
            innovation_id: innovationId,
            reviewer_id: reviewer_id
        })
        return result.data
    }
}

export default new AdministratorService();