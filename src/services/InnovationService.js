import axios from "axios";

export default class InnovationService {

    getInnovation() {
        return axios.get('assets/demo/data/RTB_Catalog_Innovation_Metadata.json').then(res => res.data.metadata);
    }

}
