import './chat.css'
import React from 'react';
import { Link } from "react-router-dom";
import Loader from '../assets/Rolling-1s-200px.gif'
import moment from 'moment';
import welcome from '../assets/welcome.svg'
import { useMemo, useCallback, useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

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
import { message } from 'antd';
import { Console, log } from 'console';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const Chat = ({ user }: { user: User }) => {

  // let { state, dispatch } = useContext(GlobalContext);
  // let { state, dispatch } = useContext(GlobalContext);

  let previousDate:any = null;


  // const user_Data = useContext(GlobalContext);

  // const hellow = useContext(GlobalContext);

  // console.log(hellow.GlobalContext.token);
  const navigate = useNavigate();

  const [isScrollbarActive, setIsScrollbarActive] = useState(false);
  // const [isLiked, setIsLiked] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChannels, setFilteredChannels] = useState([]);


  const [notificationState, setNotificationState] = useState(() => {
    const storedState = localStorage.getItem('notificationState');
    return storedState ? JSON.parse(storedState) : {};
  });

  // const [previousDate, setPreviousDate] = useState<any>(null);
   const [notification, setNotification] = useState("disable");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  
  const [user_Token, setUserToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("user_ID"));
  const [sidebarStyle, setSidebarStyle] = useState({});
  // let [channelDetails, setChannelDetails] = useState([]);
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
  // const handleConversationClick = useCallback((channelID) => {
  
   
  //   if (sidebarVisible) {
  //     setSidebarVisible(false);
  //   }
  //     //  setChannelId(channelID)
  // }, [sidebarVisible, setSidebarVisible]);
  

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
 
  const data = {
    channel_id: notificationChannelId,
    setting: notification
  }
  
  const handleConversationClick = useCallback(async (channelId) => {
    setIsScrollbarActive(true)
    console.log('dddd');
    
    setSelectedChats(true)
    setLoading(true);
    setNotificationChannelId(channelId)
    try {
      if (sidebarVisible) {
        setSidebarVisible(false);
      }
    
      const response = await axios.get("https://cloud1.sty-server.com/api/channel/message",
         {
                params: {
                  channel_id: channelId,
                },
                headers: headers,
              }
      );
      setMessages(response.data.data);
          console.log("response message", messages)
          
          
    
      // Process the response as needed
  
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
    setLoading(false);
  }, [sidebarVisible, setSidebarVisible]);
  

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


  
  const handleLikeClick = async (channelId :any) => {
    const updatedState = { ...notificationState };
    updatedState[channelId] = !updatedState[channelId];
    setNotificationState(updatedState);
    localStorage.setItem('notificationState', JSON.stringify(updatedState));
    sendNotification(channelId, updatedState[channelId]);
  };
  const sendNotification = async (channelId :any, enable :any) => {
    try {
      const response = await axios.put(
        'https://cloud1.sty-server.com/api/notification/setting',
        {
          channel_id: channelId,
          setting: enable ? 'enable' : 'disable'
        },
        {
          headers: {
            Authorization: `Bearer ${user_Token}`
          }
        }
      );

      // Handle the response as needed
    } catch (error) {
      console.log('Error sending notification:', error);
    }
  };
  const getChannels = async () => {

    setLoading(true);
    try {
      let response = await axios.get(`https://cloud1.sty-server.com/api/channel-user`, headers1)

      setUserChannel(response?.data?.data)
      //  setActiveName(response?.data?.data.channel_details[0].name)
      
            console.log("channel ids ", response?.data?.data?.channel_details[0].id);


    } catch (error) {
      console.log("axios error: ", error);


    }
    setLoading(false);

  }

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



  useEffect(() => {
    console.log("user channel details: ", userChannel);
    console.log("user message details: ", messages);
  }, [userChannel, messages]);

  const MessageTime = ({ time }:any) => {
    return <span className="message-time">{time}</span>;
  };
  useEffect(() => {
    getChannels();
    // getMessages();

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
          console.log("user", user)
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
      type: 'USER_LOGOUT',
     
  
  })
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
        <Sidebar position="left" scrollable={true} style={sidebarStyle} id='side-bar' className={`scrollbar-container cs-sidebar cs-sidebar--left sidebar ps ${isScrollbarActive ? 'ps--active-x' : 'sidebar'}`}>
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
                Account Setting 
                {/* <Link to={`/account-setting`}>  Account Setting </Link> */}
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
        <hr />

          <ConversationList className='conversationList'>
            {/* Search Input */}
            <div className="searchContainer">

              {/* <input type="text" className="searchInput" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Channels"  /> */}
              {/* <Search placeholder="Search Channels..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)} />
             */}
               <Search  className="searchInput" 
  placeholder="Search Channels..."
  value={searchQuery}
  onChange={(value: any) => setSearchQuery(value)}
/>


            </div>

            {/* Conversation List */}
            {userChannel
               .filter((c:any) =>
               c.channel_details[0].name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((c: any) => {

            


              // const [avatar, name] = (() => {
                const participant =
                  c.channel_details.length > 0 ? c.channel_details[0] : undefined;

                // setActiveName( c.channel_details[0].name)
              //   if (participant) {

              //     console.log("participant ", participant)
              //     const user = getUser(participant.id);
              //     console.log("participant user ", user)
              //     if (user) {
              //       return [user.name];
              //     }
              //   }

              //   return [undefined, undefined];
              // })();
              return (
                <Conversation   className='conversations'
                // className={`scrollbar-container cs-sidebar cs-sidebar--left sidebar ps ${
                //   isScrollbarActive ? 'ps--active-x' : ''
                // }`}
                  key={c.id} // Add a unique key prop for each conversation
                  unreadCnt={c.unreadCounter}
                  active={activeConversation?.id === c.id}
                  onClick={() => {handleConversationClick( c.channel_id)
                    setActiveName(c.channel_details[0].name) 
                  }}
                
                  
                >
                  <Conversation.Content className='conversationsContent' 
                    name={c.channel_details[0].name}
                    //  name={'name'}
                    style={conversationContentStyle}
                    onClick={() => { setActiveConversation(c.id);  
                      setActiveName(c.channel_details[0].name) 
                    }}
                   
                  />
                  <Avatar src={HashImage} onClick={() => { setActiveConversation(c.id); setActiveName(c.channel_details[0].name) }} />
                </Conversation>
              );
            })}
          </ConversationList>
        

        </Sidebar>

        {/* messages List */}


        {loading && 

<div className='loader' >

<img height={50} src={Loader} alt="loading" />

</div>}

   {!loading && (
<ChatContainer style={chatContainerStyle} className='chat-container'>
 <ConversationHeader>
   <ConversationHeader.Back onClick={handleBackClick} />
     
   <ConversationHeader.Content className='activeName'
     userName={activeName}
   // info="Active 10 mins ago"
   />

   <ConversationHeader.Actions>
     {/* <SwipeableTemporaryDrawer /> */}
     <div onClick={() => handleLikeClick(notificationChannelId)}>

{/* {isBellEnabled ? < NotificationsActiveOutlinedIcon /> : < NotificationsOffIcon/>} */}
{notificationState[notificationChannelId] ? <NotificationsActiveOutlinedIcon color="primary" /> : <NotificationsOffIcon color="primary"  />}
</div>
   </ConversationHeader.Actions>
 </ConversationHeader>
 {/* {activeConversation && (
   <ConversationHeader>
     <ConversationHeader.Back onClick={handleBackClick} />

     <ConversationHeader.Content
       userName={'mmmm'}
       // info="Active 10 mins ago"
     />
     <ConversationHeader.Actions>
       <SwipeableTemporaryDrawer />
     </ConversationHeader.Actions>
   </ConversationHeader>
 )} */}

  {/* <MessageList typingIndicator={getTypingIndicator()}>
   {
     messages.map((g: any) => (

         
       <MessageGroup key={g.id} direction={g.direction}>
         <MessageGroup.Messages>

          <MessageSeparator>
          {moment(g.created_at).format('dddd')}
          </MessageSeparator>
          

     

        
<Message
  model={{
    type: g.content_type === "html" ? "html" : "text",
    message: g.content_type === "html" ? `<a href="${g.link}" target=_blank>${g.link}</a>` : g.content,
    sentTime: "15 mins ago",
    sender: "Zoe",
    direction: "incoming",
    position: "single",
  }}
/>


         </MessageGroup.Messages>
       </MessageGroup>
     ))}


 </MessageList>  */}




<MessageList className='messagesList'>
  {messages.map((g:any, index:number) => {
    const currentDate = moment(g.created_at).format('D/M/YY');
    const previousDate = index > 0 ? moment(messages[index - 1].created_at).format('D/M/YY') : null;
    const showDateSeparator = currentDate !== previousDate;

    return (
      <React.Fragment key={g.id}>
        {showDateSeparator && (
          <MessageSeparator className="date-separator">
            {currentDate}
          </MessageSeparator>
        )}

        <Message className='messages'
          model={{
            type: g.content_type === 'html' ? 'html' : 'text',
            message: g.content_type === 'html' ? `<a href="${g.link}" target="_blank">${g.link}</a>` : g.content,
            sentTime: moment(g.created_at).format('hh:mm A'),
            direction: 'incoming',
            position: 'single',
          }}
        />
          <MessageTime time={moment(g.created_at).format('hh:mm A')} />
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