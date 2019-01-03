import superagent from 'superagent';

import { API_ROOT, RESPONSE_TIME } from '../config';

export const responseBody = res => res.body;
export const processErrors = error => error;

export const request = {
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .timeout(RESPONSE_TIME)
      .set('Accept', 'application/json')
      .then(responseBody)
      .catch(processErrors),
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .type('json')
      .catch(processErrors),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .type('json')
      .catch(processErrors),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .set('Cache-Control', 'no-cache, no-store')
      .type('json')
      .catch(processErrors),
};

export const encode = encodeURIComponent;
