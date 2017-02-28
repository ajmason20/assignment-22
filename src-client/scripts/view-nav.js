import Backbone from 'backbone'

export const NavView = Backbone.View.extend({

  el: '#app-container',

  events : {
    'click .nav-tab' : 'handleNavTab'
  },

  handleNavTab: function(evt){
    if(evt.target.dataset.route === 'home'){
      return window.location.hash = ''
    }
    window.location.hash = evt.target.dataset.route
  },

  _buildNavHtml: function(){
    return`
    <nav class="nav-bar">
      <h3 class="nav-tab" data-route="home">Items For Sale</h3>
      <h3 class="nav-tab" data-route="new">Create a Listing</h3>
      <h2 class="logo-tab">Meg's List</h2>
    </nav>
    `
  },

  render: function(){ this.el.innerHTML = _buildNavHtml() }
})
