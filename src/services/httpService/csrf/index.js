const relayUrl = process.env.REACT_APP_RELAY_URL

const getCsrfToken = async () => {

    let fetchGetResponse = await fetch(`${relayUrl}/rtb-refactored/form`, {
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