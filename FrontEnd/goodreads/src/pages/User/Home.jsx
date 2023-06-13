import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateViewBook } from "../../state/userSlice";
import UserTable from "../../components/user/UserTable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Styles from "../../styles/userTable.module.css";
import jwtDecode from "jwt-decode";

const Home = () => {
  const sessionToken = sessionStorage.getItem("token");
  const decoded = sessionToken ? jwtDecode(sessionToken) : null;
  const user_id = decoded?.id;

  const dispatch = useDispatch();
  const { records, loading, error, viewStatus } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    filter();
  }, [dispatch, viewStatus]);

  let filter = (viewBook = "all") => {
    let view = viewBook;
    dispatch(
      fetchUser({
        id: user_id,
        view: view,
        token: decoded,
      })
    );
  };

  let updateView = (view, id) => {
    dispatch(
      updateViewBook({
        id: user_id,
        book_id: id,
        view: view,
        token: decoded,
      })
    );
  };

  return (
    <Container
      className={`${Styles.shadow}`}
      style={{ backgroundColor: "white" }}
    >
      <Row>
        <Col md={12}>
          <Row>
            <Col md={3}>
              <Button
                className="w-100"
                style={{ backgroundColor: "#261c15", borderColor: "#261c15" }}
                onClick={(event) => {
                  filter(event.target.value);
                }}
                value="all"
              >
                All
              </Button>
            </Col>
            <Col md={3}>
              <Button
                className="w-100"
                style={{ backgroundColor: "#261c15", borderColor: "#261c15" }}
                onClick={(event) => {
                  filter(event.target.value);
                }}
                value="read"
              >
                Read
              </Button>
            </Col>
            <Col md={3}>
              <Button
                className="w-100"
                style={{ backgroundColor: "#261c15", borderColor: "#261c15" }}
                onClick={(event) => {
                  filter(event.target.value);
                }}
                value="reading"
              >
                Currently reading
              </Button>
            </Col>
            <Col md={3}>
              <Button
                className="w-100"
                style={{ backgroundColor: "#261c15", borderColor: "#261c15" }}
                onClick={(event) => {
                  filter(event.target.value);
                }}
                value="wantToRead"
              >
                Want to read
              </Button>
            </Col>
          </Row>
        </Col>

        <Col className={`mt-4 ${Styles.bg}`}>
          <UserTable
            md={12}
            data={records}
            updateView={updateView}
            loading={loading}
            error={error}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
