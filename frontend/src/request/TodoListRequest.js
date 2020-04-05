import { BaseRequest } from './BaseRequest';

export default class TodoListRequest extends BaseRequest {
  getTodoList(params) {
    const url = `/current_user/current_user/index/${params.page}`
    return this.get(url, {});
  }

  createTodo(params) {
    const url = '/current_user/notes';
    return this.post(url, params);
  }

  getTodoDetail(params) {
    const url = `/current_user/notes/${params.nodeId}`;
    return this.get(url, {});
  }

  updateTodo(params) {
    const url =`/current_user/notes/${params.nodeId}`;
    return this.put(url, params);
  }

  deleteTodo(params) {
    const url =`/current_user/notes/${params.nodeId}`;
    return this.delete(url, {});
  }
}