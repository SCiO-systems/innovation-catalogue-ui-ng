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
                resultsKeyword: 'CGIAR_impact_area'
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
                options: [{header: "SDG 1. End poverty in all its forms everywhere", source: "sdg1"},{header: "SDG 2. End hunger, achieve food security and improved nutrition and promote sustainable agriculture", source: "sdg2"},{header: "SDG 3. Ensure healthy lives and promote well-being for all at all ages", source: "sdg3"},{header: "SDG 4. Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all", source: "sdg4"},{header: "SDG 5. Achieve gender equality and empower all women and girls", source: "sdg5"},{header: "SDG 6. Ensure availability and sustainable management of water and sanitation for all", source: "sdg6"},{header: "SDG 7. Ensure access to affordable, reliable, sustainable and modern energy for all", source: "sdg7"},{header: "SDG 8. Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all", source: "sdg8"},{header: "SDG 9. Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation", source: "sdg9"},{header: "SDG 10. Reduce inequality within and among countries", source: "sdg10"},{header: "SDG 11. Make cities and human settlements inclusive, safe, resilient and sustainable", source: "sdg11"},{header: "SDG 12. Ensure sustainable consumption and production patterns", source: "sdg12"},{header: "SDG 13. Take urgent action to combat climate change and its impacts", source: "sdg13"},{header: "SDG 14. Conserve and sustainably use the oceans, seas and marine resources for sustainable development", source: "sdg14"},{header: "SDG 15. Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss", source: "sdg15"},{header: "SDG 16. Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels", source: "sdg16"},{header: "SDG 17. Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development", source: "sdg17"}]
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
                options: [{header: "Nutrition, health and food security", source: "impTarget1"},{header: "Poverty reduction, livelihoods and jobs", source: "impTarget2"},{header: "Gender equality, youth and social inclusion", source: "impTarget3"},{header: "Climate adaptation and mitigation", source: "impTarget4"},{header: "Environmental health and biodiversity", source: "impTarget5"}]
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
                resultsKeyword: 'Environmental_benefits'
            },
        ]
    },
]

export default configurationArray