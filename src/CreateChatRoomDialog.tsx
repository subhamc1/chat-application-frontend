import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function CreateChatRoomDialog({handleCreateChatRoom, connectionReady}: {handleCreateChatRoom: (nickname: string, userIcon: string) => void, connectionReady: boolean}) {
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
        Create Chat Room
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
              const nickname = formJson.nickname;
              const userIcon = "abc"; // Placeholder for user icon, can be replaced with actual logic
              handleCreateChatRoom(nickname,userIcon);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Create Chat Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a chat room, please enter a nickname.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
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
          <Button type="submit" disabled={!connectionReady}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}