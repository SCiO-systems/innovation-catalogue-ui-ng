const configurationArray = [
    {
        tabHeader: 'Stakeholders Fields',
        content: [
            {
                id: "9.1",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Users of the Innovation*',
                fieldInformation: 'The individuals or groups that ultimately use and benefit from (end-users) the innovation: acquisition and use of social, institutional, or technological innovations. The people that ultimately make use of results or technologies resulting from research. This can include policy-makers (for policy-related research results) as well as farmers (for technologies, varieties, etc). End users may be the same as intended beneficiaries or may be intermediaries in the results chain. Please select from the following and insert the relevant users separated by comma: Farmers (small-scale or commercial farmers), Community-based Organizations, Private Sector, Researchers, NARES/NARS, Extension Agents, Government, Traders, Foundations, Financial Institutions, Multilateral, Agro-manufacturers, Agro-dealers, Land users, Bilateral and Donor, Women, Youth. ',
                valid: false,
                resultsKeyword: 'clarisa_users'
                // options: ["Farmers (small-scale or commercial farmers)","Community-based Organizations","Private Sector","Researchers","NARES/NARS","Extension Agents","Government","Traders","Foundations","Financial Institutions","Multilateral","Agro-manufacturers","Agro-dealers","Land users","Bilateral And Donor","Women","Youth","Other"]
            },
            {
                id: "9.2",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Beneficiaries of the Innovation*',
                fieldInformation: 'The individuals or groups that are involved in the development of the innovation and benefit by any means from the innovation (next-users). The underlying logic here is that next-users are much easier to count/evidence, and that it would be very unusual to have uptake by end-users at scale without involvement of any next-users. Actors such as national research institutions, extension organizations, NGOs, and others, who access CGIAR products directly. Please insert from the following list, separated by commas: Farmers (small-scale or commercial farmers), Community-based Organizations, Private Sector, Researchers, NARES/NARS, Extension Agents, Government, Traders, Foundations, Financial Institutions, Multilateral, Agro-manufacturers, Agro-dealers, Land users, Bilateral and Donor, Women, Youth. ',
                valid: false,
                resultsKeyword: 'clarisa_beneficiaries'
                // options: ["Farmers (small-scale or commercial farmers)","Community-based Organizations","Private Sector","Researchers","NARES/NARS","Extension Agents","Government","Traders","Foundations","Financial Institutions","Multilateral","Agro-manufacturers","Agro-dealers","Land users","Bilateral And Donor","Women","Youth","Other"]
            },
            {
                id: "9.3",
                type: 'list',
                mandatory: false,
                minWords: 1,
                maxWords: 10,
                label: 'Sponsors of the Innovation',
                fieldInformation: 'Please list organizations separated by commas that provide funds, products, or services for the innovation.',
                valid: false,
                resultsKeyword: 'clarisa_beneficiaries'
            },
            {
                id: "9.4",
                type: 'autocomplete organizations',
                mandatory: true,
                label: 'Key Innovation Partners*',
                multiple: true,
                fieldInformation: '<span> List the key innovation partners, indicating the specific country scope, especially if the innovation is collaborating or being supported across countries <br/><br/>' +
                    'An innovation partners is a counterpart platform, organization, or individual that work toward mutual interests in delivering a new signification change or process.</span>',
                valid: true,
                filter: true
            },
            {
                id: "9.5",
                type: 'autocomplete organizations',
                mandatory: false,
                label: 'Key Scaling Partners',
                multiple: true,
                fieldInformation: '<span>List the key scaling partners, indicating the specific country scope, especially if the innovation is collaborating or being supported across countries<br/><br/>' +
                    'A scaling partner is an organizations or entities that the implementer (e.g., CGIAR) collaborates with to advance the uptake and use of innovations at scale.</span>',
                filter: true
            },
            {
                id: "9.6",
                type: 'autocomplete organizations',
                mandatory: true,
                label: 'Key Demand Partners*',
                multiple: true,
                fieldInformation: '<span> List the key demand partners, indicating the specific country scope, especially if the innovation is intervening in different countries<br/><br/>' +
                    'A demand partner is an organizations or entities that have (expressed) an explicit or implicit demand for an innovation, change or who aspire to a specific goal or impact to which the implementer (e.g., CGIAR) can contribute.</span>',
                valid: true,
                filter: true
            },
        ]
    },
]

export default configurationArray