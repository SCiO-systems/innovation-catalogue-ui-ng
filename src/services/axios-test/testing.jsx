class TestService {

    test = async (csrfTokenState) => {
        let fetchPostResponse = await fetch(`http://localHost:5000/api/course`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfTokenState,
            },
            credentials: "include",
            mode: "cors"
        })
        return await fetchPostResponse.json()
    }
}

export default new TestService();
