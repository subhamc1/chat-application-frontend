import "./App.css";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { orange } from "@mui/material/colors";
import { Button, CssBaseline } from "@mui/material";
import { CreateChatRoomDialog } from "./CreateChatRoomDialog";
import { JoinChatRoomDialog } from "./JoinChatRoomDialog";
import { ChatRoom } from "./ChatRoom";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
  },
});

function App() {
  const [chatRoomOpen, setChatRoomOpen] = useState(true);
  const [nickname, setNickname] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const [userIcon, setUserIcon] = useState("");
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
              <CreateChatRoomDialog />
              <JoinChatRoomDialog />
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ flexGrow: "1"}}>
          {chatRoomOpen && <ChatRoom />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
