import axios from 'axios';
const baseURL = 'https://pixabay.com/api/';

export default {
  page: 1,
  perPage: 12,
  myKey: '&key=15726077-dbace57dc9a0145b34752406d',
  query: '',
  queryArticles() {
    const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${this.myKey}`;
    return axios.get(baseURL + requestParams).then(res => {
      this.incrementPage();
      return res.data.hits;
    });
  },

  get searchQuery() {
return this.query;
  },

  set searchQuery(string) {
      return this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
      this.page = 1;
  }
};
