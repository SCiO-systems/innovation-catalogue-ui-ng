import { http } from '../index';

class AutocompleteService {

    autocompleteUsers = async (autocomplete) => {
        const result = await http.post(`/api/user/name/autocomplete`, {
            autocomplete: autocomplete,
        })
        return result.data
    }

    autocompleteOrganizations = async (autocomplete) => {
        const result = await http.post(`/api/autocompleteOrganization`, {
            autocomplete: autocomplete,
        })
        return result.data
    }

    getAllPublishedInnovations = async () => {
        const result = await http.post(`/api/allPublishedInnovations`)
        return result.data
    }

}

export default new AutocompleteService();