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

    assignReviewers = async ( id,innovationId,reviewer_ids) => {
        const result = await http.post(`/api/admin/assignReviewers`, {
            user_id: id,
            innovation_id: innovationId,
            reviewer_ids: reviewer_ids
        })
        return result.data
    }

    getAllScalingReadinessExperts = async ( id) => {
        const result = await http.post(`/api/admin/getAllScalingReadinessExperts`, {
            user_id: id,
        })
        return result.data
    }

    assignSre = async ( id,innovationId,sre_id) => {
        const result = await http.post(`/api/admin/assignScalingReadinessExpert`, {
            user_id: id,
            innovation_id: innovationId,
            sre_id: sre_id
        })
        return result.data
    }

    getUsersWithPagination = async ( id,offset,limit, order) => {
        const result = await http.post(`/api/admin/users/dataPaginated`, {
            user_id: id,
            offset: offset,
            limit: limit,
            order: order,
        })
        return result.data
    }

}

export default new AdministratorService();