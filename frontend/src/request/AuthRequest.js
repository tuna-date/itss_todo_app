import BaseRequest from './BaseRequest';

export default class AuthRequest extends BaseRequest {
  login(params) {
    const url = '/login';
    return this.post(url, params)
  }

  register(params) {
    const url = '/register';
    return this.post(url, params);
  }

  getUserInfo(params) {
    const url = '/current_user';
    return this.get(url, {});
  }
}