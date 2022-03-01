const configurationArray = [
    {
        tabHeader: 'Benefit/Impact Fields',
        content: [
            {
                id: "2.1",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'CGIAR Action Areas',
                fieldInformation: '<span> Select relevant CGIAR Action Areas where the innovation is directly contributing.<br/> <br/>' +
                    'For more reference visit: <a href="https://www.cgiar.org/research/action-areas/">https://www.cgiar.org/research/action-areas/</a></span>',
                valid: false,
                resultsKeyword: 'clarisa_action_areas'
            },
            {
                id: "2.2",
                type: 'text area',
                mandatory: true,
                label: 'Value Added of the Innovation',
                fieldInformation: '<span> Please indicate what is the added value of the innovation in the market and/or context it is included in. In other words, what is the envisioned change the innovation will bring? Why is the innovation better than existing ones?<br/><br/> (200 words) </span>',
                valid: false,
            },
            {
                id: "2.3",
                type: 'text area',
                mandatory: true,
                label: 'Main Advantages',
                fieldInformation: '<span> Please provide the main advantages and pros (.e.g., user friendly) to the innovation.<br/><br/>(250 words)</span>',
                valid: false,
            },
            {
                id: "2.4",
                type: 'text area',
                mandatory: true,
                label: 'Main Disadvantages',
                fieldInformation: '<span> Please provide the main disadvantages and cons (e.g., time consuming) to the innovation.<br/><br/>(250 words)</span>',
                valid: false,
            },
            {
                id: "2.5",
                type: 'text area',
                mandatory: true,
                label: 'Description of the problem the innovation provides a solution',
                fieldInformation: '',
                valid: false,
            },
            {
                id: "2.6",
                type: 'accordion',
                mandatory: false,
                label: 'SDG Target Addressed',
                fieldInformation: '<span> Select relevant 2030 Sustainable Development Goals (SDGs) to which the innovation is directly contributing. <br/> <br/>' +
                    'For more reference visit:<br/><a href="https://sdgs.un.org/es/goals">https://sdgs.un.org/es/goals</a> <br/> <br/>' +
                    'For more reference on SDG targets, please visit: <br/>' +
                    '<a href="https://sdg.humanrights.dk/en/goals-and-targets">https://sdg.humanrights.dk/en/goals-and-targets</a><br/> <br/> </span> ',
                valid: false,
                resultsKeyword: 'clarisa_sdg_targets',
            },
            {
                id: "2.7",
                type: 'accordion',
                mandatory: false,
                label: 'CGIAR Impact Target',
                fieldInformation: '<span> Select relevant 2030 Global Collective Targets CGIAR Impact Areas where the innovation is directly contributing. <br/> <br/>' +
                    'For more reference visit: <br/> <br/>' +
                    '<a href="https://www.cgiar.org/how-we-work/strategy/">https://www.cgiar.org/how-we-work/strategy/</a><br/> <br/>' +
                    '<a href="https://www.cgiar.org/cgiar-portfolio">https://www.cgiar.org/cgiar-portfolio</a> </span>',
                valid: false,
                resultsKeyword: 'clarisa_impact_areas_indicators',
            },
            {
                id: "2.8",
                type: 'text area',
                mandatory: true,
                label: 'Initiative/Project Outcome Addressed',
                fieldInformation: '',
                valid: false,
            },
            {
                id: "2.9",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Environmental Benefits',
                fieldInformation: "<span>Select areas of environmental positive impact arising from the wide uptake of the innovation.<br/><br/>" +
                    "In case not listed, please insert the environmental benefit. </span>",
                valid: false,
                resultsKeyword: 'clarisa_environmental_benefits'
            },
        ]
    },
]

export default configurationArray