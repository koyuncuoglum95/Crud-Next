import React, { useState } from 'react'
import axios from 'axios';
import { useRouter} from 'next/navigation'
import Modal from './Modal';


const Post = ({ post }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);

  const router = useRouter();

  let isPost;

  const editPostHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      title: title,
      desc: desc
    };

    await axios.patch(`https://crud-next-tan.vercel.app/api/posts/${post.id}`, newPost)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error(error)
    })
    .finally(() => {
      setTitle('');
      setDesc('');
      setIsModal(false);
      router.refresh();
    })
  }

  const deletePostHandler = async (id) => {
    await axios
    .delete(`https://crud-next-tan.vercel.app/api/posts/${id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsModalDelete(false);
      router.refresh();
    })

  }


  return (
    <div>
      <li key={post.id} className='p-3 bg-slate-200 my-5 list-none'>
        <h1 className='text-2xl font-bold'>{post.title}</h1>
        <p>{post.desc}</p>

        <div className='pt-5'>
          <button className='text-blue-700 mr-3' onClick={() => setIsModal(true)}>Edit</button>

          {
          isModal ? isPost = <Modal isModal={isModal} setIsModal={setIsModal}>
          <form onSubmit={editPostHandler}>
            <h1 className="text-2xl pb-3">Edit Post</h1>

            <input 
            type="text" 
            value={title} 
            placeholder="Enter Title" 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2"

            />

            <input 
            type="text" 
            value={desc} 
            placeholder="Enter Description" 
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 my-5"
            />

            <button type="submit" className="bg-blue-600 text-white px-5 py-2">Submit</button>
          </form>
        </Modal>

        : isPost = ''
        
        } 
        
          <button className='text-red-700 mr-3' onClick={() => setIsModalDelete(true)}>Delete</button>


        {
        isModalDelete && 
        <Modal setIsModal={setIsModal} isModalDelete={isModalDelete} setIsModalDelete={setIsModalDelete}>
          <h1 className="text-2xl pb-3">
            Are you sure, You want to delete this post?
            </h1>
            
            <div>
              <button
              onClick={() => deletePostHandler(post.id)}
              className="text-blue-700 font-bold mr-5"
              >
              YES
              </button>

              <button
              onClick={() => setIsModalDelete(false)}
              className="text-red-700 font-bold mr-5"
              >
              No
              </button>
            </div>
          </Modal>  
          }
        </div>
      </li>
    </div>
  )
}

export default Post
