import React from 'react';
import { InfoSection, Pricing } from '../../components';
import { homeObjOne, homeObjThree } from './Data';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
function Services() {
  return (
    <>
        <Container fluid>
          <Button color="link"><Link to="/Categories">Manage categories List</Link></Button>
        </Container>
    </>
  );
}

export default Services;
