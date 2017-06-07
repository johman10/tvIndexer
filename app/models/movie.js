// TODO: Consider making this into a class with extend for overall functions such as save
import BaseModel from 'models/base';

export default class Movie extends BaseModel {
  constructor (data = {}) {
    super();
    this.record = data;
    this.searchResults = [];
    this.tableName = 'movies';
  }
}

Movie.searchPath = '/search/movie';
