const domainUrl = process.env.REACT_APP_DOMAIN_URL

const getAccessToken = async (csrfToken, code) => {

    return await fetch(`${domainUrl}/api/melLogin/accessToken`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            code: code
        },
        credentials: "include",
        mode: "cors"
    })
}

const getMelUserData = async (csrfToken, accessToken) => {

    return await fetch(`${domainUrl}/api/melLogin/userData`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            accessToken: accessToken
        },
        credentials: "include",
        mode: "cors"
    })
}

export {getAccessToken, getMelUserData}