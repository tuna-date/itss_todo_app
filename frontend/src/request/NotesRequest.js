import BaseRequest from './BaseRequest';

export default class NotesRequest extends BaseRequest {
  getNotes(params) {
    const url = `/current_user/index/${params.page}`
    return this.get(url, {});
  }

  createNote(params) {
    const url = '/current_user/notes';
    return this.post(url, params);
  }

  getNoteDetail(params) {
    const url = `/current_user/notes/${params.nodeId}`;
    return this.get(url, {});
  }

  updateNote(params) {
    const url =`/current_user/notes/${params.nodeId}`;
    return this.put(url, params);
  }

  deleteNote(params) {
    const url =`/current_user/notes/${params.nodeId}`;
    return this.delete(url, {});
  }
}