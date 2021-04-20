import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import FirebaseService from '../../FirebaseService';
import 'bootstrap/dist/css/bootstrap.css';


class CustomerEdit extends Component {

  emptyCustomer = {
    key: '',
    productname: '',
    Price: '',
    Quntite: "",
    category: '',
    image : ""
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCustomer
    };
  }

  componentDidMount = () => {
    let key = this.props.match.params.key
    if (key !== 'new') {
      FirebaseService.get(key).on("value", this.onDataChange);
    }
  }

  componentWillUnmount = () => {
    FirebaseService.getAll().off("value", this.onDataChange);
  }

  onDataChange = (item) => {
    let data = item.val();
    let customer = {
      key: item.key,
      productname: data.productname,
      Price: data.Price,
      Quntite: data.Quntite,
      category: data.category,
      image: data.image

    
    };

    this.setState({
      item: customer,
    });
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {item} = this.state;
    let key = this.props.match.params.key
    if (key !== 'new') {
      FirebaseService.update(key, item);
    } else {
      FirebaseService.addCustomer(item);
    }

    this.props.history.push('/customers');
  };

  render = () => {
    const {item} = this.state;
    const title = <h2>{item.key ? 'Edit Customer' : 'Add Customer'}</h2>;

    return <div>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="productname">Product name</Label>
            <Input type="text" name="productname" id="productname" value={item.productname || ''}
                   onChange={this.handleChange} autoComplete="productname"/>
          </FormGroup>
          <FormGroup>
            <Label for="Price">Price</Label>
            <Input type="text" name="Price" id="Price" value={item.Price || ''}
                   onChange={this.handleChange} autoComplete="Price"/>
          </FormGroup>          
          <FormGroup>
            <Label for="Quntite">Quntite</Label>
            <Input type="text" name="Quntite" id="Quntite" value={item.Quntite || ''}
                   onChange={this.handleChange} autoComplete="Quntite"/>
          </FormGroup>
          <FormGroup>
            <Label for="category">category</Label>
            <Input type="text" name="category" id="category" value={item.category || ''}
                   onChange={this.handleChange} autoComplete="category"/>
          </FormGroup>
          <FormGroup>
            <Label for="image">Product Image:</Label>
            <Input type="file" name="image" id="image" value={item.image || ''}
                   onChange={ this.handleChange} autoComplete="image"/>
          </FormGroup>
         
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/customers">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CustomerEdit);