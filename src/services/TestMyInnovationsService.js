import axios from "axios";

export default class TestMyInnovationsService {

    getInnovations() {
        return axios.get('assets/demo/data/test-innovations.json').then(res => res.data.data);
    }

}
