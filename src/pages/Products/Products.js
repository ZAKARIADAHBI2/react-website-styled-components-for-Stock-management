import React from 'react';
import { InfoSection } from '../../components';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerList from './CustomerList';
import CustomerEdit from './CustomerEdit';

function Products() {
  return (
    <>
       <Container fluid>
          <Button color="link"><Link to="/customers">Manage products List</Link></Button>
        </Container>
     
    </>
  );
}


export default Products;
