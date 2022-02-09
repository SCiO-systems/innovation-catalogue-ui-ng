const configurationArray = [
    {
        tabHeader: 'Description Fields',
        content: [
            {
                id: "6.1",
                type: 'inputs',
                mandatory: false,
                label: 'Intervention Acronym - Intervention Name',
                fieldInformation: '<span> Provide the acronym, short name, and long name of the intervention, if available. Describe in the intervention description if related to the one the innovation was introduced, piloted, validated and/or scaled in the next context.<br/> <br/>' +
                    'The name should include the beneficiaries, the approach applied, and the time of intervention.<br/> <br/> (100 words) </span>',
                valid: false,
                double: true
            },
            {
                id: "6.2",
                type: 'number',
                mandatory: false,
                label: 'Total Budget of Interventions',
                fieldInformation: 'Insert the total budget during the full intervention application in USD. In case the intervention was working on multiple innovation estimate the proportion related to the one you are recording.',
                valid: false,
            },
            {
                id: "6.3",
                type: 'inputs',
                mandatory: false,
                label: 'Intervention Team Members',
                fieldInformation: '<span> List the core members and their affiliations that participate in the intervention and related to the specific innovation you are documenting. Describe in the intervention description if related to the one the innovation was introduced, piloted, validated and/or scaled in the next context.<br/><br/> (300 words) </span>',
                valid: false,
            },
            {
                id: "6.4",
                type: 'text area',
                mandatory: false,
                label: 'Challenge Statement',
                fieldInformation: '<span> Type the set out the issue or challenge which needs to be addressed by the intervention the innovation was developed. An intervention may have bigger challenges compared to the ones addressed by the single innovation.<br/><br/> (350 words) </span>',
                valid: false,
            },
            {
                id: "6.5",
                type: 'text area',
                mandatory: false,
                label: 'Objective Statement',
                fieldInformation: '<span> Type a concise, position-centred statement describing the value the intervention adds and the needs it can fulfil. An intervention may have greater objectives compared to the ones addressed by the single innovation.<br/><br/>(250 words)</span>',
                valid: false,
            },
            {
                id: "6.6",
                type: 'text area',
                mandatory: false,
                label: 'Intervention Description',
                fieldInformation: '<span> Type briefly the intervention outcome sought and additional key information. Describe if related to the one the innovation was introduced, piloted, validated and/or scaled in the next context.<br/><br/>(300 words)</span>',
                valid: false,
            },
        ]
    },
]

export default configurationArray