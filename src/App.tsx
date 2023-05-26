import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import 'react-toastify/dist/ReactToastify.css';
import {
  BasicStorage,
  ChatMessage,
  ChatProvider,
  Conversation,
  ConversationId,
  ConversationRole,
  IStorage,
  MessageContentType,
  Participant,
  Presence,
  TypingUsersList,
  UpdateState,
  User,
  UserStatus,
} from "@chatscope/use-chat";
import { ExampleChatService } from "@chatscope/use-chat/dist/examples";
import { Chat } from "./components/Chat";
import { nanoid } from "nanoid";
import { Col, Container, Row } from "react-bootstrap";
import {
  akaneModel,
  eliotModel,
  emilyModel,
  joeModel,
  users,
  joeModel2,
} from "./data/data";
import { AutoDraft } from "@chatscope/use-chat/dist/enums/AutoDraft";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from './Context/context';
// import { useIsFocused } from '@react-navigation/native';
// import {Footer} from "./components/Footer";

// sendMessage and addMessage methods can automagically generate id for messages and groups
// This allows you to omit doing this manually, but you need to provide a message generator
// The message id generator is a function that receives message and returns id for this message
// The group id generator is a function that returns string
const messageIdGenerator = (message: ChatMessage<MessageContentType>) =>
  nanoid();
const groupIdGenerator = () => nanoid();

const akaneStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });
const eliotStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });
const emilyStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });
const joeStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });
const joe2Storage = new BasicStorage({ groupIdGenerator, messageIdGenerator });

// Create serviceFactory
const serviceFactory = (storage: IStorage, updateState: UpdateState) => {
  return new ExampleChatService(storage, updateState);
};

const akane = new User({
  id: akaneModel.name,
  presence: new Presence({ status: UserStatus.Available, description: "" }),
  firstName: "",
  lastName: "",
  username: akaneModel.name,
  email: "",
  avatar: akaneModel.avatar,
  bio: "",
});

const emily = new User({
  id: emilyModel.name,
  presence: new Presence({ status: UserStatus.Available, description: "" }),
  firstName: "",
  lastName: "",
  username: emilyModel.name,
  email: "",
  avatar: emilyModel.avatar,
  bio: "",
});

const eliot = new User({
  id: eliotModel.name,
  presence: new Presence({ status: UserStatus.Available, description: "" }),
  firstName: "",
  lastName: "",
  username: eliotModel.name,
  email: "",
  avatar: eliotModel.avatar,
  bio: "",
});

const joe = new User({
  id: joeModel.name,
  presence: new Presence({ status: UserStatus.Available, description: "" }),
  firstName: "",
  lastName: "",
  username: joeModel.name,
  email: "",
  avatar: joeModel.avatar,
  bio: "",
});
const joe2 = new User({
  id: joeModel2.name,
  presence: new Presence({ status: UserStatus.Available, description: "" }),
  firstName: "",
  lastName: "",
  username: joeModel2.name,
  email: "",
  avatar: joeModel2.avatar,
  bio: "",
});

const chats = [
  { name: "Akane", storage: akaneStorage },
  { name: "Eliot", storage: eliotStorage },
  { name: "Emily", storage: emilyStorage },
  { name: "Joe", storage: joeStorage },
  { name: "Joe2", storage: joe2Storage },
];

function createConversation(id: ConversationId, name: string): Conversation {
  return new Conversation({
    id,
    participants: [
      new Participant({
        id: name,
        role: new ConversationRole([]),
      }),
    ],
    unreadCounter: 0,
    typingUsers: new TypingUsersList({ items: [] }),
    draft: "",
  });
}

// Add users and conversations to the states
chats.forEach((c) => {
  users.forEach((u) => {
    if (u.name !== c.name) {
      c.storage.addUser(
        new User({
          id: u.name,
          presence: new Presence({
            status: UserStatus.Available,
            description: "",
          }),
          firstName: "",
          lastName: "",
          username: u.name,
          email: "",
          avatar: u.avatar,
          bio: "",
        })
      );

      const conversationId = nanoid();

      const myConversation = c.storage
        .getState()
        .conversations.find(
          (cv) =>
            typeof cv.participants.find((p) => p.id === u.name) !== "undefined"
        );
      if (!myConversation) {
        c.storage.addConversation(createConversation(conversationId, u.name));

        const chat = chats.find((chat) => chat.name === u.name);

        if (chat) {
          const hisConversation = chat.storage
            .getState()
            .conversations.find(
              (cv) =>
                typeof cv.participants.find((p) => p.id === c.name) !==
                "undefined"
            );
          if (!hisConversation) {
            chat.storage.addConversation(
              createConversation(conversationId, c.name)
            );
          }
        }
      }
    }
  });
});

function App() {
  const navigate = useNavigate();
  // const { state, dispatch } = useContext(GlobalContext);
  const user_Token = localStorage.getItem("token");
  const cat2 = localStorage.getItem("email");
  const cat3 = localStorage.getItem("user_ID");
  console.log("cat------------------", user_Token);
 
  // useEffect(() => {
  //   console.log(user_Token);
  //   if (user_Token == ("" || null || undefined)) navigate("/login");
  // }, [user_Token,navigate]);

    // Check if the user is already authenticated
    if (!user_Token) {

    setTimeout(function() {
      window.location.href = "./login/Login.jsx";
  }, 1000);
    
      
    }
  

  return (
    <div className="h-100 d-flex flex-column overflow-hidden">
      <a href=""></a>
      <Container
        fluid
        className="flex-grow-1 position-relative overflow-hidden"
      >
        <Row className="h-100 pb-2 flex-nowrap">
          <Col className="p-0">
            <ChatProvider
              serviceFactory={serviceFactory}
              storage={akaneStorage}
              config={{
                typingThrottleTime: 250,
                typingDebounceTime: 900,
                debounceTyping: true,
                autoDraft: AutoDraft.Save | AutoDraft.Restore,
              }}
            >
              <Chat user={akane} />
            </ChatProvider>
          </Col>
        </Row>
      </Container>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
