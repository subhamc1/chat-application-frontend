import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export function TextBox() {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter your message..."
        inputProps={{ "aria-label": "enter your message" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="send">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
