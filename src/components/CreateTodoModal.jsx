import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodoAPI } from '../services/service';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


function CreateTodoModal({ open, handleClose }) {
    const [priority, setPriority] = useState('Low');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const queryClient = useQueryClient();

    const handleChange = (event) => {
        setPriority(event.target.value);
    };

    const handleCancle = (e) => {
        setPriority('');
        setTitle('');
        setDesc('');
        handleClose();
    }

    const mutation = useMutation({
        mutationFn: createTodoAPI,
        onSuccess: (_, variables) => {
            // alert("Post Created Successfylly");
            queryClient.invalidateQueries('userData');
            console.log("query Client Invalidated");
        },

        onError: (err) => {
            alert("Something Went Wrong: " + err);
        }
    })


    const handleSubmit = (e) => {
        if (title === '' || desc === '') {
            alert("Title or Desc is missing");
        } else {
            mutation.mutate({ userId: JSON.parse(localStorage.getItem('currentUser')).id, title: title, priority: priority, desc: desc });
            handleCancle();
        }
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <p className='font-extrabold text-center mb-5 text-2xl'>Create Todo</p>

                        <div className='flex flex-col gap-10 items-center justify-center'>
                            <TextField value={title} onChange={(e) => { setTitle(e.target.value) }} label="Title" variant="outlined" size='small' sx={{ width: "100%" }} />
                            <TextField multiline value={desc} onChange={(e) => { setDesc(e.target.value) }} label="Description" variant="outlined" size='medium' sx={{ width: "100%" }} />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={priority}
                                    label="Priority"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Low"}>Low</MenuItem>
                                    <MenuItem value={"Mid"}>Mid</MenuItem>
                                    <MenuItem value={"High"}>High</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='float-right mt-5 space-x-3'>
                            <Button variant='contained' color='error' onClick={handleCancle}>Cancel</Button>
                            <Button variant='contained' color='primary' onClick={handleSubmit}>Create</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default CreateTodoModal
