import React, { useContext, useState } from "react";
import { invokeFirestore } from "../firebase";
import { UserContext } from "../stateHandling/UserContext";
import "./styles.css";

function Modal({ setModal }) {
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  //   const [userId, setUserId] = useState(currentUser.);

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // submit post to firstore
    if (
      formData.title.trim() &&
      formData.image.trim() &&
      formData.description.trim()
    ) {
      invokeFirestore.collection("blogs").add({
        ...formData,
        author: currentUser.user.email,
      });
    }
    setModal(false);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <form onSubmit={submitHandler}>
        <input
          className="input"
          type="text"
          placeholder="Give a title..."
          name="title"
          value={formData.title}
          onChange={changeHandler}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Give an image url..."
          name="image"
          value={formData.image}
          onChange={changeHandler}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Give a description..."
          name="description"
          value={formData.description}
          onChange={changeHandler}
          required
        />
        <button className="btn" type="submit">
          Post
        </button>
        <p style={{ cursor: "pointer" }} onClick={() => setModal(false)}>
          Close Modal
        </p>
      </form>
    </div>
  );
}

export default Modal;
