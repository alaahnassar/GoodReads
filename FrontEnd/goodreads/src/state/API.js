import { json } from "react-router-dom";

export const fetchData = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

export const addData = async (url, token, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

//delete book with id as body requset
export const deleteBook = async (url, data, token) => {
  console.log(data);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data }),
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (url, token, data) => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
};
