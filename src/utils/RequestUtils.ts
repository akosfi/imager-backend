export const createResponseBody = (code: number, payload: {[key: string]: string}) => {
    return {
        code,
        ...payload
    }
}