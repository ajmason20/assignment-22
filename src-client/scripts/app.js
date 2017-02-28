import $ from 'jquery';
import Backbone from 'backbone';
import {ListingsModel, ListingsCollection} from './models.js'
import MultiListingView from './view-multi.js'
import SingleListingView from './view-single.js'
import {FormView} from './view-form.js'
import {NavView} from './view-nav.js'


const AppRouter = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start()
  },

  routes : {
  '' : 'showAllListings',
  'new'  : 'showCreateListingForm',
  'item/:id' : 'showSingleListing'
  },

  showCreateListingForm: function(){
    let formViewInstance = new FormView()
    formViewInstance.render()
  },

  showAllListings: function(){
    let listingsCollInstance = new ListingsCollection()
    listingsCollInstance.fetch().then( function(){
      console.log(listingsCollInstance)
      let listingsView = new MultiListingView()
      listingsView.render(listingsCollInstance.models)
    })
  },

  showSingleListing: function(idVal){
    let singleModel = new ListingsModel()
    singleModel.set({_id: idVal})
    let router = this
    singleModel.fetch().then( function(){
      router.singleView = new SingleListingView()
      router.singleView.render(singleModel)
    })

  }


})

const newApp = new AppRouter()
