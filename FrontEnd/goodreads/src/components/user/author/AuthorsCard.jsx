import React from "react";
import { useNavigate } from "react-router-dom";
const AuthorsCard = ({ author }) => {
  const navigate = useNavigate();
  const navigateToPage = (event) => {
    navigate(`/user/author/${author._id}`);
  };

  const blob = new Blob([Int8Array.from(author.image.data.data)], { type: author.image.contentType });
  const image = window.URL.createObjectURL(blob);

  return (
    <article
      className="book"
      style={{ cursor: "pointer" }}
      onClick={navigateToPage}
    >
      <img src={image} style={{ width: "100%", height: "300px" }} />
      <h2 className="text-capitalize">
        {author.firstname + " " + author.lastname}{" "}
      </h2>
    </article>
  );
};

export default AuthorsCard;
