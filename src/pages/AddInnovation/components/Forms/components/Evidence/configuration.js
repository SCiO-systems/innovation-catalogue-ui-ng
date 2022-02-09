const configurationArray = [
    {
        tabHeader: 'Description Fields',
        content: [
            {
                id: "4.1",
                type: 'upload',
                mandatory: false,
                label: 'Reference Materials',
                fieldInformation: '<span> Provide URLs of any reference material(s) that describe the Innovation, its stage and/or current use. Reference materials should give a comprehensive overview of the Innovation and its impact potential when used at scale. Please provide a list of links to supporting material for the innovation, such as papers, reports, blogs, testimonies, media articles, images, infographics, videos, presentations, webinars, training materials, and so on.  <br/><br/>' +
                    'Evidence should be presented to validate the specific claims made about the innovation and where it sits from stage 1 to stage 4, as follows. <br/><br/>' +
                    '• Stages 1  and 2  require self-reported evidence. Wherever possible, links (preferably public, although limited access SharePoint-type links are allowed) to relevant project reports or publications should be provided. <br/><br/>' +
                    '• Stage 3  requires documentation (a public link such as a DOI for an article, a scan of a certification, a repository handle to a manual or link to a web tool) that demonstrates a degree of “completeness” and “readiness” of the innovation to be taken up. <br/><br/>' +
                    '• Stage 4  requires a link to an Outcome Impact Case Report (OICR) supported by appropriate evidence. When an OICR is provided, other links to evidence are not required for the innovation. Ensure that the OICR references the innovation.<br/><br/>' +
                    'For long reports, include the page number(s) in the citation field. List evidence from the most relevant and updated to the least. </span>',
                valid: false,
            },
            {
                id: "4.2",
                type: 'text',
                mandatory: false,
                label: '',
                fieldInformation: '',
                valid: false,
                placeholder: "Paste file URL"
            },
            {
                id: "4.3",
                type: 'text area',
                mandatory: false,
                label: 'Technology Appraisal',
                fieldInformation: '<span> Technology appraisal refers to a context specific assessment of strengths, weaknesses and gaps that are evaluated, and the costs, benefits, and alternatives of the innovation to receive further funding. This assessment should also be informed by the relevant sponsors and specific evidence. In other words, how well it is likely to work, how useful it is and whether it is an efficient solution that society should adopt as the traditional options of dominant technologies are challenged by new, more sustainable alternatives. <br/> <br/>' +
                    'Please type a description of the current technological appraisal.<br/> <br/> (500 characters) </span>',
                valid: false,
            },
            {
                id: "4.4",
                type: 'upload',
                mandatory: false,
                label: 'Technology Appraisal Image',
                fieldInformation: '<span> Please upload an image that supports the technological appraisal (status in terms of strengths, weaknesses in its use and functioning) of the innovation.<br/> <br/>' +
                    'Acceptable formats: GIF, PNG, and  JPG. All dimensions. Limited to 3 images.</span>',
                valid: false,
            },
            {
                id: "4.5",
                type: 'text',
                mandatory: false,
                label: 'Documentation available upon request to potential investors',
                fieldInformation: '<span> Documentation that shows the readiness for the innovation to receive current or further investment.<br/> <br/>' +
                    'In other words, documentation that demonstrates the value for money of the innovation. Please attach file when submitting the template and add citation of the file here.  </span>',
                valid: false,
            },
        ]
    },
]

export default configurationArray