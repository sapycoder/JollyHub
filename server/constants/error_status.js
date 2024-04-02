export const exceptionCode = {
    INTERNAL_SERVER_ERROR: {
        code: 'Internal Server Error',
        status: 500,
        message: 'Oops! Something went wrong on our end. Please try again later.'
    },
    FORBIDDEN: {
        code: 'Forbidden',
        status: 403,
        message: 'Access Forbidden. You don\'t have permission to access this resource.'
    },
    BAD_REQUEST: {
        code: 'Bad Request',
        status: 400,
        message: 'Invalid Request. Please check your request and try again.'
    },
    NOT_FOUND: {
        code: 'Not Found',
        status: 404,
        message: 'Data Not Found. The requested resource could not be found.'
    },
    UNAUTHORIZED: {
        code: 'Unauthorized',
        status: 401,
        message: 'Unauthorized Access. Please authenticate to access this resource.'
    }
};