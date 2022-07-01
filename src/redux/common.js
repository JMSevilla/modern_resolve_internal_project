import axios from 'axios'
let headers = new Headers()
headers.append('Access-Control-Allow-Origin', '*');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS');
class APICommon {
    connect() {
        const instance = axios.create({
            // baseURL : "http://127.0.0.1:8000/api/",
            baseURL : "https://honest-toque-03744.herokuapp.com/api/",
            headers: headers
        })
        return instance
    }
    connectv2(
        {method,
        url,
        headers,
        data}
    ){
        const instance = axios({
            method : method,
            url : "https://honest-toque-03744.herokuapp.com/api/" + url,
            headers : headers,
            data: data
        });
        return instance;
    }
}

export default new APICommon()