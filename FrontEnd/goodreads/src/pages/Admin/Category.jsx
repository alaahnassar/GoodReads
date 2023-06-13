import React, { useEffect, useState } from 'react'
import CataegroyDetails from '../../components/admin/category/CataegroyDetails'
import BookStyle from "./Category.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
function Category() {


  return (

    <div className={BookStyle.bg}>
      <Container
        className={BookStyle.shadow}
        style={{ backgroundColor: "white" }}
      >
        <Row>
          {/* table book  */}
          <CataegroyDetails></CataegroyDetails>
        </Row>
      </Container>
    </div>
  );
}

export default Category
