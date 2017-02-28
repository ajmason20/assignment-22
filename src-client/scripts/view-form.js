import Backbone from 'backbone';
import $ from 'jquery';
import {ListingsModel} from './models.js';
import {NavView} from './view-nav.js';

export const FormView = Backbone.View.extend({

  el: '#app-container',

  events: {
    'submit #form-newlisting' : 'handleSubmit'
  },

  // _renderFlashMsg: function(flashMsgDomEl, obj){
  //   if(obj.isValidInput){
  //     flashMsgDomEl.classList.add('input-success')
  //     flashMsgDomEl.classList.remove('input-failure')
  //     flashMsgDomEl.innerHTML = '&#10003;'
  //   } else {
  //     flashMsgDomEl.classList.add('input-failure')
  //     flashMsgDomEl.classList.remove('input-success')
  //     flashMsgDomEl.innerHTML = obj.msg
  //   }
  //
  // },

  _checkTitleInput: function(inputDomEl){
    let itemNameEl = inputDomEl.item
    let itemNameVal = itemNameEl.value
    let flashMsgEl = document.querySelector('.item_name .flash-msg')

    if( itemNameVal.length === 0 ) {
      flashMsgEl.innerHTML = 'Must include a title'
      flashMsgEl.classList.add('input-failure')
      flashMsgEl.classList.remove('input-success')
    } else {
      flashMsgEl.innerHTML = '&#10003;'
      flashMsgEl.classList.add('input-success')
      flashMsgEl.classList.remove('input-failure')
    }

  },

  _checkPriceInput: function(inputDomEl){
    let priceNameEl = inputDomEl.price
    let priceNameVal = priceNameEl.value
    let flashMsgEl = document.querySelector('.item_price .flash-msg')

    if( isNaN(priceNameVal) === true ) {
      flashMsgEl.innerHTML = 'Can only be a number'
      flashMsgEl.classList.add('input-failure')
      flashMsgEl.classList.remove('input-success')
    } else if( priceNameVal.length === 0 ) {
      flashMsgEl.innerHTML = 'Must include a price'
      flashMsgEl.classList.add('input-failure')
      flashMsgEl.classList.remove('input-success')
    } else {
      flashMsgEl.innerHTML = '&#10003;'
      flashMsgEl.classList.add('input-success')
      flashMsgEl.classList.remove('input-failure')
    }
  },

  _checkForSaleInput: function(inputDomEl){
    let forSaleEl = inputDomEl.forsale
    let forSaleVal = forSaleEl.value
    let flashMsgEl = documenbt.querySelector('.item_for-sale .flash-msg')

    if( forSaleVal.length === 0 ){
      flashMsgEl.innerHTML = 'Must include for sale.'
      flashEl.classList.add('input-failure')
      flashEl.classList.remove('input-success')
    } else if( forSaleVal !== 0 || forSaleVal !== 1 ){
      flashMsgEl.innerHTML = 'Input must be a 0 or 1.'
      flashMsgEl.classList.add('input-failure')
      flashMsgEl.classList.remove('input-success')
    } else {
      flashMsgEl.innerHTML = '&#10003;'
      flashMsgEl.classList.add('input-success')
      flashMsgEl.classList.remove('input-failure')
    }
  },

  _checkCategoryInput: function(inputDomEl){
    let categoryNameEl = inputDomEl.category
    let categoryValEl = categoryNameEl.value
    let flashMsgEl = document.querySelector('.item_category .flash-msg')

    if( categoryValEl.length === 0 ){
      flashMsgEl.innerHTML = 'Must include a category.'
      flashMsgEl.classList.add('input-failure')
      flashMsgEl.classList.remove('input-success')
    } else {
      flashMsgEl.innerHTML = '&#10003;'
      flashMsgEl.classList.add('input-success')
      flashMsgEl.classList.remove('input-failure')
    }
  },

  _checkDescriptionInput: function(inputDomEl){
    let descriptionEl = inputDomEl.description
    let descriptionVal = descriptionEl.value
    let flashMsgEl = document.querySelector('.item_description .flash-msg')

    if( descriptionVal.length === 0 ){
      flashMsgEl.innerHTML = 'Must include a description.'
      flashMsgEl.classList.add('input-failure')
      flashMsgEl.classList.remove('input-success')
    } else {
      flashMsgEl.innerHTML = '&#10003;'
      flashMsgEl.classList.add('input-success')
      flashMsgEl.classList.remove('input-failure')
      }
  },

  handleSubmit: function(evt){
    evt.preventDefault();
    let formEl = evt.target

    let dataForSubmit = {
      item: formEl.item.value,
      price: parseInt(formEl.price.value),
      forSale: formEl.item.forSale,
      category: formEl.category.value.toLowerCase(),
      description: formEl.description.value,
      imgLink: formEl.imglink.value
    }

    let model = new ListingsModel()
    model.set(dataForSubmit)
    model.save().then(function(){
      window.location.hash = ''
    })

    this._checkTitleInput(formEl)
    this._checkPriceInput(formEl)
    this._checkCategoryInput(formEl)
    this._checkDescriptionInput(formEl)

  },

  _buildFormHtml: function(){
    return`
    <form class="new-listing" id="form-newlisting">
    <h2>Add your listing!</h2>
      <div class="item_name">
        <label>Item Name</label>
        <input type="text" name="item" placeholder="">
        <p class="flash-msg"></p>
      </div>
      <div class="item_price">
        <label>Price</label>
        <input type="text" name="price" placeholder="">
        <p class="flash-msg"></p>
      </div>
      <div class="item_for-sale">
        <label>For Sale</label>
        <input type="text" name="forsale" placeholder="">
        <p class="flash-msg"></p>
      </div>
      <div class="item_category">
        <label>Category</label>
        <input type="text" name="category" placeholder="">
        <p class="flash-msg"></p>
      </div>
      <div class="item_description">
        <label>Description</label>
        <input type="text" name="description" placeholder="">
        <p class="flash-msg"></p>
      </div>
      <div class="item_imglink">
        <label>Image Link</label>
        <input type="text" name="imglink" placeholder="">
        <p class="flash-msg"></p>
      </div>
      <button class="btn" type="submit">Submit</button>
    </form>
    `
  },

  render: function(data){
    let navViewInstance = new NavView()
    this.el.innerHTML = `${navViewInstance._buildNavHtml()}` + this._buildFormHtml(data)
  }

})
