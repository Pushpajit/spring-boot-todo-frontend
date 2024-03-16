import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../services/service';


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


function EditTodoModal({ existedTodo, open, handleClose }) {
    const [priority, setPriority] = useState(existedTodo.priority || '');
    const [title, setTitle] = useState(existedTodo.title || '');
    const [desc, setDesc] = useState(existedTodo.desc || '');
    const [status, setStatus] = useState(existedTodo.status || '');


    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateTodo,

        onSuccess: (res, variable) => {
            // alert("Todo Updated!");
            queryClient.invalidateQueries('userData');
            // handleCancle();
            // handleClose();
        },

        onError: (err) => {
            alert("Something Went Wrong [UPDATE]: " + err);
        }
    })



    const handleCancle = () => {
        setPriority(existedTodo.priority || '');
        setTitle(existedTodo.title || '');
        setDesc(existedTodo.desc || '');
        setStatus(existedTodo.status || '');
        handleClose();
    }

    const handleSubmit = () => {
        const payload = {
            title,
            desc,
            status,
            priority,
            todoId: existedTodo.todoId
        }

        console.log(payload);
        mutation.mutate(payload);
        handleClose();
        // handleCancle();
        
    }

    const handleChange = (event) => {

        if (event.target.name === 'Priority') {
            setPriority(event.target.value);
        } else {
            setStatus(event.target.value);
        }
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleCancle}
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
                        <p className='font-extrabold text-center mb-5 text-2xl'>Edit Todo</p>

                        <div className='flex flex-col gap-5 items-center justify-center'>
                            <TextField value={title} onChange={(e) => { setTitle(e.target.value) }} label="Title" variant="outlined" size='small' sx={{ width: "100%" }} />
                            <TextField multiline value={desc} onChange={(e) => { setDesc(e.target.value) }} label="Description" variant="outlined" size='medium' sx={{ width: "100%" }} />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='Priority'
                                    value={priority}
                                    label="Priority"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Low"}>Low</MenuItem>
                                    <MenuItem value={"Mid"}>Mid</MenuItem>
                                    <MenuItem value={"High"}>High</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label-status">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-status"
                                    id="demo-simple-select-status"
                                    value={status}
                                    label="status"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Pending"}>Pending</MenuItem>
                                    <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                                    <MenuItem value={"Done"}>Done</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='float-right mt-5 space-x-3'>
                            <Button variant='contained' color='error' size='small' onClick={handleCancle}>Cancel</Button>
                            <Button variant='contained' color='success' size='small' onClick={handleSubmit}>Edit</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default EditTodoModal
