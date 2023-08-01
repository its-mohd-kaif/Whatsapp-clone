import React, { useEffect, useRef, useState } from "react";
import "./Form.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "../../assets/home.jpg";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import { contacts } from "../../data/Contacts";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  // const nameRef = useRef();
  const phoneRef = useRef();
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    phoneRef.current.focus();
    let allContacts = JSON.parse(localStorage.getItem("whContacts"));
    if (allContacts !== null) {
      if (allContacts.length === 4) {
        localStorage.setItem("whContacts", JSON.stringify(contacts));
      }
    } else {
      localStorage.setItem("whContacts", JSON.stringify(contacts));
    }
  }, []);
  const loginHandler = (e) => {
    e.preventDefault();
    if (phoneRef.current.value === "") {
      setMessage("Phone Number Field Can Not Be Empty !!");
      phoneRef.current.focus();
    } else if (isNaN(phoneRef.current.value) === true) {
      setMessage("Write Only Digits !!");
      phoneRef.current.focus();
    } else if (phoneRef.current.value.length !== 10) {
      setMessage("Type Your 10 Digit Mobile Number !!");
      phoneRef.current.focus();
    } else if (userAuth()) {
      setMessage("Wrong Phone Number !!");
    } else {
      setMessage("");
      localStorage.setItem("currentUser", phoneRef.current.value);
      navigate("/contacts");
    }
  };
  const userAuth = () => {
    let allContacts = JSON.parse(localStorage.getItem("whContacts"));
    let flag = true;
    // eslint-disable-next-line array-callback-return
    allContacts.map((val) => {
      if (val.phone === phoneRef.current.value) {
        flag = false;
      }
    });
    return flag;
  };
  return (
    <section className="landing">
      <div className="landing__stripe1"></div>
      <div className="landing__stripe2">
        <Card className="landing__card">
          <Card.Img variant="top" src={img} alt="logo" />
          <Card.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text style={{ width: "70px" }} id="basic-addon1">
                +91
              </InputGroup.Text>
              <Form.Control
                placeholder="Phone Number"
                aria-label="Username"
                aria-describedby="basic-addon1"
                ref={phoneRef}
              />
            </InputGroup>
          </Card.Body>
          <div className="d-grid">
            <Button
              onClick={loginHandler}
              className="loginBtn"
              variant="primary"
              size="lg"
            >
              Login
            </Button>
          </div>
          <center>
            <Link to={"/signup"}>
              <Button className="mt-2" variant="link">
                New User ? Create Account
              </Button>
            </Link>
          </center>

          <br></br>
          {message !== "" ? (
            <Alert onClose={() => setMessage("")} variant="danger" dismissible>
              <p>{message}</p>
            </Alert>
          ) : null}
        </Card>
      </div>
    </section>
  );
}

export default Login;
