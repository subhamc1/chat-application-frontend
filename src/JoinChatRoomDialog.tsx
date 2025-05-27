import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function JoinChatRoomDialog({handleJoinChatRoom, connectionReady}: {handleJoinChatRoom: (roomId: string, nickname: string, userIcon: string) => void, connectionReady: boolean}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleClickOpen}>
        Join Chat Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const roomId = formJson.roomId;
              const userIcon = "a"; // Placeholder for user icon, can be replaced with actual logic
              const nickname = formJson.nickname;
              handleJoinChatRoom(roomId,nickname,userIcon);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Join Chat Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join a chat room, please enter a room id and a nickname.
          </DialogContentText>
          <TextField
            autoFocus
            required
            id="name"
            name="roomId"
            label="Room ID"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            id="name"
            name="nickname"
            label="Nickname"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={!connectionReady}>Join</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}