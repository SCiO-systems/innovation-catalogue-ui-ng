const getAccessToken = async (csrfToken, code) => {

    const response = await fetch(`http://localHost:5000/api/login/accessToken`, {
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

    return response
}

const getUserData = async (csrfToken, accessToken) => {

    const response = await fetch(`http://localHost:5000/api/login/userData`, {
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

    return response
}

export {getAccessToken, getUserData}