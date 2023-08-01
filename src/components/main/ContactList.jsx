import React, { useEffect, useState } from "react";
import "./Main.css";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Outlet, useNavigate } from "react-router-dom";
import kebab from "../../assets/Kebab-menu-ui-icon-1.svg.png";
function ContactList() {
  const [login, setLogin] = useState({
    name: "",
    number: "",
    image: "",
  });
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    let currentUser = localStorage.getItem("currentUser");
    let allContacts = JSON.parse(localStorage.getItem("whContacts"));
    let tempArr = [];
    tempArr = allContacts.filter((val) => val.phone !== currentUser);
    setUsers(tempArr);
    // eslint-disable-next-line array-callback-return
    allContacts.map((val) => {
      if (val.phone === currentUser) {
        setLogin({
          name: val.name,
          phone: val.number,
          image: val.image,
        });
      }
    });
  }, []);
  const searchHandler = (e) => {
    let allContacts = JSON.parse(localStorage.getItem("whContacts"));
    let currentUser = localStorage.getItem("currentUser");
    let tempArr = [];
    if (e.target.value.length >= 2) {
      // eslint-disable-next-line array-callback-return
      allContacts.map((val) => {
        if (val.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          tempArr.push(val);
        }
      });
      setUsers(tempArr);
    } else if (e.target.value.length === 0) {
      tempArr = allContacts.filter((val) => val.phone !== currentUser);
      setUsers(tempArr);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  return (
    <section className="contacts">
      <div className="contacts__stripe1"></div>
      <div className="contacts__stripe2">
        <div className="contacts__main">
          <div className="d-flex justify-content-between contacts__login">
            <div>
              <span>
                <img className="profilePhoto" src={login.image} alt="profile" />
              </span>
              &nbsp;
              <span className="profileName ms-2">{login.name}</span>
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  className="kebabBtn dropdown-toggle"
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  <img style={{ width: "1.5em" }} src={kebab} alt="kebab-btn" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => navigate("/signup")}
                    href="#/action-1"
                  >
                    <i className="fas fa-address-book"></i>&nbsp;Add
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <InputGroup style={{ height: "45px" }}>
            <InputGroup.Text style={{ background: "white" }} id="basic-addon1">
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="search or start new chat"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={searchHandler}
            />
          </InputGroup>
          <div className="contacts__list">
            {users.length !== 0 ? (
              <ListGroup>
                {users.map((val, index) => (
                  <Link
                    key={index}
                    state={{ from: val }}
                    to={"/contacts/chat"}
                    style={{ textDecoration: "none" }}
                  >
                    <ListGroup.Item>
                      <div>
                        <span>
                          <img
                            className="profilePhoto"
                            src={val.image}
                            alt="profile"
                          />
                        </span>
                        &nbsp;
                        <span className="profileName ms-2">{val.name}</span>
                      </div>
                    </ListGroup.Item>
                  </Link>
                ))}
              </ListGroup>
            ) : (
              <>
                <br></br>
                <center>
                  <span>No Contacts</span>
                </center>
              </>
            )}
          </div>
        </div>
        <div className="chatDiv">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default ContactList;
