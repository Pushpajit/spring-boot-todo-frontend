import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import EmptyCard from '../components/EmptyCard'
import TodoCard from '../components/TodoCard'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../services/service'
import TodoCardLoading from '../components/TodoCardLoading'
import { useNavigate } from 'react-router-dom'


function sortByPriority(arr) {
    const priorityOrder = {High: 0, Mid: 1, Low: 2};
    arr.sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    return arr;
}

function Home() {

    // const [user, setUser] = useState(null);
    // const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('currentUser')) === null) {
            navigate("/signin");
        }
    }, [])

    const queryUser = useQuery({
        queryKey: ['userData', JSON.parse(localStorage.getItem('currentUser'))?.id],
        queryFn: async () => {
            return await getUserById(JSON.parse(localStorage.getItem('currentUser'))?.id);
        }
    })


    if (queryUser.isSuccess)
        console.log(queryUser.data.todos);

    return (
        <div>
            <Navbar />

            <div className='mt-24 p-10 flex flex-wrap gap-5 z-0'>
               
                {queryUser.isLoading && <TodoCardLoading />}

                {queryUser.isSuccess && sortByPriority(queryUser.data?.todos).map(todo => {
                    return (<TodoCard
                        key={todo.id}
                        todoId={todo.id}
                        title={todo.title}
                        desc={todo.description}
                        priority={todo.priority}
                        status={todo.status}
                        createTime={todo.creation_time}
                    />)
                })}

                <EmptyCard />
            </div>
        </div>
    )
}

export default Home
