const domainUrl = process.env.REACT_APP_DOMAIN_URL

const updateUserPermissions = async (csrfToken, id,permissions) => {

    return await fetch(`${domainUrl}/api/admin/update/permissions`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
            permissions: permissions,
            targetid: id
        },
        credentials: "include",
        mode: "cors"
    })
}

const getAllInnovations = async (csrfToken, id) => {

    return await fetch(`${domainUrl}/api/admin/getInnovations`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
        },
        credentials: "include",
        mode: "cors"
    })
}

const getAllReviwers = async (csrfToken, id) => {

    return await fetch(`${domainUrl}/api/admin/getReviewers`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
        },
        credentials: "include",
        mode: "cors"
    })
}

const assignReviewer = async (csrfToken, id,innovationId,reviewer_ids) => {

    return await fetch(`${domainUrl}/api/admin/assignReviewer`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
            innovation_id: innovationId,
            reviewer_ids: reviewer_ids
        },
        credentials: "include",
        mode: "cors"
    })
}

export {updateUserPermissions,getAllInnovations,getAllReviwers,assignReviewer}