import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "../../assets/home.jpg";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/default.png";
function Signup() {
  const nameRef = useRef();
  const phoneRef = useRef();
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  const signupHandler = (e) => {
    e.preventDefault();
    if (nameRef.current.value === "") {
      setMessage("Name Field Can Not Be Empty");
      nameRef.current.focus();
    } else if (phoneRef.current.value === "") {
      setMessage("Phone Number Field Can Not Be Empty !!");
      phoneRef.current.focus();
    } else if (isNaN(phoneRef.current.value) === true) {
      setMessage("Write Only Digits !!");
      phoneRef.current.focus();
    } else if (phoneRef.current.value.length !== 10) {
      setMessage("Type Your 10 Digit Mobile Number !!");
      phoneRef.current.focus();
    } else if (checkDuplicate()) {
      setMessage("User Aleady Exist Try New Phone Number !!");
    } else {
      setMessage("");
      let obj = {
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        image: profile,
      };
      let tempArr = JSON.parse(localStorage.getItem("whContacts"));
      tempArr.push(obj);
      localStorage.setItem("whContacts", JSON.stringify(tempArr));
      navigate("/");
    }
  };
  const checkDuplicate = () => {
    let allContacts = JSON.parse(localStorage.getItem("whContacts"));
    let flag = false;
    // eslint-disable-next-line array-callback-return
    allContacts.map((val) => {
      if (val.phone === phoneRef.current.value) {
        flag = true;
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
                Name
              </InputGroup.Text>
              <Form.Control
                placeholder="Your Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                ref={nameRef}
              />
            </InputGroup>
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
              onClick={signupHandler}
              className="loginBtn"
              variant="primary"
              size="lg"
            >
              Create Account
            </Button>
          </div>
          <center>
            <Link to={"/"}>
              <Button className="mt-2" variant="link">
                Already have a account ?
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

export default Signup;
