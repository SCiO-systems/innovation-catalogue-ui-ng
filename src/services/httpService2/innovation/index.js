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

    submitInnovation = async (id, innovationId) => {
        const result = await http.post(`/api/innovation/submit`, {
            user_id: id,
            innovation_id: innovationId,
        })
        return result.data
    }

}

export default new InnovationService();