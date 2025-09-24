import api from "./api.js";

export const notesService = {
  async getNotes() {
    const response = await api.get("/notes");
    // Backend returns: { success: true, data: { notes: [...], pagination: {...} } }
    return response.data.data; // Extract the nested data
  },

  async createNote(noteData) {
    const response = await api.post("/notes", noteData);
    // Backend returns: { success: true, data: { note: {...} } }
    return response.data.data; // Extract the nested data
  },

  async updateNote(id, noteData) {
    const response = await api.put(`/notes/${id}`, noteData);
    // Backend returns: { success: true, data: { note: {...} } }
    return response.data.data; // Extract the nested data
  },

  async deleteNote(id) {
    const response = await api.delete(`/notes/${id}`);
    // Backend returns: { success: true, data: {...} }
    return response.data.data; // Extract the nested data
  },

  async getNote(id) {
    const response = await api.get(`/notes/${id}`);
    // Backend returns: { success: true, data: { note: {...} } }
    return response.data.data; // Extract the nested data
  }
};