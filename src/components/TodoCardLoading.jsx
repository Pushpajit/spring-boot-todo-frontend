import { Paper, Skeleton } from '@mui/material'
import React from 'react'

function TodoCardLoading() {
    return (
        <Paper elevation={5} sx={{ width: 230, height: 300, p: 1, border: "1px solid", position: "relative" }}>

            <Skeleton variant='text' width={"70%"} height={15} animation={"wave"} />
            <Skeleton variant='text' width={"70%"} height={15} animation={"wave"} />


            <Skeleton variant='rectangular' width={"100%"} height={"70%"} animation={"wave"} />

            <Skeleton variant='text' width={"100%"} height={15} animation={"wave"} />
            <Skeleton variant='text' width={"100%"} height={15} animation={"wave"} />
        </Paper>
    )
}

export default TodoCardLoading
