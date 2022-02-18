const domainUrl = process.env.REACT_APP_DOMAIN_URL

const insertInnovation = async (csrfToken, id, form_data,status) => {

    console.log(id)

    return await fetch(`${domainUrl}/api/innovation/insert`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
            form_data: JSON.stringify(form_data),
            status: status
        },
        credentials: "include",
        mode: "cors"
    })
}

const editInnovation = async (csrfToken, id, innovationId,status) => {

    return await fetch(`${domainUrl}/api/innovation/edit`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
            innovation_id: innovationId,
            status: status
        },
        credentials: "include",
        mode: "cors"
    })
}

const deleteInnovation = async (csrfToken, id, innovationId) => {

    return await fetch(`${domainUrl}/api/innovation/delete`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
            innovation_id: innovationId,
        },
        credentials: "include",
        mode: "cors"
    })
}

const updateVersionInnovation = async (csrfToken, id, innovationId,status,form_data,version) => {

    return await fetch(`${domainUrl}/api/innovation/updateVersion`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
            innovation_id: innovationId,
            status: status,
            form_data: form_data,
            version: version + 1
        },
        credentials: "include",
        mode: "cors"
    })
}

const publishInnovation = async (csrfToken, id, innovationId) => {

    return await fetch(`${domainUrl}/api/innovation/publish`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
            innovation_id: innovationId,
        },
        credentials: "include",
        mode: "cors"
    })
}

const rejectInnovation = async (csrfToken, id, innovationId,comments) => {

    return await fetch(`${domainUrl}/api/innovation/reject`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": csrfToken,
            user_id: id,
            innovation_id: innovationId,
            comments: comments
        },
        credentials: "include",
        mode: "cors"
    })
}

export {insertInnovation,editInnovation,deleteInnovation,updateVersionInnovation,publishInnovation,rejectInnovation}