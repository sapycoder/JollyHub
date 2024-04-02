export const CustomError = (status, code, message) => {
    const err = new Error();
    err.status = status || err.status
    err.code = code || err.code
    err.message = message || err.message

    return err
}