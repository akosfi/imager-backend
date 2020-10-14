export const createResponseBody = (code: number, payload: {[key: string]: any}) => {
  return {
    code,
    ...payload
  }
}
