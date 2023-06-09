import "./chatscreen.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/context";
import { useParams } from "react-router-dom";
// import { AES } from "crypto-js";
import Loader from "../assets/Rolling-1s-200px.gif";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import usePagination from "@mui/material/usePagination/usePagination";

import { AES, enc } from "crypto-js";

function ChatScreen() {
  const [user_Token, setUserToken] = useState(localStorage.getItem("token"));
  const [messages, setMessages] = useState(null);
  let { state, dispatch } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [decrypt, setDecrypt] = useState("");
  const { id } = useParams();
  const headers = {
    headers: {
      Authorization: `Bearer ${user_Token}`,
    },
  };

  const decryptId = (encryptedId) => {
    try {
      // const decryptedBytes = AES.decrypt(encryptedId, "HelloIamAwias");
      // const decryptedId = decryptedBytes.toString(CryptoJS.enc.Utf8);

      // console.log(parseInt(decryptedId));
      // console.log(JSON.parse(decryptedId));

      // return JSON.parse(decryptedId);

      const decrypted = AES.decrypt(
        enc.Hex.parse(encryptedId).toString(enc.Utf8),
        "secret passphrase"
      ).toString(enc.Utf8);
      return decrypted;
    } catch (error) {
      console.log("Error in decryption:", error);
      return null; // or handle the error as per your requirements
    }
  };

  const getMessages = async () => {
    const temp = [];
    try {
      const decryptedId = decryptId(id);
      const response = await axios.get(
        `${state.baseUrl}api/m/${decryptedId}`,
        headers
      );
      // console.log("response:", response.data);
      temp.push(response?.data);
      // console.log("temp", temp); 
      setMessages(temp);
      return;
    } catch (error) {
      console.log("error in getting users", error);
    }
  };

  // useEffect(() => {
  //   console.log('Hello WOrld');

  //   getMessages();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMessages();
      } catch (error) {
        console.log("Error in getting messages:", error);
      }
    };

    if (user_Token) {
      fetchData();
    } else {
      navigate("/");
    }
  }, [user_Token, navigate]);

  return (
    <>
      <Link to={`/`}>
        <ArrowBackIcon className="back" />
      </Link>
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message) => (
          // <div key={message.id}>{message.content}</div>
          <div
            key={message.id}
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <img width={100} src={Loader} alt="loading" />
        </div>
      )}
    </>
  );
}

export default ChatScreen;
