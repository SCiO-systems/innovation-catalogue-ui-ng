const domainUrl = process.env.REACT_APP_DOMAIN_URL

const getCsrfToken = async () => {

    let fetchGetResponse = await fetch(`${domainUrl}/rtb-refactored/form`, {
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