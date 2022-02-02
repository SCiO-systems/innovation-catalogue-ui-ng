import {Actions} from './actions'

const page = window.location.hash.split('/')[1];

const initState = {
    currentPage: '',
    loggedIn: 'logged out',
    csrfToken: '',
    accessToken: '',
    userData: {name: '',email: ''},
    step: 0,
    descriptionValues: [],
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
        case Actions.SetDescriptionValues:
            return{
                ...currentState,
                descriptionValues: action.payload
            }
        default: return currentState
    }
}

export default reducer