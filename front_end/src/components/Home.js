import React, { useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, invokeAuth, invokeFirestore } from "../firebase";
import { UserContext } from "../stateHandling/UserContext";
import Modal from "./Modal";
import "./styles.css";

export function Home() {
  const { currentUser, dispatch } = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const loginHandler = () => {
    invokeAuth
      .signInWithPopup(GoogleAuthProvider)
      .then((resp) => {
        const { displayName, email, photoURL } = resp?.user;

        const user = { userName: displayName, email: email, pic: photoURL };

        // verifying user and adding to state
        dispatch({
          type: "ADD_USER",
          payload: user,
        });

        // adding user to DB
        invokeFirestore.collection("users").onSnapshot((snapshot) => {
          if (
            snapshot.docs.filter((existingUser) => existingUser.email !== email)
              .length < 1
          ) {
            invokeFirestore.collection("users").add({
              userName: displayName,
              email: email,
            });
          }
        });
      })
      .then(() => console.log("SignIn success"))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const unmountAfterRunning = invokeFirestore
      .collection("blogs")
      .onSnapshot((snapshot) => {
        setBlogs(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
          }))
          //   snapshot.docs.filter(
          //     (doc) =>
          //       doc.data().author === currentUser?.user.email && { ...doc.data() }
          //   )
        );
      });

    return () => currentUser !== null && unmountAfterRunning();
  }, [currentUser]);

  return !currentUser ? (
    <div style={{ alignSelf: "center" }}>
      <button className="btn" onClick={loginHandler}>
        Login with Google
      </button>
    </div>
  ) : (
    <div style={{ marginTop: "1rem" }} className="mainContainer">
      <div style={{ margin: ".5rem 0" }}>
        Welcome {currentUser.user.userName}
      </div>
      <button className="btn" onClick={() => setModal(true)}>
        New Post
      </button>

      {modal && <Modal setModal={setModal} />}

      <div className="container">
        {blogs.map((blog, i) => (
          <div key={i} className="card">
            <img
              className="image"
              src={
                blog.image.includes("http")
                  ? blog.image
                  : "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              }
              alt="some-pic"
            />
            <div className="title">{blog.title}</div>
            <div className="description">
              {blog.description.length > 45
                ? blog.description.substring(0, 45) + "..."
                : blog.description}
            </div>
            <div
              style={{
                fontSize: ".6rem",
                marginTop: ".5rem",
                display: `${
                  blog.author === currentUser.user.email ? "block" : "none"
                }`,
              }}
            >
              by{" "}
              {blog.author === currentUser.user.email &&
                currentUser.user.userName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
