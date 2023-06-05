// import axios from "axios";
// import { useEffect, useState, useContext } from 'react';
// import { GlobalContext } from '../Context/context';

// import { useParams } from "react-router-dom";

// function ChatScreen() {
//     const [user_Token, setUserToken] = useState(localStorage.getItem("token"));
//     const [messages, setMessages] = useState([]);
//     let { state, dispatch } = useContext(GlobalContext);
//     const { id } = useParams();
//     const headers = {
//         headers: {
//           Authorization: `Bearer ${user_Token}`,
//         },
//       };

//     console.log('this is param')
//     console.log(id)

//     const getMessages = async (e) =>{
//         if (e) e.preventDefault();
//         try{
//             const response = await axios.get(`https://cloud1.sty-server.com/api/m/${id}`,
//             headers

//             )
//             console.log("response : ", response);
//             setMessages(response.data)
//           console.log(messages)

//         }

//             catch (error) {
//               console.log("error in getting users", error);

//           }

//       }

//     useEffect(() => {

//         getMessages();

//       }, [])
//     // https://cloud1.sty-server.com/api/m/44
//     return (
//         <>
//         {messages.map((message) => (
//           <div key={message.id}>{message.content}</div>
//         ))}
//       </>
//     );
// }

// export default ChatScreen;

import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/context";
import { useParams } from "react-router-dom";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
function ChatScreen() {
  const [user_Token, setUserToken] = useState(localStorage.getItem("token"));
  const [messages, setMessages] = useState(null);

  const { state, dispatch } = useContext(GlobalContext);
  const [decrypt, setDecrypt] = useState("");
  const { id } = useParams();
  const headers = {
    headers: {
      Authorization: `Bearer ${user_Token}`,
    },
  };

  // const encryptId = (id) => {
  //     const encryptedId = CryptoJS.AES.encrypt(id.toString(), "secretKey").toString();
  //     return encryptedId;
  //   };

  const decryptId = (encryptedId) => {
    try {
      const decryptedBytes = AES.decrypt(encryptedId, "HelloIamAwias");
      const decryptedId = decryptedBytes.toString(CryptoJS.enc.Utf8);
      return decryptedId;
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
        `https://cloud1.sty-server.com/api/m/${decryptedId}`,
        headers
      );
      console.log("response:", response.data);
      temp.push(response?.data);
      console.log("temp", temp);
      setMessages(temp);
    } catch (error) {
      console.log("error in getting users", error);
    }
  };

  useEffect(() => {
    // setDecrypt(decryptId());

    getMessages();
  }, []);

  return (
    <>
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message) => (
          // <div key={message.id}>{message.content}</div>
          <div
            key={message.id}
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        ))
      ) : (
        <div>No messages available</div>
      )}
    </>
  );
}

export default ChatScreen;
