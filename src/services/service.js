import axios from "axios"



let URL = 'http://localhost:5000/v0/api';


export const registerUser = async (obj) => {
    console.log(obj);
    const endpoint = URL + "/auth/signup";

    const data = {
        username: obj.username,
        password: obj.password
    }


    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    // console.log(res);
    const resData = await res.json();
    console.log(resData);

    if (res.status >= 200 && res.status < 400) {
        return resData;
    } else {
        return res.statusText;
    }
}


export const loginUser = async (obj) => {
    // console.log(obj);
    const endpoint = URL + `/auth/signin?username=${obj.username}&password=${obj.password}`;

    console.log(URL);

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // console.log(res);
    const resData = await res.json();
    // console.log(resData);

    if (res.status >= 200 && res.status < 400) {
        return resData;
    } else {
        return res.statusText;
    }
}



export const getUserById = async (userId) => {
    const endpoint = URL + `/user?userId=${userId}`;

    const local = JSON.parse(localStorage.getItem('currentUser'));
    const credentials = `${local.username}:${local.password}`;
    const base64EncoderCredentials = btoa(credentials);

    // console.log("IN GET USERBYID()");

    console.log(credentials);

    const res = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(res);

    const resData = await res.json();
    console.log(resData);

    if (res.status >= 200 && res.status < 400) {
        return resData;
    } else {
        return res.statusText;
    }

}


export const createTodoAPI = async (data) => {
    const endpoint = URL + `/todo?userId=${data.userId}`;
    const payload = {
        title: data.title,
        description: data.desc,
        priority: data.priority
    }

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    console.log(res);

    const resData = await res.json();
    console.log(resData);

    if (res.ok) {
        return resData;
    } else {
        return res.statusText;
    }

}


export const updateTodo = async (data) => {
    console.log(data.todoId);
    const endpoint = URL + `/todo?userId=${JSON.parse(localStorage.getItem('currentUser')).id}&todoId=${data.todoId}`;
    console.log(endpoint);

    const payload = {
        title: data.title || null,
        description: data.desc || null,
        status: data.status || null,
        priority: data.priority || null
    }

    const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    console.log(res);

    const resData = await res.json();
    console.log(resData);

    if (res.ok) {
        return resData;
    } else {
        return res.statusText;
    }

}


export const deleteTodo = async (data) => {
    const endpoint = URL + `/todo?userId=${JSON.parse(localStorage.getItem('currentUser')).id}&todoId=${data.todoId}`;


    const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(res);

    const resData = await res.json();
    console.log(resData);

    if (res.ok) {
        return resData;
    } else {
        return res.statusText;
    }
}
