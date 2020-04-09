import axios from 'axios';
import { browserHistory } from '../utils/history';
import config from '../utils/config';

let accessToken = null;

export default class BaseRequest {
  getFullUrl(url) {
    if (!url.startsWith('/')) {
      url = '/' + url;
    }

    return `${config.api_url}/api` + url;
  }

  async get(url, params = {}) {
    return this._doRequest('GET', url, { params });
  }

  async put(url, data = {}) {
    return this._doRequest('PUT', url, { data });
  }

  async post(url, data = {}) {
    return this._doRequest('POST', url, { data });
  }

  async delete(url, data = {}) {
    return this._doRequest('DELETE', url, { data });
  }

  async _doRequest(method, url, config, isAuthRequired = true) {
    const accessToken = await getAccessToken();

    if (isAuthRequired && !accessToken ) {
      console.warn(`Invalid token for auth request: ${url}`);
    }

    try {
      const fulllUrl = this.getFullUrl(url);
      console.log('fullUrl: ', fulllUrl);
      const response = await axios({
        method: method.toLowerCase(),
        url: fulllUrl,
        ...config,
        timeout: 60000,
        headers: {
          Authorization: isAuthRequired ? accessToken : undefined
        }
      });
      return response.data;
    } catch (e) {
      console.warn(e);
      throw e;
    }
  }

  _handleCommonError(err) {
    if (err.response && err.response.status === 401) {
      browserHistory.push('/login');
      return;
    };
    
    throw err;
  }
}

export function getAccessToken() {
  if(!accessToken) {
    accessToken = localStorage.getItem('jwtToken');
  }

  return accessToken || '';
}

export function invalidateAccessToken() {
  accessToken = null;
}