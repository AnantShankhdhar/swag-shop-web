import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Components
import Product from '../product/product.js';
import WishList from '../wishlist/wishlist.js'

//Services
import HttpService from '../services/http-service';

const http = new HttpService();

class App extends Component {
    
  constructor(props) {
      super(props);
      this.state={ products:[]};//initializing state as an empty array
      
      //Bind functions
      this.loadData = this.loadData.bind(this);//binding the loadData function otherwise it won't work
      this.ProductList = this.ProductList.bind(this);
      
      this.loadData();
  }
  loadData = () => {
      var self = this;
      http.getProducts().then(data => {
         // console.log(data);
          self.setState({products:data})
      }, err => {
          
      });
  }
    
  ProductList = () => {
      const list = this.state.products.map((product) => 
          <div className="col-sm-4" key={product._id}>
              <Product product={product}/>
          </div>
      );
      
      return(list);
  } 
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Swag-Shop</h2>
        </div>
        <div className="App-main container">
            <div class="row">
                <div class="col-sm-8">
                    <div class="row">
                        {this.ProductList()}; 
                    </div>
                   
                </div>
                <div class="col-sm-4">
                    <WishList />
                </div>
            </div>
            
        </div>
      </div>
    );
  }
}

export default App;
