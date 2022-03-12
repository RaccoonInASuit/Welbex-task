import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import "./CreatePostBtn.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreatePostBtn = () => {
  const [firstName, setFirstName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(prevState => !prevState);
  };

  const onSave = () => {
    const data = {firstName: firstName, description: description};
    axios.post("http://localhost:3001/posts", data,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
    });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} startIcon={<AddIcon />}></Button>
      <Modal open={open} onClose={handleClickOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className="modal" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <div className="inputContainer">
            <TextField onChange={(e) => setFirstName(e.target.value)} id="outlined-basic" label="First Name" variant="outlined" style={{ width: 250 }} />
            <TextareaAutosize minRows={3} onChange={(e) => setDescription(e.target.value)} aria-label="empty textarea" placeholder="Empty" style={{ width: 350 }}/>
          </div>
          <Button onClick={handleClickOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={onSave} color="primary">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CreatePostBtn;
