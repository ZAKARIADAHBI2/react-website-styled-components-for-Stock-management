import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import FirebaseService from '../../FirebaseService';
import 'bootstrap/dist/css/bootstrap.css';
import Categories from './categories';


class CategoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {categories: [], isLoading: true};
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
    let category = [];
    items.forEach(item => {
      let data = item.val();
      category.push({
        
        name: data.name
        
       
        
      });
    });

    this.setState({
        category: category,
      isLoading: false
    });
  }

  async remove(key) {
    FirebaseService.delete(key)
    .then(() => {
      let updatedCategories = [...this.state.customers].filter(i => i.key !== key);
      this.setState({category: updatedCategories});
    });
  }

  render() {
    const {category, isLoading} = this.state;

    const categoriesList = category.map(category => {
      return <tr key={category.key}>
        <td style={{whiteSpace: 'nowrap'}}>{category.name}</td>
        <td>{category.name}</td>
    
     
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/categories/" + category.key}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(category.key)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/categories/new">Add Categories</Button>
          </div>
          
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Category name</th>
               
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
            {CategoryList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CategoryList;