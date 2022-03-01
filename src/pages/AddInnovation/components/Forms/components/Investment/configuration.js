const configurationArray = [
    {
        tabHeader: 'Investment Fields',
        content: [
            {
                id: "7.1",
                type: 'text area',
                mandatory: false,
                label: 'Technology Development Project Summary',
                fieldInformation: 'Please select whether the innovation includes an investment sought (YES) or does not include one (NO). ',
                valid: false,
            },
            {
                id: "7.2",
                type: 'list',
                mandatory: false,
                minWords: 1,
                maxWords: 10,
                label: 'Type of Investment Sought',
                fieldInformation: '<span> Please select the type of investment sought from the following: <br/><br/>' +
                    '<b>Bonds</b>: fixed income instrument that represents a loan made by an investor to a borrower (corporate or government) <br/><br/>' +
                    '<b>Grant</b>: A grant is an amount given by one entity (typically a company, foundation, or government) to an individual or a company to facilitate a goal or incentivize performance can include education loan or research money or other.<br/><br/>' +
                    '<b>Private Equity</b>: Private equity is an alternative form of private financing, away from public markets, in which funds and investors directly invest in companies or engage in buyouts of such companies.<br/><br/>' +
                    '<b>Venture Capital</b>: Venture capital (VC) is a form of private equity and a type of financing that investors provide to startup companies and small businesses that have the potential to grow on a long-term basis. <br/><br/>' +
                    'If <b>other</b>, please specify. </span>',
                valid: false,
                resultsKeyword: 'clarisa_investment_type'
                // options: ["Bonds","Grant", "Guarantee", "Private Equity", "Venture Capital", "Other" ]
            },
            {
                id: "7.3",
                type: 'number',
                mandatory: false,
                label: 'Estimated Amount Sought in USD',
                fieldInformation: 'Please insert the estimated amount of investment sought in the innovation in USD. ',
                valid: false,
            },
        ]
    },
]

export default configurationArray