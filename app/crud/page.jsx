"use client"
import React, { useState, useEffect } from 'react'
import AddPost from '../components/AddPost'
import PostList from '../components/PostList'
import axios from 'axios';

const Crud = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const getData = async () => {
            try {
                const res = await axios.get('/api/posts');
                setPosts(res.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        }

        getData();

        console.log(posts)
    }, []);

  return (
    <div className='max-w-4xl mx-auto mt-4'>
        <div className='my-5 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>Todo List App</h1>
            <AddPost />
        </div>

        <PostList posts={posts}/>
    </div>
  )
}

export default Crud
