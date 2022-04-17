import axios from 'axios'
let headers = new Headers()
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');
class APICommon {
    connect() {
        const instance = axios.create({
            baseURL : "http://localhost/modern_resolve_intern_project_backend",
            headers: headers
        })
        return instance
    }
}

export default new APICommon()