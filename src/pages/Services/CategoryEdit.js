import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import FirebaseService from '../../FirebaseService';
import 'bootstrap/dist/css/bootstrap.css';


class CategoryEdit extends Component {

  emptyCategory = {
    name:''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCategory
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
    let category = {
      name: data.name
    
    };

    this.setState({
      item: category,
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
      FirebaseService.addCategory(item);
    }
    this.props.history.push('/category');
  };

  render = () => {
    const {item} = this.state;
    const title = <h2>{item.key ? 'Edit Category' : 'Add Category'}</h2>;

    return <div>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Category name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          
          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/Categories">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CategoryEdit);