const relayUrl = process.env.REACT_APP_RELAY_URL

const insertInnovation = async (csrfToken, id, form_data,status) => {

    const body = {
        user_id: id,
        form_data: JSON.stringify(form_data),
        status:status
    }

    await fetch(`${relayUrl}/rtb-refactored/api/innovation/insert`, {
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

const editInnovation = async (csrfToken, form_data, innovationId,status,id) => {

    const body = {
        form_data: JSON.stringify(form_data),
        innovation_id: innovationId,
        status: status,
        user_id: id
    }

    await fetch(`${relayUrl}/rtb-refactored/api/innovation/edit`, {
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

const deleteInnovation = (csrfToken, id, innovationId) => {

    const body = {
        user_id: id,
        innovation_id: innovationId,
    }

    fetch(`${relayUrl}/rtb-refactored/api/innovation/delete`, {
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

const submitInnovation = (csrfToken, id, innovationId) => {

    const body = {
        user_id: id,
        innovation_id: innovationId,
    }

    fetch(`${relayUrl}/rtb-refactored/api/innovation/submit`, {
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

const updateVersionInnovation = async (csrfToken, id, innovationId,status,form_data,version) => {

    const body = {
        user_id: id,
        innovation_id: innovationId,
        status: status,
        form_data: form_data,
        version: version + 1
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/innovation/updateVersion`, {
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

const publishInnovation = async (csrfToken, id, innovationId) => {

    const body = {
        user_id: id,
        innovation_id: innovationId,
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/innovation/publish`, {
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

const rejectInnovation = async (csrfToken, id, innovationId,comments) => {

    const body = {
        user_id: id,
        innovation_id: innovationId,
        comments: comments
    }

    return await fetch(`${relayUrl}/rtb-refactored/api/innovation/reject`, {
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

export {insertInnovation,editInnovation,deleteInnovation,submitInnovation,updateVersionInnovation,publishInnovation,rejectInnovation}