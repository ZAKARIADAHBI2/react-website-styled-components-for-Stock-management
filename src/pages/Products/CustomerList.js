import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import FirebaseService from '../../FirebaseService';
import 'bootstrap/dist/css/bootstrap.css';


class CustomerList extends Component {

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
      return <tr key={customer.key}>
        <td style={{whiteSpace: 'nowrap'}}>{customer.productname}</td>
        <td>{customer.Price}</td>
        <td>{customer.Quntite}</td>
        <td>{customer.category}</td>
         <td>{customer.image}</td>
     
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/customers/" + customer.key}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(customer.key)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/customers/new">Add Products</Button>
          </div>
          <h3>Products List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">product name</th>
                <th width="20%">price</th>
                <th width="10%">Quntite</th>
                <th width="10%">categorie</th>
                <th width="10%">Products image</th>
               
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {customerList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CustomerList;