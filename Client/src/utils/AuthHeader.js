const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    const headers = {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    return headers
};


export default getAuthHeader
