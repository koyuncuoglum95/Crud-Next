"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchPostData = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');

        await new Promise((resolve) => setTimeout(resolve, 3000)) // wait 3 seconds

        setPosts(res.data);
    }

    const fetchUserData = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');

        await new Promise((resolve) => setTimeout(resolve, 3000)) // wait 3 seconds

        setUsers(res.data);
    }

    useEffect(() => {
        fetchPostData();
    },[])


    useEffect(() => {
        fetchUserData();
    },[])

    console.log(posts);
    console.log(users);



  return (
    <div>
        <h1 className='text-4xl text-red-600 font-bold'>Posts Page</h1>

        <h2 className='text-4xl text-green-600 font-bold'>Users</h2>

        {
            users.map((u, index) => (
                <div key={index}>
                    <p>{u.name}</p>
                </div>
            ))
        }


        <ul>
            {
                posts.map((p, index) => (
                    <li key={index} className='bg-gray-100 p-5 cursor-pointer my-3'>
                        <h4 className='text-blue-600 font-bold text-3xl'>{p.title}</h4>
                        <p className='font-bold'>{p.body}</p>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Posts