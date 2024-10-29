export const LocalStorageManager = {
    getItem: (key: string, ifFound?: Function): string | null => {
        if (import.meta.client) {
            const value = localStorage.getItem(key);
            if (value != null) {
                if (ifFound) {
                    ifFound(value);
                }
                return value;
            }
        }
        return null;
    },
    setItem: (key: string, value: string) => {
        if (import.meta.client) {
            localStorage.setItem(key, value);
        }
    },
    removeItem: (key: string) => {
        if (import.meta.client) {
            localStorage.removeItem(key);
        }
    }
}