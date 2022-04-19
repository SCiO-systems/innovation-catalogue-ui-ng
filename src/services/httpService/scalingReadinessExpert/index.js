import { http } from '../index';

class ScalingReadinessExpertService {

    getAssignedInnovations = async (id) => {
        const result = await http.post(`/api/sre/getAssignedInnovations`, {
            user_id: id,
        })
        return result.data
    }
}

export default new ScalingReadinessExpertService();