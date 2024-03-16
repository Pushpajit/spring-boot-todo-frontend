import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import CreateTodoModal from './CreateTodoModal';

function EmptyCard() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className='w-[230px] h-[320px] rounded-md border-[2px] border-dotted border-gray-600 flex justify-center items-center hover:border-indigo-400'>
        <IconButton size='large' onClick={handleOpen}>
            <AddCircleIcon fontSize='inherit'/>
        </IconButton>

        <CreateTodoModal open={open} handleClose={handleClose}/>
      </div>
    </div>
  )
}

export default EmptyCard
