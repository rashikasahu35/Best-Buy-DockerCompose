import toast from "react-hot-toast";


const ShowError = (error) => {
    console.log(error);
    if (error.response?.status == 401) {
        window.history.pushState({},'', '/login');
        const popStateEvent = new PopStateEvent('popstate', { state: { path: '/login' } });
        window.dispatchEvent(popStateEvent);
    }
    if (error.message == "Network Error") {
        toast.error(
            "Network Error, Could not connect to server, please try again later."
        );
    } else{
        toast.error(error.response?.data?.message || "Internal Server Error");
    }
};

export default ShowError;
