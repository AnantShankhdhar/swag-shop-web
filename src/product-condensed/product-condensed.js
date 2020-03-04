import React, {Component} from 'react';
import './product-condensed.css';
import DataService from '../services/data-service.js';

let ds = new DataService();

class ProductCondensed extends Component{
    
    constructor(props){
        super(props);
        
        //bind
        
        this.removeProduct = this.removeProduct.bind(this);
    }
    
    removeProduct = () => {
        ds.removeWishlistItem(this.props.product);
    }
    
    render(){
        return(
          <li className="list-group-item ">
                <a className="btn btn-outline-danger " onClick = {() => this.removeProduct()}>X</a>
                <p>{this.props.product.title} | <b>Rs {this.props.product.price}</b></p>
          </li>
        )
       
    }
}

export default ProductCondensed;