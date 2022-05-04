const configurationArray = [
    {
        tabHeader: 'Readiness Fields',
        content: [
            {
                id: "8.1",
                type: 'list',
                mandatory: false,
                minWords: 1,
                maxWords: 1,
                label: 'Technology Development Stage',
                fieldInformation: '<span> Please add the stage the innovation has completed at the point of reporting. The terminology used nuances further the different stages of the innovation development process and journey used in One CGIAR. Note that it is not required that all innovations pass through all stages to be reported on, nor is it necessary for an innovation to start at stage 1. Please find below a scheme showing the equivalence with the 4 stages established in One CGIAR with the new terminology used here:<br/> <br/>' +
                    '<b>TRL 1</b> – Basic principles observed (stage 1)<br/> <br/>' +
                    '<b>TRL 2</b> – Technology concept formulated (stage 1)<br/> <br/>' +
                    '<b>TRL 3</b> – Experimental proof of concept (stage 1)<br/> <br/>' +
                    '<b>TRL 4</b> – Technology validated in lab (stage 2)<br/> <br/>' +
                    '<b>TRL 5</b> – Technology validated in relevant environment (stage 2)<br/> <br/>' +
                    '<b>TRL 6</b> – Technology demonstrated in relevant environment (stage 3)<br/> <br/>' +
                    '<b>TRL 7</b> – System prototype demonstration in operational environment (stage 3)<br/> <br/>' +
                    '<b>TRL 8</b> – System complete and qualified (stage 4)<br/> <br/>' +
                    '<b>TRL 9</b> – Actual system proven in operational environment (stage 4)<br/> <br/>' +
                    'For more information on stages 1,2,3,4 please see above footnote 1,2,3,4.</span>',
                valid: false,
                resultsKeyword: 'clarisa_technology_development_stage'
                // options: ["TRL 1  Basic principles observed","TRL 2  Technology concept formulated","TRL 3  Experimental proof of concept","TRL 4  Technology validated in lab","TRL 5  Technology validated in relevant environment (industrially relevant environment in the case of key enabling technologies)","TRL 6  Technology demonstrated in relevant environment (industrially relevant environment in the case of key enabling technologies)","TRL 7  System prototype demonstration in operational environment","TRL 8  System complete and qualified","TRL 9  Actual system proven in operational environment (competitive manufacturing in the case of key enabling technologies; or in space)"]
            },
            {
                id: "8.2",
                type: 'text area',
                mandatory: false,
                label: 'Technology Development Project Summary',
                fieldInformation: '<span> Please provide name of the specific project, description, and dates for the technological development of the innovation, which is a sub-component of the Intervention.<br/><br/>(500 words)</span>',
                valid: false,
            },
            {
                id: "8.3",
                type: 'list',
                mandatory: false,
                minWords: 1,
                maxWords: 1,
                label: 'Innovation Readiness Levels of the Components',
                fieldInformation: '<span> Please choose from the following readiness levels: <br/><br/>' +
                    '•  <b>Idea</b>: Formulated idea or hypothesis for an innovation to meet a specific objective for intended users.<br/><br/>' +
                    '•  <b>Hypothesis (proven)</b>: Validated hypothesis that the innovation can meet specific objectives using basic science evidence.<br/><br/>' +
                    '•  <b>Basic Model (unproven)</b>: Validated principles that the innovation can meet specific objectives using basic science evidence.<br/><br/>' +
                    '•  <b>Basic Model (proven)</b>: Researched capacity of the innovation to meet specific objectives using applied science evidence.<br/><br/>' +
                    '•  <b>Application Model (unproven)</b>: Validated capacity of the innovation to meet specific objectives using applied science evidence.<br/><br/>' +
                    '•  <b>Application Model (proven)</b>: Proven capacity of the innovation to meet specific objectives using applied science evidence.<br/><br/>' +
                    '•  <b>Application (unproven)</b>: Tested capacity of the innovation to meet specific objectives in a controlled environment.<br/><br/>' +
                    '•  <b>Application (proven)</b>: Tested capacity of the innovation to meet specific objectives in an uncontrolled environment with support from an intervention.<br/><br/>' +
                    '•  <b>Innovation (unproven)</b>: Tested capacity of the innovation to meet specific objectives in an uncontrolled environment with support from an intervention.<br/><br/>' +
                    '•  <b>Innovation (proven)</b>: Validated capacity of the innovation to meet specific objectives in an uncontrolled environment without support from an intervention.</span>',
                valid: false,
                resultsKeyword: 'clarisa_innovation_readiness_levels'
                // options: ["Idea","Hypothesis (proven)","Basic Model (unproven)","Basic Model (proven)","Application Model (unproven)","Application Model (proven)","Application (unproven)","Application (proven)","Innovation (unproven)", "Innovation (proven)"]
            },
            {
                id: "8.4",
                type: 'list',
                mandatory: false,
                minWords: 1,
                maxWords: 10,
                label: 'Innovation Use levels of the components',
                fieldInformation: '',
                valid: true,
                resultsKeyword: 'clarisa_innovation_use_levels',
                filter: true
            },
            {
                id: "8.5",
                type: 'number',
                mandatory: false,
                label: 'Scaling Readiness Level',
                fieldInformation: '',
                valid: false,
            },
            {
                id: "8.6",
                type: 'number',
                mandatory: false,
                label: 'Scaling Readiness Score',
                fieldInformation: '',
                valid: false,
            },
        ]
    },
]

export default configurationArray