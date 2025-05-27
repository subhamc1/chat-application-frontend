import { Box } from "@mui/material";
import { TextBox } from "./TextBox";
import {useState} from "react"
import type { SocketMessage } from "teleparty-websocket-lib/lib/SocketMessage";

export function ChatRoom({sendMessage, messages}: {sendMessage: (text: string) => void,messages: SocketMessage[]}) {
  const [text, setText] = useState("");

  function handleSend(text: string){
      if (text.trim() === "") return; // Prevent sending empty messages
      sendMessage(text);
      setText(""); // Clear the input after sending
  }

  console.log("ChatRoom", messages);
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box flexGrow={1}>
        {messages.map((message) => {
          return (<div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            {message.data.nickname}
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">{message.data.value}</div>
          </div> )
        })}
      </Box>
      <TextBox text={text} setText={setText} handleSend={handleSend}/>
    </Box>
  );
}


 
<div className="chat chat-end">
<div className="chat-image avatar">
  <div className="w-10 rounded-full">
    <img
      alt="Tailwind CSS chat bubble component"
      src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
    />
  </div>
</div>
<div className="chat-header">
  Anakin
  <time className="text-xs opacity-50">12:46</time>
</div>
<div className="chat-bubble">I hate you!</div>
<div className="chat-footer opacity-50">Seen at 12:46</div>
</div> 