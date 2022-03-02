const relayUrl = process.env.REACT_APP_RELAY_URL

const updateUserPermissions = async (csrfToken, id,permissions,targetId) => {

    const body = {
        user_id: id,
        permissions: permissions,
        target_id: targetId
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/admin/update/permissions`, {
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

const getAllInnovations = async (csrfToken, id) => {

    const body = {
        user_id: id,
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/admin/getInnovations`, {
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

const getAllReviewers = async (csrfToken, id) => {

    const body = {
        user_id: id,
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/admin/getReviewers`, {
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

const assignReviewer = async (csrfToken, id,innovationId,reviewer_ids) => {

    const body = {
        user_id: id,
        innovation_id: innovationId,
        reviewer_ids: reviewer_ids
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/admin/assignReviewer`, {
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

export {updateUserPermissions,getAllInnovations,getAllReviewers,assignReviewer}