import axios from "axios";
const lookup = require('country-code-lookup')

export default class ResultsService {

    getResults() {
        return axios.get('assets/demo/data/RTB_Catalog_SearchResults.json').then(res => res.data);
    }

    async getInnovationByTitle(related_innovations){
        if(!related_innovations){
            return [];
        }
        const related = related_innovations.map(
                    (item) => {
                        if (item !== "") {
                            let config = {
                                method: 'post',
                                url: 'https://innovation.mel.cgiar.org:5001/innovation/documenttitle',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: {
                                    "id": item,
                                    "alias": "rtb_innovations"
                                }
                            };

                            return axios(config)
                                .then(function (response) {
                                    if (response.data.data) {

                                        const submitter_first_name = response.data.data.response.innovation_submitter.first_name;
                                        const submitter_last_name = response.data.data.response.innovation_submitter.last_name;
                                        const submitter_email = response.data.data.response.innovation_submitter.email;

                                        const submitter = {
                                            submitter_first_name: submitter_first_name,
                                            submitter_last_name: submitter_last_name,
                                            submitter_email: submitter_email
                                        }

                                        const innovation = {
                                            innovation_id: response.data.data.response.MEL_innovation_id,
                                            title: response.data.data.response.title,
                                            submitter: submitter,
                                            last_updated: response.data.data.response.end_date,
                                            summary: response.data.data.response.summary
                                        }
                                        return innovation;
                                    }
                                })
                        }
                    }
                );
        return Promise.resolve(related)
    }

    async getInnovation(innovation_id){

        let config = {
            method: 'post',
            url: 'https://innovation.mel.cgiar.org:5001/innovation/document',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "id": innovation_id,
                "alias": "rtb_innovations"
            }
        };

