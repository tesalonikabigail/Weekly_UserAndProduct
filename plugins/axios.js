export default function ({ $axios, store }) {
    $axios.interceptors.request.use((config) => {
        // add auth header with jwt if account is logged in and request is to the api url
        const token = store.state.regis.token;
        const isLoggedIn = token || null;

        if(isLoggedIn)
            config.headers.common.Authorization = `Bearer ${token}`;
        return config; 
    }, (error) => {
        return Promise.reject(error);
    });

    $axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error.response && error.response.status === 401) {
                // clearState();
                location.reload();
            } 
            else
                return Promise.reject(error);
        }
    );
}