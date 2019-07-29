class StorageService {

    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value))

        return value
    }

    get(key) {
        return JSON.parse(localStorage.getItem(key))
    }
}

export const storageService = new StorageService()