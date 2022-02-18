import {domainUrl} from '../../config'

const getCsrfToken = async () => {
    let fetchGetResponse = await fetch(`${domainUrl}/form`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        mode: 'cors'
    })
    let parsedResponse = await fetchGetResponse.json();
    return parsedResponse.csrfToken
}

export {getCsrfToken}