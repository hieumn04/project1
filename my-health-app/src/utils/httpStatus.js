
const isUnauthorizedError = (status) => {
    return status === 401 || status === 403;
}

export default isUnauthorizedError;