        return axios(config)
            .then(function (response) {

                console.log(response);

                const countriesWithIso2 = response.data.data.response.locations_of_implementation.map(
                    (item) => {
                        if (item === "Viet Nam") {
                            item = "Vietnam"
                        } else if (item.startsWith("Congo")) {
                            item = "Democratic Republic of the Congo"
                        } else if (item.startsWith("Bolivia")) {
                            item = "Bolivia"
                        } else if (item.startsWith("Iran")) {
                            item = "Iran"
                        } else if (item.startsWith("Lao")) {
                            item = "Laos"
                        } else if (item.startsWith("Moldova")) {
                            item = "Moldova"
                        } else if (item.startsWith("Netherlands")) {
                            item = "Netherlands"
                        } else if (item.startsWith("Netherlands")) {
                            item = "Netherlands"
                        } else if (item.startsWith("Sudan")) {
                            item = "Sudan"
                        } else if (item.startsWith("Syria")) {
                            item = "Syria"
                        }
                        const countryStructure = lookup.byCountry(item.replace('(the)', '').trim());

                        if (countryStructure) {
                            const obj = {
                                value: item.replace('(the)', ''),
                                code: countryStructure.iso2
                            };
                            return obj;
                        }
                    }
                )


                const countries2WithIso2 = response.data.data.response.locations_of_applied_evidence.map(
                    (item) => {

                        if (item === "Viet Nam") {
                            item = "Vietnam"
                        } else if (item.startsWith("Congo")) {
                            item = "Democratic Republic of the Congo"
                        } else if (item.startsWith("Bolivia")) {
                            item = "Bolivia"
                        } else if (item.startsWith("Iran")) {
                            item = "Iran"
                        } else if (item.startsWith("Lao")) {
                            item = "Laos"
                        } else if (item.startsWith("Moldova")) {
                            item = "Moldova"
                        } else if (item.startsWith("Netherlands")) {
                            item = "Netherlands"
                        } else if (item.startsWith("Netherlands")) {
                            item = "Netherlands"
                        } else if (item.startsWith("Sudan")) {
                            item = "Sudan"
                        } else if (item.startsWith("Syria")) {
                            item = "Syria"
                        }

                        const countryStructure = lookup.byCountry(item.replace('(the)', ''));
                        if (countryStructure) {
                            const obj = {
                                value: item.replace('(the)', ''),
                                code: countryStructure.iso2
                            };
                            return obj;
                        }
                    }
                )

                const countries3WithIso2 = response.data.data.response.locations_of_experimental_evidence.map(
                    (item) => {

                        if (item === "Viet Nam") {
                            item = "Vietnam"
                        } else if (item.startsWith("Congo")) {
                            item = "Democratic Republic of the Congo"
                        } else if (item.startsWith("Bolivia")) {
                            item = "Bolivia"
                        } else if (item.startsWith("Iran")) {
                            item = "Iran"
                        } else if (item.startsWith("Lao")) {
                            item = "Laos"
                        } else if (item.startsWith("Moldova")) {
                            item = "Moldova"
                        } else if (item.startsWith("Netherlands")) {
                            item = "Netherlands"
                        } else if (item.startsWith("Netherlands")) {
                            item = "Netherlands"
                        } else if (item.startsWith("Sudan")) {
                            item = "Sudan"
                        } else if (item.startsWith("Syria")) {
                            item = "Syria"
                        }

                        const countryStructure = lookup.byCountry(item.replace('(the)', ''));
                        if (countryStructure) {
                            const obj = {
                                value: item.replace('(the)', ''),
                                code: countryStructure.iso2
                            };
                            return obj;
                        }
                    }
                )

                const countries4WithIso2 = response.data.data.response.locations_of_impact.map(
                    (item) => {

                        if (item === "Viet Nam") {
                            item = "Vietnam"
                        } else if (item.startsWith("Congo")) {
                            item = "Democratic Republic of the Congo"
                        } else if (item.startsWith("Bolivia")) {
                            item = "Bolivia"
                        } else if (item.startsWith("Iran")) {
                            item = "Iran"
                        } else if (item.startsWith("Lao")) {
                            item = "Laos"
                        } else if (item.startsWith("Moldova")) {
                            item = "Moldova"
                        } else if (item.startsWith("Netherlands")) {
                            item = "Netherlands"
                        } else if (item.startsWith("Netherlands")) {
                            item = "Netherlands"
                        } else if (item.startsWith("Sudan")) {
                            item = "Sudan"
                        } else if (item.startsWith("Syria")) {
                            item = "Syria"
                        }

                        const countryStructure = lookup.byCountry(item.replace('(the)', ''));
                        if (countryStructure) {
                            const obj = {
                                value: item.replace('(the)', ''),
                                code: countryStructure.iso2
                            };
                            return obj;
                        }
                    }
                )

                if ((response.data.data.response.related_innovations.length === 1) &&
                    ((response.data.data.response.related_innovations[0] === 0) || (response.data.data.response.related_innovations[0] === ""))) {
                    response.data.data.response.related_innovations = null;
                }

                const restructuredCGIAR_impact_area = response.data.data.response.CGIAR_impact_target.map(
                    (item) => {
                        const code = item.charAt(0)
                        let impact_area = "";
                        if (code === "1") {
                            impact_area = "Nutrition, health and food security";
                        } else if (code === "2") {
                            impact_area = "Poverty reduction, livelihoods and jobs";
                        } else if (code === "3") {
                            impact_area = "Gender equality, youth and social inclusion";
                        } else if (code === "4") {
                            impact_area = "Climate adaptation and mitigation";
                        } else if (code === "5") {
                            impact_area = "Environmental health and biodiversity";
                        }

                        const obj = {
                            CGIAR_impact_area: impact_area,
                            value: item
                        }
                        return obj;
                    }
                )

                if (response.data.data.response.initiative_defined_outcome[0].includes(";")) {
                    const pieces = response.data.data.response.initative_defined_outcome[0].split(";")

                    let htmlify = pieces.map(
                        (item) => {
                            return "<p>" + item + "</p>"
                        }
                    )
                    response.data.data.response.initative_defined_outcome = htmlify.join(" ");
                }



                const linkedReferences = response.data.data.response.innovation_reference_materials.map(
                    (item) => {
                        const linkParts = item.split("##");
                        if (linkParts && linkParts.length == 2) {
                            return "<a target='_blank' href=" + linkParts[1] + ">" + linkParts[0] + "</a>"
                        }
                    }
                );

                const linkedDocumentation = response.data.data.response.documentation_to_potential_investors.map(
                    (item) => {
                        const linkParts = item.split("##");
                        if (linkParts && linkParts.length == 2) {
                            return "<a target='_blank' href=" + linkParts[1] + ">" + linkParts[0] + "</a>"
                        } else {
                            return "<span>" + linkParts[0] + "</span>"
                        }
                    }
                );

                const linkedObjective = response.data.data.response.objective_statement.split(";;").map(
                    (item) => {
                        return "<span>" + item + "</span>"
                    }
                );

                const linkedOutcome = response.data.data.response.initiative_defined_outcome.map(
                    (item)=>{
                        return "<p>" + item + "</p>"
                    });

                const linkedInterventionDescription = response.data.data.response.long_intervention_description.split(";;").map(
                    (item) => {
                        return "<span>" + item + "</span>"
                    }
                );

                const splittedSponsors = response.data.data.response.sponsors_of_the_innovation.split(";;").map(
                    (item) => {
                        return item
                    }
                );

                const sdgTarget = response.data.data.response.SDG_target.map(
                    (item) => {
                        const obj = {
                            SDG_name: item.sdg_short_name,
                            code: item.sdg_target_code,
                            value: item.sdg_target,
                        }

                        return obj;

                    }
                )

                const cleanImages = response.data.data.response.image_of_the_innovation_component.split(";;").map(
                    (item) => {

                        if (item.includes("http")) {

                            if(item.indexOf("_") === 0){
                                return  item.substring(item.indexOf("_") + 1);
                            }else{
                                return  item;
                            }
                        } else if ((item !== " ") && (item !== "")) {
                            return "img/" + item;
                        }
                    }
                )

                const cleanInnovation = response.data.data.response.key_innovation_partners.filter(x => {
                    return x !== ""
                })
                const cleanScaling = response.data.data.response.key_scaling_partners.filter(x => {
                    return x !== ""
                })
                const cleanDemand = response.data.data.response.key_demand_partners.filter(x => {
                    return x !== ""
                })
                const cleanReadiness = response.data.data.response.innovation_readiness_levels_of_the_components.filter(x => {
                    return x !== ""
                })

                response.data.data.response.key_innovation_partners = cleanInnovation;
                response.data.data.response.key_scaling_partners = cleanScaling;
                response.data.data.response.key_demand_partners = cleanDemand;
                response.data.data.response.innovation_readiness_levels_of_the_components = cleanReadiness;

                response.data.data.response.SDG_target = sdgTarget;

                response.data.data.response.innovation_reference_materials = linkedReferences;
                response.data.data.response.documentation_to_pottential_investors = linkedDocumentation;
                response.data.data.response.initiative_defined_outcome = linkedOutcome;
                response.data.data.response.objective_statement = linkedObjective;
                response.data.data.response.long_intervention_description = linkedInterventionDescription;
                response.data.data.response.sponsors_of_the_innovation = splittedSponsors;
                response.data.data.response.image_of_the_innovation_component = cleanImages.filter(x => {
                    return x !== undefined
                });

                response.data.data.response.CGIAR_impact_target = restructuredCGIAR_impact_area;

                response.data.data.response.locations_of_implementation = countriesWithIso2.filter((x) => {
                    return x !== undefined
                });
                response.data.data.response.locations_of_applied_evidence = countries2WithIso2.filter((x) => {
                    return x !== undefined
                });
                response.data.data.response.locations_of_experimental_evidence = countries3WithIso2.filter((x) => {
                    return x !== undefined
                });
                response.data.data.response.locations_of_impact = countries4WithIso2.filter((x) => {
                    return x !== undefined
                });

                return response.data;


            })
            .catch(function (error) {
                console.warn(error)
                return error;
            });
    }

    async getSearchResults(query,params){

        const filters = [];
        query.filters.forEach(
            (item)=>{
                const filtersAsKeyValues = item.value.map(
                    (itemValue)=>{
                        let filter = {};
                        let key = "";

                        if(item.filter === "action_areas"){
                            key = "cgiar_action_areas";
                        }else if(item.filter === "regions_of_implementation"){
                            key = "region";
                        }else if(item.filter === "environmental_benefits"){
                            key = "env_benefits";
                        }else if(item.filter === "type_of_innovation"){
                            key = "type_of_innovation";
                        }else if(item.filter === "business_category"){
                            key = "business_category";
                        }else if(item.filter === "technical_field"){
                            key = "technical_fields";
                        }else if(item.filter === "governance_type"){
                            key = "gov_type";
                        }else if(item.filter === "impact_areas"){
                            key = "impact_areas";
                        }else if(item.filter === "countries_of_implementation"){
                            key = "countries";
                        }else if(item.filter === "keywords"){
                            key = "keywords";
                        }else if(item.filter=== "sdg"){
                            key = "sdgs";
                        }else if(item.filter=== "submitter_company_name"){
                            key = "submitter_company_name";
                        }

                        if(itemValue === "nutrition"){
                            filter.value = "Nutrition, health and food security";
                        }else if(itemValue === "climate_adaptation"){
                            filter.value = "Climate adaptation and mitigation";
                        }else if(itemValue === "environmental_health"){
                            filter.value = "Environmental health and biodiversity";
                        }else if(itemValue === "poverty_reduction"){
                            filter.value = "Poverty reduction, livelihoods and jobs";
                        }else if(itemValue === "gender_equality"){
                            filter.value = "Gender equality, youth and social inclusion";
                        }else if(itemValue === "genetic-innovation"){
                            filter.value = "Genetic Innovation";
                        }else if(itemValue === "resilient-agrifood"){
                            filter.value = "Resilient Agrifood Systems";
                        }else if(itemValue === "system-transformation"){
                            filter.value = "Systems Transformation";
                        }else if(itemValue === "goal1"){
                            filter.value = "End poverty in all its forms everywhere";
                        }else if(itemValue === "goal2"){
                            filter.value = "End hunger, achieve food security and improved nutrition and promote sustainable agriculture";
                        }else if(itemValue === "goal3"){
                            filter.value = "Ensure healthy lives and promote well-being for all at all ages";
                        }else if(itemValue === "goal4"){
                            filter.value = "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all";
                        }else if(itemValue === "goal5"){
                            filter.value = "Achieve gender equality and empower all women and girls";
                        }else if(itemValue === "goal6"){
                            filter.value = "Ensure availability and sustainable management of water and sanitation for all";
                        }else if(itemValue === "goal7"){
                            filter.value = "Ensure access to affordable, reliable, sustainable and modern energy for all";
                        }else if(itemValue === "goal8"){
                            filter.value = "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all";
                        }else if(itemValue === "goal9"){
                            filter.value = "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation";
                        }else if(itemValue === "goal10"){
                            filter.value = "Reduce inequality within and among countries";
                        }else if(itemValue === "goal11"){
                            filter.value = "Make cities and human settlements inclusive, safe, resilient and sustainable";
                        }else if(itemValue === "goal12"){
                            filter.value = "Ensure sustainable consumption and production patterns";
                        }else if(itemValue === "goal13"){
                            filter.value = "Take urgent action to combat climate change and its impacts[b]";
                        }else if(itemValue === "goal14"){
                            filter.value = "Conserve and sustainably use the oceans, seas and marine resources for sustainable development";
                        }else if(itemValue === "goal15"){
                            filter.value = "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss";
                        }else if(itemValue === "goal16"){
                            filter.value = "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels";
                        }else if(itemValue === "goal17"){
                            filter.value = "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development";
                        }else{
                            filter.value = itemValue;
                        }
                        filter.key = key;
                        return filter;
                    }
                )
                filtersAsKeyValues.forEach(
                    (itemFilter) =>{
                        filters.push(itemFilter);
                    }
                )
            }
        )

        const cleanFilters = filters.map(
            (_filter)=>{
                if(_filter.key === "countries"){
                    if (_filter.value === "Vietnam") {
                        return {
                            key: "countries",
                            value: "Viet Nam"
                        }
                    }else if(_filter.value === "Democratic Republic of the Congo"){
                        return {
                            key: "countries",
                            value: "Congo (the Democratic Republic of the)"
                        }
                    }else if(_filter.value === "Bolivia"){
                        return {
                            key: "countries",
                            value: "Bolivia (Plurinational State of)"
                        }
                    }else if(_filter.value === "Iran"){
                        return {
                            key: "countries",
                            value: "Iran (Islamic Republic of)"
                        }
                    }else if(_filter.value === "Laos"){
                        return {
                            key: "countries",
                            value: "Lao People's Democratic Republic (the)"
                        }
                    }else if(_filter.value === "Moldova"){
                        return {
                            key: "countries",
                            value: "Moldova (the Republic of)"
                        }
                    }else if(_filter.value === "Netherlands"){
                        return {
                            key: "countries",
                            value: "Netherlands (the)"
                        }
                    }else if(_filter.value === "Sudan"){
                        return {
                            key: "countries",
                            value: "Sudan (the)"
                        }
                    }else if(_filter.value === "Syria"){
                        return {
                            key: "countries",
                            value: "Viet Nam"
                        }
                    }else{
                        return _filter;
                    }
                }else{
                    return _filter;
                }
            }
        )


        let sortDirection = "N/A";
        if(params.sort === 1){
            sortDirection = "asc"
        }else if(params.sort === -1){
            sortDirection = "desc"
        }

        let config = {
            method: 'post',
            url: 'https://innovation.mel.cgiar.org:5001/innovation/search',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "keyword": query.keywords.join(" "),
                "operation":{
                    "action": params.action,
                    "details":{
                        "from": params.first,
                        "size": params.rows,
                        "order":{
                            "field":params.field,
                            "sort":sortDirection
                        },
                        "filter":cleanFilters
                    }
                }
            }
        };

        return axios(config)
            .then(function (response) {
                if(response.data.data.total === 0){
                    return null;
                }

                let uiSummaries = {};
                response.data.data.summaries.forEach(
                    (item)=>{
                        let propertyName = Object.getOwnPropertyNames(item);
                        let uiPropertyName = "NA";
                        if(propertyName.toString() === "cgiar_action_areas"){
                            uiPropertyName = "CGIAR_Action_Areas";
                        }else if(propertyName.toString() === "region"){
                            uiPropertyName = "Regions";
                        }else if(propertyName.toString() === "env_benefits"){
                            uiPropertyName = "Environmental_benefits";
                        }else if(propertyName.toString() === "type_of_innovation"){
                            uiPropertyName = "Type_of_innovation";
                        }else if(propertyName.toString() === "business_category"){
                            uiPropertyName = "Business_category";
                        }else if(propertyName.toString() === "technical_fields"){
                            uiPropertyName = "Technical_field";
                        }else if(propertyName.toString() === "gov_type"){
                            uiPropertyName = "Gοvernance_type";
                        }else if(propertyName.toString() === "impact_areas"){
                            uiPropertyName = "CGIAR_impact_area";
                        }else if(propertyName.toString() === "countries"){
                            uiPropertyName = "Countries";
                        }else if(propertyName.toString() === "keywords"){
                            uiPropertyName = "keywords";
                        }else if(propertyName.toString() === "sdgs"){
                            uiPropertyName = "sdg";
                        }else if(propertyName.toString() === "submitter_company_name"){
                            uiPropertyName = "organization";
                        }
                        uiSummaries[uiPropertyName] = item[propertyName];
                    }
                )
                response.data.data.summaries = uiSummaries;
                const filteredRegion = response.data.data.summaries.Regions.filter((x)=>{return (x.value!==undefined)&&(x.value!==null)&&(x.value!=="")})
                response.data.data.summaries.Regions = filteredRegion;

                const regionsAnalytics = response.data.data.summaries.Regions.map(
                    (region)=>{
                        let id = region.value.replace(/\s/g, '');
                        const obj = {
                            name:region.value,
                            value:region.freq,
                            id:id.charAt(0).toLowerCase() + id.slice(1)
                        };
                        return obj;
                    }
                )

                response.data.data.summaries.regionsAnalytics =
                    regionsAnalytics;

                const countriesWithIso = response.data.data.summaries.Countries.map(
                    (country)=>{
                        if(country.value === "Viet Nam"){
                            country.value = "Vietnam"
                        }else if(country.value.startsWith("Congo")){
                            country.value = "Democratic Republic of the Congo"
                        }else if(country.value.startsWith("Bolivia")){
                            country.value = "Bolivia"
                        }else if(country.value.startsWith("Iran")){
                            country.value = "Iran"
                        }else if(country.value.startsWith("Lao")){
                            country.value = "Laos"
                        }else if(country.value.startsWith("Moldova")){
                            country.value = "Moldova"
                        }else if(country.value.startsWith("Netherlands")){
                            country.value = "Netherlands"
                        }else if(country.value.startsWith("Netherlands")){
                            country.value = "Netherlands"
                        }else if(country.value.startsWith("Sudan")){
                            country.value = "Sudan"
                        }else if(country.value.startsWith("Syria")){
                             country.value = "Syria"
                        }


                        const countryStructure = lookup.byCountry(country.value.replace('(the)','').trim());

                        if(countryStructure){
                            const obj = {
                                freq:country.freq,
                                value:country.value.replace('(the)',''),
                                code:countryStructure.iso2
                            };
                            return obj;
                        }
                    }
                )

                response.data.data.summaries.Countries = countriesWithIso.filter((x)=>{return (x!==undefined)&&(x!==null)});
                return response.data;
            })
            .catch(function (error) {
                console.warn(error)
                return error;
            });
    }

    getSteps() {
        return axios.get('assets/demo/data/steps.json').then(res => res.data.data);
    }

}
