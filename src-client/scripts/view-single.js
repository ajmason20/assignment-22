import Backbone from 'backbone'
import {ListingsModel, ListingsCollection} from './models.js'
import {NavView} from './view-nav.js'

export const SingleListingView = Backbone.View.extend({

  el: '#app-container',

  events: {
    'click .remove-item' : 'removeItem'
  },

  removeItem: function(evt){
    let modelInstance = new ListingsModel()
    console.log(evt.target.dataset.id)
    modelInstance.set({_id: evt.target.dataset.id})

    let viewInstance = this
    let itemCollInstance = new ListingsCollection()

    modelInstance.destroy().then(function(){
      return itemCollInstance.fetch()
    }).then(function(){
      viewInstance.render(itemCollInstance.models)
    })
  },

  _buildSingleHtml: function(singleModel){
    console.log(singleModel)
    return`
    <div class="single-item">
      <div class="single-img">
        <img src="${singleModel.get('imgLink')}" alt="...">
      </div>
      <div class="item-info">
        <h3>${singleModel.get('item')}</h3> <h3>$${singleModel.get('price')}</h3>
        <p>${singleModel.get('description')}</p>
      </div>
      <div class="remove-item">
        <i class='fa fa-remove fa-2x' data-id="${singleModel.get('_id')}"></i>
      </div>
    </div>
    `
  },

  render: function(data){
    let navViewInstance = new NavView()
    this.el.innerHTML = `${navViewInstance._buildNavHtml()}` + this._buildSingleHtml(data)
  }



})
export default SingleListingView
