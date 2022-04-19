import { http } from '../index';

class ReviewerService {

    getAssignedInnovations = async (id) => {
        const result = await http.post(`/api/reviewer/getAssignedInnovations`, {
            user_id: id,
        })
        return result.data
    }
}

export default new ReviewerService();