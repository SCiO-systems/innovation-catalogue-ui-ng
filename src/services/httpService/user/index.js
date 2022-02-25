const relayUrl = process.env.REACT_APP_RELAY_URL

const getUserData = async (csrfToken, id) => {

    const body = {
        user_id: id,
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/user/getUserData`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
        },
        body: JSON.stringify(body),
        credentials: "include",
        mode: "cors"
    })
}

const updateUserRole = async (csrfToken, id,role) => {

    const body = {
        user_id: id,
        role: role
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/user/update/role`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
        },
        body: JSON.stringify(body),
        credentials: "include",
        mode: "cors"
    })
}

const getAllUserInnovations = async (csrfToken, id) => {

    const body = {
        user_id: id,
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/user/getInnovations`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
        },
        body: JSON.stringify(body),
        credentials: "include",
        mode: "cors"
    })
}

const getAssignedReviews = async (csrfToken, id) => {

    const body = {
        user_id: id,
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/user/getAssignedReviews`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
        },
        body: JSON.stringify(body),
        credentials: "include",
        mode: "cors"
    })
}

export {getUserData,updateUserRole,getAllUserInnovations}