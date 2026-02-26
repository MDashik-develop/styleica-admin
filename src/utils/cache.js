export const setCache = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getCache = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

export const clearCache = (key) => {
    localStorage.removeItem(key);
};
