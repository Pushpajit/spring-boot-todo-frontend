import { Button, IconButton, InputBase, Paper, TextField, Tooltip } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useEffect, useState } from 'react'
import EditTodoModal from './EditTodoModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../services/service';


function convertDateFormat(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Get the individual components of the date
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns a 0-based index, so add 1 to get the correct month number
    const year = date.getFullYear();

    // Format the date string as "dd/mm/yyyy"
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    return formattedDate;
}

function TodoCard({ todoId, title, desc, createTime, status, priority }) {
    // const [onClickTitle, setOnClickTitle] = useState(false);
    // const [onClickDesc, setOnClickDesc] = useState(false);

    // const [modifyTitle, setModifyTitle] = useState(title);
    // const [modifyDesc, setModifyDesc] = useState(desc);
    // const [modifyPriority, setModifyPriority] = useState(priority);
    // const [modifyStatus, setModifyStatus] = useState(status);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    

    const queryClient = useQueryClient();

    const deleteQuery = useMutation({
        mutationFn: deleteTodo,

        onSuccess: (_, variables) => {
            // alert("Todo deleted successfully");
            queryClient.invalidateQueries('userData');
        },

        onError: (err) => {
            alert("Something is wrong [DELETETODO]: " + err);
        }
    })

    const handleDelete = () => {
        deleteQuery.mutate({todoId: todoId});
    }

    useEffect(() => {
        if(status === 'Done'){
            setTimeout(() => {
                handleDelete();
                console.log("CARD DELETED");
            }, 1000 * 15);
        }
    }, [status])


    // console.log("OPEN: " + open);

    return (
        <Paper elevation={status != 'Done' ? 4 : 0} sx={{ width: 260, height: 320, p: 1, border: "1px solid", position: "relative", opacity: `${status == 'Done' ? 0.6 : 1}` }}>
            <div className='absolute left-[50%] top-0'>
                <IconButton size='small' onClick={handleDelete} disabled={status === 'Done' ? true : false} >
                    <HighlightOffIcon fontSize='small' />
                </IconButton>
            </div>

            <div className='flex justify-between items-center mb-2'>
                <Tooltip title={title} placement='top'>
                    <p className={`font-bold text-[15px] cursor-pointer text-slate-800 w-24 text-nowrap text-ellipsis overflow-hidden`}>{title}</p>
                </Tooltip>
                {/* {onClickTitle && <InputBase onChange={(e) => { setModifyTitle(e.target.value) }} onKeyDown={(e) => { if (e.key === 'Enter') setOnClickTitle(false) }} value={modifyTitle} />} */}
                <p className='text-[10px] font-bold text-slate-700'>{convertDateFormat(createTime)}</p>
            </div>

            <div className={`h-[180px] overflow-y-scroll text-pretty text-[16px] font-bold mb-5 cursor-pointer text-slate-600`}>
                {desc}
                {/* {onClickDesc && <TextField multiline onChange={(e) => {setModifyDesc(e.target.value)}} onKeyDown={(event) => { if (event.shiftKey && event.key === 'Enter') { setOnClickDesc(false) } }} value={modifyDesc} sx={{ width: "100%" }} />} */}
            </div>

            <div className='flex justify-between items-center'>

                <div className='text-center'>
                    <p className='font-bold text-[15px] text-slate-600'>Status</p>
                    <p className='font-bold text-[10px] text-slate-600'>{status}</p>
                </div>

                <IconButton size='small' sx={{marginLeft: 2}} onClick={handleOpen} disabled={status === 'Done' ? true : false}>
                 <SettingsIcon fontSize='small'/>
                </IconButton>

                <div className='text-center'>
                    <p className='font-bold text-[15px] text-slate-600'>Priority</p>
                    {priority === "Low" && <Tooltip title="Low"><div className='w-[12px] h-[12px] mx-auto rounded-full' style={{ backgroundColor: "limegreen" }}></div></Tooltip>}
                    {priority === "Mid" && <Tooltip title="Mid"><div className='w-[12px] h-[12px] mx-auto rounded-full' style={{ backgroundColor: "gold" }}></div></Tooltip>}
                    {priority === "High" && <Tooltip title="High"><div className='w-[12px] h-[12px] mx-auto rounded-full' style={{ backgroundColor: "crimson" }}></div></Tooltip>}
                </div>

            </div>

            <EditTodoModal key={todoId} existedTodo={{title, desc, status, priority, todoId}} open={open} handleClose={handleClose}/>
        </Paper>
    )
}

export default TodoCard
