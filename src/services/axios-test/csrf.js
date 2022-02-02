const domainUrl = "http://localHost:5000"

class CsrfService {

    getCallToForm = async () => {
        let fetchGetResponse = await fetch(`${domainUrl}/form`, {
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
    testCsurfPostClick = async (csrfTokenState) => {
        let fetchPostResponse = await fetch(`${domainUrl}/process`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfTokenState,
            },
            credentials: "include",
            mode: "cors"
        })
        // console.log(fetchPostResponse)
        return await fetchPostResponse.text()
    }
}

export default new CsrfService();
