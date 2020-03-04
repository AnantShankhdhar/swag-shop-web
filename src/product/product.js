import React, {Component} from 'react';
import './product.css';
import DataService from '../services/data-service.js';
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service.js';

let ds = new DataService();
let ns = new NotificationService();

class Product extends Component{
    
    constructor(props){
        super(props);
        this.state = {onWishList: ds.itemOnWishList()};
        
        //Bind Functions
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }
    
    onButtonClicked = () => {
        if(this.state.onWishList)
            {
                ds.removeWishlistItem(this.props.product);
            }
        else{
            ds.addWishlistItem(this.props.product);
        }
        
    }
    
     componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED,this,this.onWishListChanged);
    }
    
    componentWillUnmount(){
        ns.removeObserver(NOTIF_WISHLIST_CHANGED,this)
    }

    onWishListChanged = (newWishList) => {
        this.setState({onWishList: ds.itemOnWishList(this.props.product)});
    }

    
    render(){
        
        var btnClass;
        if (this.state.onWishList)
            {
                btnClass = "btn btn-danger";
            }
        else {
            btnClass = "btn btn-primary";
        }
        
        
        return(
          <div className="card product">
            <img className="card-img-top" alt="Product" src={this.props.product.imgUrl}></img>
            <div className="card-body">
                <h4 className="card-title">{this.props.product.title}</h4>
                <p className="card-text">Price: Rs{this.props.product.price}</p>
                <a href="#" onClick={() => this.onButtonClicked()} className={btnClass}>{this.state.onWishList ? "Remove From Wishlist": "Add to Wishlist"}</a>
            </div>
          </div>   
        )
       
    }
}

export default Product;