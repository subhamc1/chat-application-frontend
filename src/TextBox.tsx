import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export function TextBox({text , setText, handleSend} : {text: string, setText: (text: string) => void, handleSend: (text: string) => void}) {

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter your message..."
        inputProps={{ "aria-label": "enter your message" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="send" onClick={() => handleSend(text)}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
