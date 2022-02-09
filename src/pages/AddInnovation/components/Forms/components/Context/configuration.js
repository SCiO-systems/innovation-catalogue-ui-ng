const configurationArray = [
    {
        tabHeader: 'Context Fields',
        content: [
            {
                id: "3.1",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Locations of Implementation',
                fieldInformation: '<span> List the countries, where the innovation has been applied.<br/> <br/>' +
                    'For example: Peru, Colombia, etc.<br/> <br/>' +
                    // '(800 words)' +
                    '</span>',
                valid: false,
                resultsKeyword: 'Countries',
                filter: true,
            },
            {
                id: "3.2",
                type: 'calendar',
                mandatory: false,
                label: 'State Date of Work',
                fieldInformation: 'Enter the date your team started working on this innovation.',
                valid: false,
            },
            {
                id: "3.3",
                type: 'calendar',
                mandatory: false,
                label: 'End Date of Work',
                fieldInformation: ' In case the innovation is or will be no longer active, enter an end date.',
                valid: false,
            },
            {
                id: "3.4",
                type: 'list',
                mandatory: false,
                minWords: 1,
                maxWords: 10,
                label: 'Locations of Applied Evidence',
                fieldInformation: 'Please insert countries where the innovation has been applied based on a diagnosis of a context and where supporting evidence can be provided. ',
                valid: false,
                resultsKeyword: 'Countries',
                filter: true,
            },
            {
                id: "3.5",
                type: 'list',
                mandatory: false,
                minWords: 1,
                maxWords: 10,
                label: 'Locations of Experimental Evidence',
                fieldInformation: 'Please insert countries where the innovation has been experimented/piloted and where supporting evidence can be provided.',
                valid: false,
                resultsKeyword: 'Countries',
                filter: true,
            },
            {
                id: "3.6",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Locations of Impact/Profit Evidence',
                fieldInformation: 'Please insert countries where the innovation has proven impact and where supporting evidence can be provided.',
                valid: false,
                resultsKeyword: 'Countries',
                filter: true,
            },
        ]
    },
]

export default configurationArray