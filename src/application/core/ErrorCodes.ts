import ResponseError from './types/ResponseError';

export const httpCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  AUTH_TIMEOUT: 419,
};

export const httpMessages = {
  [httpCodes.OK]: 'OK',
  [httpCodes.CREATED]: 'Created',
  [httpCodes.ACCEPTED]: 'Accept',
  [httpCodes.NO_CONTENT]: 'No content',
  [httpCodes.BAD_REQUEST]: 'Invalid params',
  [httpCodes.UNAUTHORIZED]: 'Unauthorized',
  [httpCodes.NOT_FOUND]: 'Not found',
  [httpCodes.CONFLICT]: 'Conflict',
  [httpCodes.SERVER_ERROR]: 'Unknown error',
  [httpCodes.AUTH_TIMEOUT]: 'Token expired',
};

/**
 * Response with an error.
 *
 * @param {number} code http error code
 * @returns {Response}
 */
export const buildError = (code: number, info: string | string[]) => {
  const message: string = httpMessages[code] ? httpMessages[code] : httpMessages[httpCodes.SERVER_ERROR];
  return {
    code,
    message,
    info,
  };
};

/**
 * Build an error from an exception or ResponseError
 *
 * @param {e} ResponseError
 * @returns {Response}
 */
export const buildRawError = (e: ResponseError) => {
  console.error(e);
  // range of handled error is > 2xx and < 5xx
  const code = (e.code && (e.code > 200 && e.code < 600)) ? e.code : httpCodes.SERVER_ERROR;
  const info = e.info ? e.info : e.message;
  return buildError(code, info);
};
