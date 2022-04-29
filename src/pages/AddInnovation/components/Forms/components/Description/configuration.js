const configurationArray = [
    {
        tabHeader: 'Description Fields',
        content: [
            {
                id: "1.1",
                type: 'text',
                mandatory: true,
                label: 'Title',
                fieldInformation: '<span> Provide a title that shortly and clearly focuses on the innovation new knowledge or main findings. Make sure the geographical locations (country scope and/or agroecological zone) are mentioned, and acronyms spelt out. <br/> <br/> (20 words) </span>',
                valid: false,
            },
            {
                id: "1.2",
                type: 'text area',
                mandatory: true,
                label: 'Summary',
                fieldInformation: '<span> Provide a concise description of the innovation. Context is required to explain the innovation nature and the addressed beneficiary/process need <br/> <br/> (60-70 words)</span>',
                valid: false,
            },
            {
                id: "1.3",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Business Category',
                fieldInformation: '<span>Select the best high-level grouping business category. Definitions are:' + "<br/>"+ "<br/>" +
                    'a) <b>Design</b>: A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process' + "<br/>" + "<br/>"+
                    'b) <b>Device</b>: an object, machine, or piece of equipment that has been made for some special purpose' + "<br/>"+ "<br/>"+
                    'c) <b>Facility</b>: a place, building, or equipment used for a particular purpose or activity' + "<br/>"+ "<br/>" +
                    'd) <b>Material</b>: tangible and physical substances that are used to make a product, software, device, facility, design, etc. ' + "<br/>"+ "<br/>"+
                    'e) <b>Process</b>: a series of improved actions that can help you achieve a result' + "<br/>"+ "<br/>" +
                    'f) <b>System or software</b>: computer program designed to run a computer’s hardware and application programme.' + "<br/>"+ "<br/>" +
                    'Sources: various dictionaries.' + "<br/>"+ "<br/>" + '</span>',
                valid: false,
                resultsKeyword: 'clarisa_business_category'
            },
            {
                id: "1.4",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Administrative Scale',
                fieldInformation: 'Select the scope where the innovation is being deployed. ',
                valid: false,
                resultsKeyword: 'clarisa_administrative_scale'
            },
            {
                id: "1.5",
                type: 'keywords',
                mandatory: true,
                minCharacters: 1,
                maxCharacters: 5000,
                label: 'Keywords',
                fieldInformation: '<span> Provide words that are associated or describe the content, goal, and results of the innovation. It will allow to perform a well-defined search in the online portfolio. <br/> <br/>(5000 keywords) </span>',
                valid: false,
            },
            {
                id: "1.6",
                type: 'text',
                mandatory: true,
                label: 'Innovation URL',
                fieldInformation: 'Provide a link presenting related activities of the innovation and addressing open public view.',
                valid: false,
            },
            {
                id: "1.7",
                type: 'upload',
                mandatory: false,
                max: 2,
                label: 'Image of the Innovation',
                fieldInformation: '<span> Attach images that presents a general overview of the innovation deployment. <br/> <br/>' +
                    '(2 images maximum. Acceptable formats GIF,PNG, and JPG. One banner/cover image 1440 x 480Px and Thumbnail photo – 290 x 163 Px.) </span>',
                valid: false,
            },
            {
                id: "1.8",
                type: 'upload',
                mandatory: false,
                max: 2,
                label: 'Images of the Innovation Components',
                fieldInformation: '<span> Attach images that presents collaboration, ideation, implementation, or value creation of the innovation components.<br/> <br/>' +
                    '(2 images maximum. Acceptable formats GIF,PNG, and JPG. Thumbnail photos – 290 x 163 Px.) </span>',
                valid: false,
            },
            {
                id: "1.9",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Technical Field',
                fieldInformation: '<span> Select the best high-level grouping business category. Definitions are: <br/><br/>' +
                    '<b>Building & construction</b>: constructing, renovating, altering, demolishing, relocating, maintaining or repairing physical assets<br/><br/>' +
                    '<b>Energy</b>: exploration and production of supplying renewable and non-renewable energy <br/><br/>' +
                    '<b>Farming & forestry</b>: crop and animal production<br/><br/>' +
                    '<b>Pollution & waste</b>: management, reengineering of waste and pollution generated by manufacturing or industrial processes<br/><br/>' +
                    '<b>Product, materials & process</b>: design, production and turning of raw materials or parts into finished goods using tools, human labor, machinery, and chemical processing.<br/><br/>' +
                    '<b>Transportation</b>: establishment operated for the purpose of conveying persons or goods and services from one place to another<br/><br/>' +
                    '<b>Water</b>: industrial wastewater recycling, reclaimed water discharge, and well water used as plants cleaning, make-up water for power generation systems </span>',
                valid: false,
                resultsKeyword: 'clarisa_technical_field'
            },
            {
                id: "1.10",
                type: 'list',
                mandatory: false,
                minWords: 0,
                maxWords: 10,
                label: 'Type of Innovation (Initially Reported)',
                fieldInformation: '',
                valid: false,
                options: [],
                disabled: true
            },
            {
                id: "1.11",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Type of Innovation',
                fieldInformation: '<span> Select type (s) as defined in the Oslo Manual <a href="https://www.oecd.org/science/oslo-manual-2018-9789264304604-en.htm">(https://www.oecd.org/science/oslo-manual-2018-9789264304604-en.htm)</a> to measure and collect the innovation focus. These are: <br/><br/>' +
                    '<b>Product</b>: A good or service that is new or significantly improved. This includes significant improvements in technical specifications, components and materials, software in the product, user friendliness or other functional characteristics.<br/><br/>' +
                    '<b>Technology</b>: A new or significantly improved production or delivery method. This includes significant changes in techniques, equipment and/or software.<br/><br/>' +
                    '<b>Organizational</b> or <b>Institutional</b>: A new organizational method in business practices, workplace organization or external relations.<br/><br/>' +
                    'For other, please input the type. </span>',
                valid: false,
                resultsKeyword: 'clarisa_innovation_type'
            },
            {
                id: "1.12",
                type: 'list',
                mandatory: true,
                minWords: 1,
                maxWords: 10,
                label: 'Governance Type',
                fieldInformation: '<span>Select one of the governance types. Consider the following: <br/> <br/>' +
                    '<b>Private</b>: self-regulation, technology assessment, foresight, and science private advice only.<br/> <br/>' +
                    '<b>Public</b>:  regulation and soft law, public engagement, and science communication of the technical and design standards.<br/> <br/>' +
                    '<b>Shared PPP</b>: private and public sector governance in the research and development agenda setting with public accountability mechanisms</span>',
                valid: false,
                resultsKeyword: 'clarisa_governance_type'
            },
            {
                id: "1.13",
                type: 'list',
                mandatory: false,
                minWords: 1,
                maxWords: 10,
                label: 'Related Innovations',
                fieldInformation: 'Type the innovations that are closely related with your innovation ',
                valid: false,
                options: ["Innovation 1","Innovation 2","Innovation 3"]
            },
        ]
    },
]

export default configurationArray