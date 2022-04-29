import { http } from '../index';

class AutocompleteService {

    autocompleteUsers = async (autocomplete) => {
        const result = await http.post(`/api/user/name/autocomplete`, {
            autocomplete: autocomplete,
        })
        return result.data
    }
}

export default new AutocompleteService();