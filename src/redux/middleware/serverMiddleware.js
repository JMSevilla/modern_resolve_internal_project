import axios from 'axios'
import * as actions from "../actions/registrationAction"

const serverMiddleware = ({dispatch}) => (next) => async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { headers, url, method, data, onStart, onSuccess, onError } =
        action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
        let headers = new Headers()
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('GET', 'POST', 'OPTIONS');
        const response = await axios.create({
            baseURL: "http://localhost/modern_resolve_intern_project_backend",
            headers : headers,
            url,
            method,
            data,
        });
        dispatch(actions.apiCallSuccess(response.data));
        if (onSuccess)
            console.log(response.data)
            dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        dispatch(actions.apiCallFailed(error.message));
        if (onError) dispatch({ type: onError, payload: error.message });
    }
}
export default serverMiddleware