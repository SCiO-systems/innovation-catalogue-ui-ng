import {Actions} from './actions'

const initState = {
    currentPage: '',
    loggedIn: 'logged out',
    csrfToken: '',
    accessToken: '',
    melUserData: {},
    userData: {},
    step: 0,
    results: {},
    accordionData: {},
    descriptionValues: [],
    benefitImpactValues: [],
    contextValues: [],
    evidenceValues: [],
    intellectualPropertyValues: [],
    interventionsValues: [],
    investmentValues: [],
    readinessValues: [],
    stakeholdersValues: [],
    innovations: [],
    editingInnovation:'',
}

const reducer = (currentState = initState, action) => {
    switch (action.type) {
        case Actions.SetCurrentPage:
            return{
                ...currentState,
                currentPage: action.payload
            }
        case Actions.SetLoggedIn:
            return{
                ...currentState,
                loggedIn: action.payload
            }
        case Actions.SetCsrfToken:
            return{
                ...currentState,
                csrfToken: action.payload
            }
        case Actions.SetAccessToken:
            return{
                ...currentState,
                accessToken: action.payload
            }
        case Actions.SetMelUserData:
            return{
                ...currentState,
                melUserData: action.payload
            }
        case Actions.SetUserData:
            return{
                ...currentState,
                userData: action.payload
            }
        case Actions.SetStep:
            return{
                ...currentState,
                step: action.payload
            }
        case Actions.SetResults:
            return{
                ...currentState,
                results: action.payload
            }
        case Actions.SetAccordionData:
            return{
                ...currentState,
                accordionData: action.payload
            }
        case Actions.SetDescriptionValues:
            return{
                ...currentState,
                descriptionValues: action.payload
            }
        case Actions.SetBenefitImpactValues:
            return{
                ...currentState,
                benefitImpactValues: action.payload
            }
        case Actions.SetContextValues:
            return{
                ...currentState,
                contextValues: action.payload
            }
        case Actions.SetEvidenceValues:
            return{
                ...currentState,
                evidenceValues: action.payload
            }
        case Actions.SetIntellectualPropertyValues:
            return{
                ...currentState,
                intellectualPropertyValues: action.payload
            }
        case Actions.SetInterventionsValues:
            return{
                ...currentState,
                interventionsValues: action.payload
            }
        case Actions.SetInvestmentValues:
            return{
                ...currentState,
                investmentValues: action.payload
            }
        case Actions.SetReadinessValues:
            return{
                ...currentState,
                readinessValues: action.payload
            }
        case Actions.SetStakeholdersValues:
            return{
                ...currentState,
                stakeholdersValues: action.payload
            }
        case Actions.SetInnovations:
            return{
                ...currentState,
                innovations: action.payload
            }
        case Actions.SetEditingInnovation:
            return{
                ...currentState,
                editingInnovation: action.payload
            }
        default: return currentState
    }
}

export default reducer