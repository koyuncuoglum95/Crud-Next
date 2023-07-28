import { useState } from "react"
import Modal from "./Modal"
import axios from "axios";
import { useRouter} from 'next/navigation'

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isModal, setIsModal] = useState(false);

  const router = useRouter();

  let isPost;

  const addPostHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      title: title,
      desc: desc
    };

    await axios.post('/api/posts', newPost)
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

  
  return (
    <div>
        <button className='bg-red-700 text-white p-3 cursor-pointer' onClick={() => setIsModal(true)}>AddPost</button>
        
        {
          isModal ? isPost = <Modal isModal={isModal} setIsModal={setIsModal}>
          <form onSubmit={addPostHandler}>
            <h1 className="text-2xl pb-3">Add New Post</h1>

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
        
        
    </div>
  )
}

export default AddPost
