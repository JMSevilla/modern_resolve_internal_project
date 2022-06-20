

export const utils_response = (response) => {
    return new Promise((resolve) => {
        let newResponse
        if(response[0]) {
            newResponse = {
                __message__ : response[0].key
            }
            return resolve(newResponse)
        }
    })
}