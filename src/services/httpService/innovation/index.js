import { http } from '../index';

class InnovationService {

    insertInnovation = async (id, form_data,status) => {
        const result = await http.post(`/api/innovation/insert`, {
            user_id: id,
            form_data: JSON.stringify(form_data),
            status:status
        })
        return result.data
    }

    editInnovation = async (form_data, innovationId,status,id) => {
        const result = await http.post(`/api/innovation/edit`, {
            form_data: JSON.stringify(form_data),
            innovation_id: innovationId,
            status: status,
            user_id: id
        })
        return result.data
    }

    deleteInnovation = async (id, innovationId) => {
        const result = await http.post(`/api/innovation/delete`, {
            user_id: id,
            innovation_id: innovationId,
        })
        return result.data
    }

    deleteRejectedInnovation = async (id, innovationId, created_at) => {
        const result = await http.post(`/api/innovation/deleteRejected`, {
            user_id: id,
            innovation_id: innovationId,
            created_at: created_at
        })
        return result.data
    }

    submitInnovation = async (id, innovationId) => {
        const result = await http.post(`/api/innovation/submit`, {
            user_id: id,
            innovation_id: innovationId,
        })
        return result.data
    }

    approveInnovation = async (id, innovationId) => {
        const result = await http.post(`/api/innovation/approve`, {
            user_id: id,
            innovation_id: innovationId,
        })
        return result.data
    }

    publishInnovation = async (id, innovationId) => {
        const result = await http.post(`/api/innovation/publish`, {
            user_id: id,
            innovation_id: innovationId,
        })
        return result.data
    }

    rejectInnovation = async (id, innovationId) => {
        const result = await http.post(`/api/innovation/reject`, {
            user_id: id,
            innovation_id: innovationId,
        })
        return result.data
    }

    requestRevision = async (id, innovationId,comments) => {
        const result = await http.post(`/api/innovation/revision`, {
            user_id: id,
            innovation_id: innovationId,
            comments: comments
        })
        return result.data
    }

    addComment = async (id, innovationId,comments) => {
        const result = await http.post(`/api/innovation/addComment`, {
            user_id: id,
            innovation_id: innovationId,
            comments: comments
        })
        return result.data
    }

    updateVersionInnovation = async (id, innovationId,status,formData,version) => {
        const result = await http.post(`/api/innovation/updateVersion`, {
            user_id: id,
            innovation_id: innovationId,
            status: status,
            form_data: JSON.stringify(formData),
            version: version
        })
        return result.data
    }
}

export default new InnovationService();