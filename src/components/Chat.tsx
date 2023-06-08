import "./chat.css";
import React from "react";
import { Link, useMatch  } from "react-router-dom";
import Loader from "../assets/Rolling-1s-200px.gif";
import moment from "moment";
import welcome from "../assets/welcome.svg";
import { useMemo, useCallback, useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

// const bcrypt = require("bcryptjs");
// import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { AES } from "crypto-js";
import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
  Search,
  ChatContainer,
  ConversationHeader,
  MessageGroup,
  Message,
  MessageSeparator,
  MessageList,
  MessageInput,
  TypingIndicator,
  InfoButton,
  VideoCallButton,
  VoiceCallButton,
  StarButton,
} from "@chatscope/chat-ui-kit-react";
import HashImage from "../assets/hashtag.png";

import {
  useChat,
  ChatMessage,
  MessageContentType,
  MessageDirection,
  MessageStatus,
} from "@chatscope/use-chat";

import { MessageContent, TextContent, User } from "@chatscope/use-chat";

import { Button, Navbar } from "react-bootstrap";

import NavbarChat from "./Navbar";

import SwipeableTemporaryDrawer from "./buttonSlider/SliderBtn";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../Context/context";
import { message } from "antd";
import { Console, log } from "console";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export const Chat = ({ user }: { user: User }) => {
  // let { state, dispatch } = useContext(GlobalContext);
  // let { state, dispatch } = useContext(GlobalContext);

  let previousDate: any = null;
  // const encryptId = (id :any) => {
  //   const salt = bcrypt.genSaltSync(10);
  //   const encryptedId = bcrypt.hashSync(id.toString(), salt);
  //   return encryptedId;
  // };

  // const user_Data = useContext(GlobalContext);

  // const hellow = useContext(GlobalContext);

  // console.log(hellow.GlobalContext.token);
  const navigate = useNavigate();

  const [isScrollbarActive, setIsScrollbarActive] = useState(false);
  // const [isLiked, setIsLiked] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChannels, setFilteredChannels] = useState([]);

  const [notificationState, setNotificationState] = useState(() => {
    const storedState = localStorage.getItem("notificationState");
    return storedState ? JSON.parse(storedState) : {};
  });
  const [notificationResponse, setNotificationResponse] = useState({});

  
  const [notification, setNotification] = useState("enable");
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const [user_Token, setUserToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("user_ID"));
  const [sidebarStyle, setSidebarStyle] = useState({});
 
  let [userChannel, setUserChannel] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [messages, setMessages] = useState<any>([]);
  const [name, setName] = useState(null);
  const [activeName, setActiveName] = useState("");
  const [notificationChannelId, setNotificationChannelId] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationContentStyle, setConversationContentStyle] = useState({});

  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});
  const [activeChannel, setActiveChannel] = useState(null);
  const handleBackClick = () => setSidebarVisible(!sidebarVisible);
  const [selectedChats, setSelectedChats] = useState(false);
  let { state, dispatch } = useContext<any>(GlobalContext);
  const [activeConvo, setActiveConvo] = useState(null);
  // const handleConversationClick = useCallback((channelID) => {

  //   if (sidebarVisible) {
  //     setSidebarVisible(false);
  //   }
  //     //  setChannelId(channelID)
  // }, [sidebarVisible, setSidebarVisible]);
  const match = useMatch('/m/:id');
  const encryptId =  (id: any) => {
    const encryptedId =  CryptoJS.AES.encrypt(
      id.toString(),
      "HelloIamAwias"
    ).toString();
   
    return encryptedId;
  };
  // const openLink = async (id: any) => {
  //   // alert("me click");

  //   console.log('id received ==>> ', id);
  //   // alert(encryptId(id));
    
  //   const encryptedId = CryptoJS.AES.encrypt(
  //     id.toString(),
  //     "HelloIamAwias"
  //     ).toString();
      
  //     navigate(`/m/${(encryptedId)}`)

  // };

  const headers = {
    Authorization: `Bearer ${user_Token}`,
    Accept: "application/json",
    "Content-Length": "0",
    "User-Agent": "Your User Agent",
    "Content-Encoding": "gzip",
  };
  const headers1 = {
    headers: {
      Authorization: `Bearer ${user_Token}`,
    },
  };
  // console.log("notoddi", notification )

  // const data = {
  //   channel_id: notificationChannelId,
  //   setting: notification,
  // };

  const handleConversationClick = useCallback(
    async (channelId) => {
      setActiveConvo(channelId);
      setIsScrollbarActive(true);
      console.log("dddd");

      setSelectedChats(true);
      setLoading(true);
      setNotificationChannelId(channelId);
      try {
        if (sidebarVisible) {
          setSidebarVisible(false);
        }

        // const response = await axios.get(`https://cloud1.sty-server.com/api/channel/message/${channelId}`,
        const response = await axios.get(
          `${state.baseUrl}api/channel/message/${channelId}`,

          {
            // params: {
            //   channel_id: channelId,
            // },
            headers: headers,
          }
        );
        setMessages(response.data.data);
        console.log("response ", response);
        console.log("response message", messages);

        // Process the response as needed
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
      setLoading(false);
    },
    [sidebarVisible, setSidebarVisible]
  );

  // const handleLikeClick = () => {

  //   const updatedState = !isBellEnabled;
  //   setIsBellEnabled(updatedState);
  //   localStorage.setItem('bellState', JSON.stringify(updatedState));
  //   if(notification== "disable"){
  //     setNotification("enable")
  //   }
  //   else  setNotification("disable")
  //   console.log("notoi", notification )

  //   sendNotification()
  // };


  const handleLikeClick = async (channelId: any) => {
    const updatedState = { ...notificationState };
    const enable = !updatedState[channelId]; // Toggle the notification setting
  
    // Send the notification setting to the server
    await sendNotification(channelId, enable);
  
    // Update the local notification state based on the response
    updatedState[channelId] = enable;
    setNotificationState(updatedState);
    localStorage.setItem("notificationState", JSON.stringify(updatedState));
  };

  const sendNotification = async (channelId: any, enable: any) => {
    try {
      const response = await axios.put(
        `${state.baseUrl}api/notification/setting`,
        {
          channel_id: channelId,
          setting: enable ? "enable" : "disable",
        },
        {
          headers: {
            Authorization: `Bearer ${user_Token}`,
          },
        }
      );
      // Handle the response as needed
    } catch (error) {
      console.log("Error sending notification:", error);
    }
  };

  // const handleLikeClick = async (channelId: any) => {
  //   const updatedState = { ...notificationState };
  //   updatedState[channelId] = !updatedState[channelId];
  //   setNotificationState(updatedState);
  //   localStorage.setItem("notificationState", JSON.stringify(updatedState));
  //   sendNotification(channelId, updatedState[channelId]);
  // };
  // const sendNotification = async (channelId: any, enable: any) => {
  //   try {
  //     const response = await axios.put(
  //       // "https://cloud1.sty-server.com/api/notification/setting",
  //       `${state.baseUrl}api/notification/setting`,
  //       {
  //         channel_id: channelId,
  //         setting: enable ? "enable" : "disable",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user_Token}`,
  //         },
  //       }
  //     );
  //     // if (response?.data?.status === 200) {
  //     //   if (window.ReactNativeWebView) {
  //     //     window.ReactNativeWebView.postMessage(enable);
  //     //   }
  //     // }
  //     // Handle the response as needed
      
  //   } catch (error) {
  //     console.log("Error sending notification:", error);
  //   }
  // };


  const getChannels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${state.baseUrl}api/channel-user`,
        headers1
      );

      const channels = response?.data?.data;
      setUserChannel(channels);

      // Check notification state for each channel and update local state
      const updatedState = { ...notificationState };
      channels.forEach((channel :any) => {
        const channelId = channel.channel_id;
        const isNotificationEnabled = channel.notification === "enable";
        updatedState[channelId] = isNotificationEnabled;
      });
      setNotificationState(updatedState);
      localStorage.setItem("notificationState", JSON.stringify(updatedState));
    } catch (error) {
      console.log("axios error: ", error);
    }
    setLoading(false);
  };

  // const getChannels = async () => {
  //   setLoading(true);
  //   try {
  //     let response = await axios.get(
  //       // `https://cloud1.sty-server.com/api/channel-user`,
  //       `${state.baseUrl}api/channel-user`,
  //       headers1
  //     );

  //     setUserChannel(response?.data?.data);
    
  //     //  setActiveName(response?.data?.data.channel_details[0].name)
   
  //     console.log("channel ids ", response.data.data);
  //   } catch (error) {
  //     console.log("axios error: ", error);
  //   }
  //   setLoading(false);
  // };

  // let  element = document.querySelector('#addClass');

  // // Step 2: Attach an event listener
  // element.addEventListener('click', function() {
  //   // Step 3: Add the class
  //   element.classList.add('ps--active-x');
  // });

  // const sendNotification = async () => {
  //   try {
  //     const response = await axios.put(
  //       "https://cloud1.sty-server.com/api/notification/setting",

  //       data, headers1
  //         // params: {
  //         //     channel_id: notificationChannelId,
  //         //      setting: notification
  //         // },
  //         // headers: {
  //         //   Authorization: `Bearer ${user_Token}`,
  //         // }

  //     );

  //   } catch (error) {
  //     console.log("Error fetching messages:", error);
  //   }
  // };

  // useEffect(() => {
  //   if(activeName){
  //     console.log("Name Activated" , activeName)
  //   }

  // }, [activeName]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (activeConvo) {
  //       handleConversationClick(activeConvo);
  //     }
  //   }, 10000); 
  
  //   return () => {
  //     clearInterval(interval); 
  //   };
  // }, [activeConvo, handleConversationClick]);
  useEffect(() => {
    let isNewMessage = false; // Flag to track new messages
  
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${state.baseUrl}api/channel/message/${activeConvo}`,
          { headers }
        );
  
        if (response.data.data.length > messages.length) {
          // New message(s) received
          isNewMessage = true;
          setMessages(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };
  
    const interval = setInterval(() => {
      if (activeConvo) {
        fetchData();
      }
    }, 5000); // Call the function every 10 seconds (10000 milliseconds)
  
    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [activeConvo, messages.length, state.baseUrl, headers]);
  
  useEffect(() => {
    console.log("user channel details: ", userChannel);
    console.log("user message details: ", messages);
  }, [userChannel, messages]);

  const MessageTime = ({ time }: any) => {
    return <span className="message-time">{time}</span>;
  };
  useEffect(() => {
    getChannels();
    // handleConversationClick()
   

    if (sidebarVisible) {
      setSidebarStyle({
        display: "flex",
        flexBasis: "auto",
        width: "320px",
        maxWidth: "100%",
      });
      setConversationContentStyle({
        display: "flex",
      });
      setConversationAvatarStyle({
        marginRight: "1em",
      });
      setChatContainerStyle({
        display: "none",
      });
    } else {
      setSidebarStyle({});
      setConversationContentStyle({});
      setConversationAvatarStyle({});
      setChatContainerStyle({});
    }
  }, [
    sidebarVisible,
    setSidebarVisible,
    setConversationContentStyle,
    setConversationAvatarStyle,
    setSidebarStyle,
    setChatContainerStyle,
  ]);

  // Get all chat related values and methods from useChat hook
  const {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
    currentMessage,
    setCurrentMessage,
    sendTyping,
    setCurrentUser,
  } = useChat();

  useEffect(() => {
    setCurrentUser(user);
  }, [user, setCurrentUser]);

  // Get current user data
  const [currentUserAvatar, currentUserName] = useMemo(() => {
    if (activeConversation) {
      const participant =
        activeConversation.participants.length > 0
          ? activeConversation.participants[0]
          : undefined;

      if (participant) {
        const user = getUser(participant.id);

        if (user) {
          console.log("user", user);
          return [<Avatar src={user.avatar} />, user.username];
        }
      }
    }

    return [undefined, undefined];
  }, [activeConversation, getUser]);

  const handleChange = (value: string) => {
    setCurrentMessage(value);
    if (activeConversation) {
      sendTyping({
        conversationId: activeConversation?.id,
        isTyping: true,
        userId: user.id,
        content: value,
        throttle: true,
      });
    }
  };

  // const handleSend = (text: string) => {
  //   const message = new ChatMessage({
  //     id: "" , // Id will be generated by storage generator, so here you can pass an empty string
  //     content: text as unknown as MessageContent<TextContent>,
  //     contentType: MessageContentType.TextHtml,
  //     senderId: user.id,
  //     direction: MessageDirection.Outgoing,
  //     status: MessageStatus.Sent
  //   });
  const handleSend = (text: string) => {
    const message = new ChatMessage({
      id: "", // Id will be generated by storage generator, so here you can pass an empty string
      content: text as unknown as MessageContent<TextContent>,
      contentType: MessageContentType.TextHtml,
      senderId: user.id,
      direction: MessageDirection.Outgoing,
      status: MessageStatus.Sent,
    });

    if (activeConversation) {
      sendMessage({
        message,
        conversationId: activeConversation.id,
        senderId: user.id,
      });
    }
  };

  const getTypingIndicator = useCallback(() => {
    if (activeConversation) {
      const typingUsers = activeConversation.typingUsers;

      if (typingUsers.length > 0) {
        const typingUserId = typingUsers.items[0].userId;

        // Check if typing user participates in the conversation
        if (activeConversation.participantExists(typingUserId)) {
          const typingUser = getUser(typingUserId);

          if (typingUser) {
            return (
              <TypingIndicator content={`${typingUser.username} is typing`} />
            );
          }
        }
      }
    }

    return undefined;
  }, [activeConversation, getUser]);

  const logout = () => {
    // dispatch({
    //   type: 'USER_LOGOUT',

    // })
    dispatch({
      type: "USER_LOGOUT",
    });
    localStorage.clear();
    navigate("/login");
  };

  const AccountSetting = () => {
    navigate("/account-setting");
  };

  const helloworld = () => {
    console.log("abc");
  };

  return (
    <div
      style={{
        height: "750px",
        position: "relative",
      }}
    >
      <MainContainer responsive className="border-0  main-container">
        <Sidebar
          position="left"
          scrollable={true}
          style={sidebarStyle}
          id="side-bar"
          className={`scrollbar-container cs-sidebar cs-sidebar--left sidebar ps ${
            isScrollbarActive ? "ps--active-x" : "sidebar"
          }`}
        >
          {/* <NavbarChat /> */}
          <div
            style={{
              borderBottom: "1px solid #cedbe3",

              paddingLeft: 15,
              paddingRight: 10,
              height: 74,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginLeft: 30,
                  fontSize: 25,
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                }}
              >
                Channels
              </div>
            </div>
            <div className="dropdown">
              <MoreHorizIcon
                className="dropdown-toggle h-dropdown"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                color="primary"
              />

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li className="dropdown-item" onClick={AccountSetting}>
                  <Link to={`/account-setting`} className="account-setting">
                    Account Setting
                  </Link>
                </li>
                <li
                  className="dropdown-item"
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                  onClick={logout}
                >
                  Logout
                  {/* <LogoutIcon /> */}
                </li>
              </ul>
            </div>
          </div>

          {/* side bar */}

          <ConversationList className="conversationList">
            {/* Search Input */}
            <div className="searchContainer">
              <Search
                className="searchInput"
                placeholder="Search Channels..."
                value={searchQuery}
                onChange={(value: any) => setSearchQuery(value)}
              />
            </div>

            {userChannel
              .filter((c: any) =>
                c.channel_details[0].name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((c: any) => {
                const participant =
                  c.channel_details.length > 0
                    ? c.channel_details[0]
                    : undefined;

                return (
                  <Conversation
                    className={
                      activeConvo === c.channel_id ? "active" : "conversations"
                    }
                    key={c.id} // Add a unique key prop for each conversation
                    unreadCnt={c.unreadCounter}
                    // active={activeConversation?.id === c.id}
                    onClick={() => {
                      handleConversationClick(c.channel_id);
                      setActiveName(c.channel_details[0].name);
                    }}
                  >
                    <Conversation.Content
                      className="conversationsContent"
                      name={c.channel_details[0].name}
                      //  name={'name'}
                      style={conversationContentStyle}
                      onClick={() => {
                        setActiveConversation(c.id);
                        setActiveName(c.channel_details[0].name);
                      }}
                    />
                    <Avatar
                      src={HashImage}
                      onClick={() => {
                        setActiveConversation(c.id);
                        setActiveName(c.channel_details[0].name);
                      }}
                    />
                  </Conversation>
                );
              })}
          </ConversationList>
        </Sidebar>

        {/* messages List */}

        {loading && (
          <div className="loader">
            <img height={50} src={Loader} alt="loading" />
          </div>
        )}

        {!loading && (
          <ChatContainer style={chatContainerStyle} className="chat-container">
            <ConversationHeader>
              <ConversationHeader.Back onClick={handleBackClick} />

              <ConversationHeader.Content
                className="activeName"
                userName={activeName}
                // info="Active 10 mins ago"
              />

              <ConversationHeader.Actions>
               
                <div onClick={() => handleLikeClick(notificationChannelId)}>
               
                  {notificationState[notificationChannelId] ? (
                    <NotificationsActiveOutlinedIcon color="primary" />
                    ) : (
                      
                      <NotificationsOffIcon color="primary" />
                  )}
                </div>
              </ConversationHeader.Actions>
            </ConversationHeader>
           

            <MessageList className="messagesList">
              {messages.map((g: any, index: number) => {
                const currentDate = moment(g.created_at).format("D/M/YY");
                const previousDate =
                  index > 0
                    ? moment(messages[index - 1].created_at).format("D/M/YY")
                    : null;
                const showDateSeparator = currentDate !== previousDate;

                return (
                  <React.Fragment key={g.id}>
                    {showDateSeparator && (
                      <MessageSeparator className="date-separator">
                        {currentDate}
                      </MessageSeparator>
                    )}

                    {/* <Message
                      className="messages"
                      model={{
            

                        direction: "incoming",
                        position: "single",
                      }}
                    >
            
   

                      {g.content_type === "html" ? (
                        <Message.HtmlContent
                          html={`<a href="/m/${encryptId(g.id)}">${
                            g.link  
                          }<a><br><span class="message-time">${moment(
                            g.created_at
                          ).format("hh:mm A")}</span>`}
                        ></Message.HtmlContent>
                      ) : (
                        <Message.HtmlContent
                        html={`${g.content}
                          
                        <a><br><span class="message-time">${moment(
                          g.created_at
                        ).format("hh:mm A")}</span>`}
                      ></Message.HtmlContent>

                      )}
                    </Message> */}
                    <Message
                      className="messages"
                      // onClick={() => openLink(g.id)}
                      model={{
                        direction: "incoming",
                        position: "single",
                      }}
                    >
                      {/* <span onClick={() => openLink(g.id)}> */}

                      {g.content_type === "html" ? (

           

                  <Message.HtmlContent  
                    html={`<a href="/m/${encryptId(g.id)}">
      ${`${state.localURI}/m/${encryptId(g.id)}`}</a> <span class="message-time">
      ${moment(g.created_at).format("hh:mm A")}
      </span>`}
    ></Message.HtmlContent>
  
                   )
                      : (
                        <Message.HtmlContent
                          html={`${g.content}<span class="message-time">
      ${moment(g.created_at).format("hh:mm A")}</span>`}
                        ></Message.HtmlContent>
                      )}
                    </Message>
                  </React.Fragment>
                );
              })}
            </MessageList>

            {/* <MessageInput value={currentMessage} onChange={handleChange} onSend={handleSend} disabled={!activeConversation} attachButton={false} placeholder="Type here..." /> */}
          </ChatContainer>
        )}
      </MainContainer>
    </div>
  );
};
export default Chat;
