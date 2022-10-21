const configurationArray = [
    {
        tabHeader: 'Intellectual Property Fields',
        content: [
            {
                id: "5.1",
                type: 'text',
                mandatory: false,
                label: 'Type of Patent Number',
                fieldInformation: 'A patent is an exclusive right granted for an invention, which is a product or a process that provides, in general, a new way of doing something, or offers a new technical solution to a problem. To get a patent, technical information about the invention must be disclosed to the public in a patent application. It provides the patent owner with the right to decide how - or whether - the invention can be used by others. In exchange for this right, the patent owner makes technical information about the invention publicly available in the published patent document. Please inform whether the patent number is originated from a publication, a registration or application form. If other, please inform on other type of patent number.',
                valid: false,
            },
            {
                id: "5.2",
                type: 'text',
                mandatory: false,
                label: 'Patent Number',
                fieldInformation: 'Please insert the patent number from the relevant document cited above.',
                valid: false,
            },
            {
                id: "5.3",
                type: 'text',
                mandatory: false,
                label: 'Patent Office',
                fieldInformation: '<span> Patents are territorial rights. In general, the exclusive rights are only applicable in the country or region in which a patent has been filed and granted, in accordance with the law of that country or region. Please insert the office where the patent right was granted. <br/> <br/> (400 words) </span>',
                valid: false,
            },
            {
                id: "5.4",
                type: 'upload',
                mandatory: false,
                max: 1,
                files: true,
                url: true,
                label: 'Patent Know-How Information',
                fieldInformation: '<span>Please provide the patent know-how explanation on that provides, in general, a new way of doing something, or offers a new technical solution to a problem.<br/><br/>' +
                    'To note, the patent owner has the exclusive right to prevent or stop others from commercially exploiting the patented invention. In other words, patent protection means that the invention cannot be commercially made, used, distributed, imported or sold by others without the patent owner\'s consent. <br/><br/>' +
                    'Find out more: <a href="https://www.wipo.int/patents/en/">https://www.wipo.int/patents/en/</a><br/><br/>' +
                    '(400 words) </span>',
                valid: false,
            },
        ]
    },
]

export default configurationArray