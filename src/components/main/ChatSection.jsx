import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Main.css";
function ChatSection() {
  const location = useLocation();
  const { from } = location.state;
  const messageRef = useRef();
  const [chats, setChats] = useState({
    send: [],
    receive: [],
  });

  useEffect(() => {
    messageRef.current.focus();
    let sender = localStorage.getItem("currentUser");
    let receiver = from.phone;
    if (JSON.parse(localStorage.getItem(receiver + sender)) !== null) {
      let custom = JSON.parse(localStorage.getItem(receiver + sender));
      console.log("useEffect", custom);
      setChats({
        send: custom.receive,
        receive: custom.send,
      });
      console.log("STATE USEFFECT", chats);
      localStorage.setItem(receiver + sender, JSON.stringify(chats));
    } else if (JSON.parse(localStorage.getItem(sender + receiver)) !== null) {
      let custom = JSON.parse(localStorage.getItem(sender + receiver));
      setChats({
        send: custom.send,
        receive: custom.receive,
      });
    } else {
      setChats({
        send: [],
        receive: [],
      });
    }
  }, [from]);
  const sendHandler = (e) => {
    e.preventDefault();
    if (messageRef.current.value === "") {
      messageRef.current.value = "";
    } else {
      let sender = localStorage.getItem("currentUser");
      let receiver = from.phone;
      if (JSON.parse(localStorage.getItem(receiver + sender)) === null) {
        setChats({
          send: [...chats.send, messageRef.current.value],
          receive: [],
        });
        localStorage.setItem(sender + receiver, JSON.stringify(chats));
      } else {
        let msg = JSON.parse(localStorage.getItem(receiver + sender));
        // setChats(JSON.parse(localStorage.getItem(receiver + sender)))
        console.log("LOCAL DATA", msg);
        let tempSend = msg.receive;
        tempSend.push(messageRef.current.value);
        console.log("receive MSG", tempSend);
        setChats({
          send: [...chats.receive, messageRef.current.value],
          receive: msg.send,
        });
        localStorage.setItem(receiver + sender, JSON.stringify(chats));
      }
    }
  };
  console.log("CHATS", chats);
  return (
    <section className="chat">
      <div className="d-flex justify-content-between contacts__login">
        <div>
          <span>
            <img className="profilePhoto" src={from.image} alt="profile" />
          </span>
          &nbsp;
          <span className="profileName ms-2">{from.name}</span>
          <div style={{ marginLeft: "3em", marginTop: "-1.2em" }}>
            <span className="text-muted ms-4">online</span>
          </div>
        </div>
        <div>
          <input
            type="text"
            className="search-click"
            placeholder="search here..."
          />
        </div>
      </div>
      <div className="chat__message"></div>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <i className="far fa-smile"></i>
        </InputGroup.Text>
        <Form.Control
          ref={messageRef}
          placeholder="Message"
          aria-label="Amount (to the nearest dollar)"
        />
        <Button onClick={sendHandler} variant="success">
          <i style={{ marginTop: "0.2em" }} className="material-icons">
            send
          </i>
        </Button>
      </InputGroup>
    </section>
  );
}

export default ChatSection;
