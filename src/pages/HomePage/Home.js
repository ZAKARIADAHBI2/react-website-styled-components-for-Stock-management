import React, { Component } from 'react';
import { InfoSection, Pricing } from '../../components';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import FirebaseService from '../../FirebaseService';
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {customers: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount = () => {
    FirebaseService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount = () => {
    FirebaseService.getAll().off("value", this.onDataChange);
  }

  onDataChange = (items) => {
    console.log(items);
    let customers = [];
    items.forEach(item => {
      let data = item.val();
      customers.push({
        key: item.key,
        productname: data.productname,
        Price: data.Price,
        Quntite: data.Quntite,
        category: data.category,
        image: data.image

       
        
      });
    });

    this.setState({
      customers: customers,
      isLoading: false
    });
  }

  async remove(key) {
    FirebaseService.delete(key)
    .then(() => {
      let updatedCustomers = [...this.state.customers].filter(i => i.key !== key);
      this.setState({customers: updatedCustomers});
    });
  }

  render() {
    const {customers, isLoading} = this.state;
   
  


   const customerList = customers.map(customer => {

      return (
        <div className="main_container">
       
       
        <section class="our-publication pt-100 pb-70">
             <div class="container">
                 
            <div class="row">
        <div class="col-sm-6 col-lg-3"> 
            <div class="single-publication">
                <figure>
                    <a href="#">
                        <img src={customer.image} alt="Publication Image" />
                    </a>
                    <ul>
                        <li><a href="#" title="Add to Favorite"><i class="fa fa-heart"></i></a></li>
                        <li><a href="#" title="Add to Compare"><i class="fa fa-refresh"></i></a></li>
                        <li><a href="#" title="Quick View"><i class="fa fa-search"></i></a></li>
                    </ul>
                </figure>
                <div class="publication-content">
                    <h3><a href="#">{customer.productname}</a></h3>
                    <ul>
                        <li><i class="icofont-star"></i></li>
                        <li><i class="icofont-star"></i></li>
                        <li><i class="icofont-star"></i></li>
                        <li><i class="icofont-star"></i></li>
                        <li><i class="icofont-star"></i></li>
                    </ul>
                    <h4 class="price">{customer.Price}</h4>
                </div>
                <div class="add-to-cart">
                    <a href="#" class="default-btn">Add to Cart</a>
                </div>
            </div>
        </div>
        </div>
        </div>
        </section>
        </div>
      )
      
    });
              
   

    return (
      <div>
        
        <Container fluid>
         
          
            {customerList}
            
        </Container>
      </div>
    );
  }
}

export default Home;