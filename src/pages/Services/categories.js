import React from 'react';
import { InfoSection } from '../../components';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerList from './CategoryList';
import CustomerEdit from './CategoryEdit';

function Categories() {
  return (
    <>
       <Container fluid>
          <Button color="link"><Link to="/Categories">Manage categories List</Link></Button>
        </Container>
     
    </>
  );
}


export default Categories;