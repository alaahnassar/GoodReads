import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import styles from "../../styles/userTable.module.css";
import StaticStarRating from "./StaticStarRating";

const UserTable = ({ data, updateView, loading, error }) => {
  const [userData, setData] = useState([]);
  useEffect(() => {
    setData(data);
  }, [data]);
  console.log(data)
  let handle = (event, id) => {
    console.log(id);
    console.log(event.target.value);
    updateView(event.target.value, id);
  };

  return (
    <div>
      <Table className="text-center" responsive striped bordered hover>
        <thead className="border-0">
          <tr className="border-0">
            <th>ID</th>
            <th>Name</th>
            <th>Author name</th>
            <th>Average rating</th>
            <th>Rating</th>
            <th>shevle</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>loading</td>
            </tr>
          ) : error ? (
            <tr>
              <td>{error}</td>
            </tr>
          ) : (
            userData.map((element, index) => {
              return (
                <tr key={element._id}>
                  <td>{++index}</td>
                  <td className="text-capitalize">
                    <a
                      className={styles.link}
                      href={`/user/books/${element._id}`}
                    >
                      {element.book_id?.name}
                    </a>
                  </td>
                  <td className="text-capitalize">
                    <a
                      className={styles.link}
                      href={`/user/author/${element.book_id?.author_id?._id}`}
                    >
                      {element.book_id?.author_id?.firstname +
                        " " +
                        element.book_id?.author_id?.lastname}
                    </a>
                  </td>
                  <td>
                    <StaticStarRating book={element.book_id} />
                  </td>
                  <td>
                    <StaticStarRating
                      book={element.book_id}
                      user_rate={element.rate}
                    />
                  </td>
                  {/* <td>
                    <div
                      className={styles.Stars}
                      style={{ "--rating": element.rate }}
                      aria-label="Rating of this product is 2.3 out of 5."
                    ></div>
                  </td> */}
                  <td>
                    {
                      <Form.Select
                        onChange={(event) => handle(event, element.book_id?._id)}
                      >
                        <option
                          value="read"
                          selected={element.view === "read" ? true : false}
                        >
                          read
                        </option>
                        <option
                          value="reading"
                          selected={element.view === "reading" ? true : false}
                        >
                          reading
                        </option>
                        <option
                          value="wantToRead"
                          selected={
                            element.view === "wantToRead" ? true : false
                          }
                        >
                          want to read
                        </option>
                      </Form.Select>
                    }
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
