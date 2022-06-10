
export const localstorageHelper = {
    store(key, value){
        localStorage.setItem(key, JSON.stringify(value))
    },
    load(key){
        const stored = localStorage.getItem(key)
        return stored == null || stored == undefined
        || stored == 'unknown' ? undefined : JSON.parse(stored)
    }
}