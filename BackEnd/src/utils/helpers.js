module.exports = {
    generateUniqueId: () => {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    },

    formatResponse: (data, message = 'Success', status = 200) => {
        return {
            status,
            message,
            data,
        };
    },

    handleError: (error) => {
        console.error(error);
        return {
            status: 'error',
            message: error.message || 'An unexpected error occurred',
        };
    },

    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },

    isEmpty: (obj) => {
        return Object.keys(obj).length === 0;
    },
};