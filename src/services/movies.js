// src/services/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://ophim1.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiClientV2 = axios.create({
  baseURL: 'https://img.ophim.live',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getListMovieNew(param) {
    return apiClient.get(`/danh-sach/phim-moi-cap-nhat${param}`);
  },
  getInfoMovie(slug) {
    return apiClient.get(`/phim/${slug}`);
  },
  getImageOfMovie(imgName) {
    return `https://img.ophim.live/uploads/movies/${imgName}`;
  },
  updatePost(id, post) {
    return apiClient.put(`/posts/${id}`, post);
  },
  deletePost(id) {
    return apiClient.delete(`/posts/${id}`);
  },
};