import React, {Component} from 'react';
import './wishlist.css';
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service.js';
import DataService from '../services/data-service.js';
import ProductCondensed from '../product-condensed/product-condensed.js';

let ns = new NotificationService();

class WishList extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {wishList:[]};
        this.createWishlist = this.createWishlist.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
        
    }
    
    createWishlist = () => {
        const list = this.state.wishList.map((product) => 
            <ProductCondensed product={product} key={product._id} />
        );
        
        return (list);
        
    }
    
    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED,this,this.onWishListChanged);
    }
    
    componentWillUnmount(){
        ns.removeObserver(NOTIF_WISHLIST_CHANGED,this)
    }

    onWishListChanged = (newWishList) => {
        this.setState({wishList:newWishList});
    }
    
    render(){
        return(
         <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Wishlist</h4>
                    <ul className="list-group">
                        {this.createWishlist()};
                    </ul>
                </div>
         </div>
        )
       
    }
}

export default WishList;