import Backbone from 'backbone';
import $ from 'jquery';

export const ListingsModel = Backbone.Model.extend({
  urlRoot: '/api/item',
  idAttribute: '_id'
})

export const ListingsCollection = Backbone.Collection.extend({
  model: ListingsModel,
  url: '/api/item'
})
