import Backbone from 'backbone'
import {ListingsModel, ListingsCollection} from './models.js'
import {NavView} from './view-nav.js'

export const MultiListingView = Backbone.View.extend({

  el: '#app-container',

  events: {
    'click .listing-post' : 'handleItemId'
  },

  handleItemId : function(evt){
    let postEl = evt.currentTarget
    console.log(postEl.dataset.itemid)
    window.location.hash = `item/${postEl.dataset.itemid}`

  },

  _buildListingsHtml: function(listingsColl){
      let listingsData = listingsColl.map(function(listingObj){

        return `

          <div class="col-sm-6 col-md-4">
            <div class="thumbnail listing-post" data-itemid="${listingObj.get('_id')}">
              <img src="${listingObj.get('imgLink')}" alt="...">
              <div class="caption">
                <h4>${listingObj.get('item')}</h4>
                <p>$${listingObj.get('price')}</p>
              </div>
            </div>
          </div>
        `

      }).join('')
    return listingsData
  },

  render: function(data){
    let navViewInstance = new NavView()
    this.el.innerHTML = `${navViewInstance._buildNavHtml()} <div class="row listings-container">` + this._buildListingsHtml(data) + `</div>`
  }

})
export default MultiListingView
