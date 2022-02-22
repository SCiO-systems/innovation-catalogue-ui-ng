const domainUrl = process.env.REACT_APP_DOMAIN_URL

const getUserData = async (csrfToken, id) => {

    return await fetch(`${domainUrl}/rtb-refactored/api/user/getUserData`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id
        },
        credentials: "include",
        mode: "cors"
    })
}

const updateUserRole = async (csrfToken, id,role) => {

    return await fetch(`${domainUrl}/rtb-refactored/api/user/update/role`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
            role: role
        },
        credentials: "include",
        mode: "cors"
    })
}

const getAllUserInnovations = async (csrfToken, id) => {

    return await fetch(`${domainUrl}/rtb-refactored/api/user/getInnovations`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id
        },
        credentials: "include",
        mode: "cors"
    })
}

const getAssignedReviews = async (csrfToken, id) => {

    return await fetch(`${domainUrl}/rtb-refactored/api/user/getAssignedReviews`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id
        },
        credentials: "include",
        mode: "cors"
    })
}

export {getUserData,updateUserRole,getAllUserInnovations}