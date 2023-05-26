
import { useMemo, useCallback, useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from "@mui/icons-material/Logout";
import axios  from "axios";
import InfoIcon from "@mui/icons-material/Info";

import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  MessageGroup,
  Message,
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

import {GlobalContext} from "../Context/context";

export const Chat = ({ user }: { user: User }) => {

  // let { state, dispatch } = useContext(GlobalContext);
  // let { state, dispatch } = useContext(GlobalContext);


   
 
  // const user_Data = useContext(GlobalContext);

  // const hellow = useContext(GlobalContext);

  // console.log(hellow.GlobalContext.token);
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [user_Token, setUserToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("user_ID"));
  const [sidebarStyle, setSidebarStyle] = useState({});
  let [channelDetails, setChannelDetails] = useState([]);
  const [chatContainerStyle, setChatContainerStyle] = useState({});
  const [messages, setMessages] = useState([]);
  const [conversationContentStyle, setConversationContentStyle] = useState({});

  const [conversationAvatarStyle, setConversationAvatarStyle] = useState({});

  const handleBackClick = () => setSidebarVisible(!sidebarVisible);

  const handleConversationClick = useCallback(() => {
    if (sidebarVisible) {
      setSidebarVisible(false);
    }
  }, [sidebarVisible, setSidebarVisible]);


  
  
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
  const getMessages = async () => {
    try {
      const response = await axios.get(
        "https://cloud1.sty-server.com/api/channel/message",
        {
          params: {
            channel_id: userId,
          },
          headers: headers,
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };
  
  const getChannels = async () => {


     try {
      let response = await axios.get(`https://cloud1.sty-server.com/api/channel-user`, headers1)
        setChannelDetails(response.data);
      console.log("response: ", response);
      
      
    } catch (error) {
      console.log("axios error: ", error);
      

    }

  }
//   const getMessages = async () => {


//     try {
//      let response = await axios.get(${`https://cloud1.sty-server.com/api/message?`, {
//       userId });
//        setMessages(response.data);
//      console.log("response: ", response);
     
     
//    } catch (error) {
//      console.log("axios error: ", error);
     

//    }

//  }


  
 
  useEffect(() => {
    getChannels();
    getMessages();

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
      <MainContainer responsive className="border-0">
        <Sidebar position="left" scrollable={true} style={sidebarStyle}>
          {/* <NavbarChat /> */}
          <div
            style={{
              //   borderBottom: "1px solid #cedbe3",
              //   paddingLeft: 15,
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
                  marginLeft: 15,
                  fontSize: 30,
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
                  Account Setting
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

          <ConversationList>
            {/* Search Input */}
            <div className="searchContainer">
              <input
                type="text"
                className="searchInput"
                placeholder="Search Channel"
              />
            </div>

            {/* Conversation List */}

            {conversations.map((c) => {
              // Helper for getting the data of the first participant
              const [avatar, name] = (() => {
                const participant =
                  c.participants.length > 0 ? c.participants[0] : undefined;

                if (participant) {
                  const user = getUser(participant.id);
                  if (user) {
                    return [<Avatar src={HashImage} />, user.username];
                  }
                }

                return [undefined, undefined];
              })();

              return (
                <Conversation
                  unreadCnt={c.unreadCounter}
                  active={activeConversation?.id === c.id}
                  onClick={handleConversationClick}
                >
                  <Conversation.Content
                    name={name}
                  
                    style={conversationContentStyle}
                    onClick={() => setActiveConversation(c.id)}
                  />
                  <Avatar src={HashImage} />
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>

        <ChatContainer style={chatContainerStyle}>
          {activeConversation && (
            <ConversationHeader>
              <ConversationHeader.Back onClick={handleBackClick} />

              <ConversationHeader.Content
                userName={currentUserName}
                // info="Active 10 mins ago"
              />
              <ConversationHeader.Actions>
                <SwipeableTemporaryDrawer />
              </ConversationHeader.Actions>
            </ConversationHeader>
          )}

          <MessageList typingIndicator={getTypingIndicator()}>
            {activeConversation &&
              currentMessages.map((g) => (
                <MessageGroup key={g.id} direction={g.direction}>
                  <MessageGroup.Messages>
                    {g.messages.map((m: ChatMessage<MessageContentType>) => (
                      <Message
                        key={m.id}
                        model={{
                          type: "html",
                          payload: m.content,
                          direction: m.direction,
                          position: "normal",
                        }}
                      />
                    ))}
                  </MessageGroup.Messages>
                </MessageGroup>
              ))}

            <Message
              // className="fn400"
              model={{
                message:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single",
              }}
            />
          </MessageList>

          {/* <MessageInput value={currentMessage} onChange={handleChange} onSend={handleSend} disabled={!activeConversation} attachButton={false} placeholder="Type here..." /> */}
        </ChatContainer>
        
      </MainContainer>
    </div>
  );
};
export default Chat;
