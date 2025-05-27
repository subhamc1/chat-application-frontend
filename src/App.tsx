import "./App.css";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { orange } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";
import { CreateChatRoomDialog } from "./CreateChatRoomDialog";
import { JoinChatRoomDialog } from "./JoinChatRoomDialog";
import { ChatRoom } from "./ChatRoom";
import { TelepartyClient, SocketMessageTypes } from 'teleparty-websocket-lib';
import type { SocketEventHandler } from "teleparty-websocket-lib";
import type { SocketMessage } from "teleparty-websocket-lib/lib/SocketMessage";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

function App() {
  const [connectionReady, setConnectionReady] = useState(false);
  const [chatRoomOpen, setChatRoomOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [, setUserIcon] = useState("");
  const [messages, setMessages] = useState<SocketMessage[]>([]);

  const eventHandler: SocketEventHandler = {
    onConnectionReady: () => { setConnectionReady(true) },
    onClose: () => { setConnectionReady(false) },
    onMessage: (message) => { console.log("Received message: ", message);
      if (message.type==="sendMessage"&&!message.data.isSystemMessage){
        setMessages([...messages, message])
      }
    }
  };

  const client = new TelepartyClient(eventHandler);

  function handleCreateChatRoom(nickname: string, userIcon: string){
    client.createChatRoom(nickname,userIcon).then(value => {
      console.log("the_value", value);
      setRoomId(value);
      setNickname(nickname);
      setUserIcon(userIcon);
      setChatRoomOpen(true);
      handleJoinChatRoom(roomId, nickname, userIcon);
    })
  }

  function handleJoinChatRoom(roomId: string, nickname: string, userIcon: string){
    client.joinChatRoom(nickname, roomId, userIcon).then(() => {
    setRoomId(roomId);
    setNickname(nickname);
    setUserIcon(userIcon);
    setChatRoomOpen(true);})
    console.log("Joined chat room with ID:", roomId);
  }

  function sendMessage(text: string) {
    if (roomId && nickname && text.trim()) {
      client.sendMessage(SocketMessageTypes.SEND_MESSAGE, text);
    }
  }
  console.log(messages)
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{dispaly: "flex", flexDirection: "column", height: "100%"}}>
        <CssBaseline/>
        <Box>
          <AppBar position="sticky">
            <Toolbar variant="regular">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Chat Application
              </Typography>
              <CreateChatRoomDialog handleCreateChatRoom={handleCreateChatRoom} connectionReady={connectionReady}/>
              <JoinChatRoomDialog handleJoinChatRoom={handleJoinChatRoom} connectionReady={connectionReady}/>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ flexGrow: "1"}}>
          {chatRoomOpen ? <ChatRoom sendMessage={sendMessage} messages={messages} setMessages={setMessages} nickname={nickname}/> : <div>No chat rooms are open.</div>}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
