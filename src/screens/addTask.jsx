
import React,{useState,useEffect} from 'react';
import Multiselect from 'multiselect-react-dropdown';
import AttachIcon from '../assets/images/attach.png';
import { toast as Toast,ToastContainer } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";
import { setTask } from '../redux/features/tasksSlice';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../redux/features/actions/auth';
const state = {
    options: [{name: 'qtConnect', id: 1},{name: 'Tap and go', id: 2}]
};

const AddTaskScreen = () => {
    const dispatch = useDispatch();
    const {users,loading} = useSelector((state)=>state.users)

    useEffect(() => {
        dispatch(fetchUsers());
    }
    , [dispatch]);

  const token = localStorage.getItem('token');
    const [assignees, setAssignees] = useState([]); 
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [projects, setProjects] = useState([]);
    const [priority, setPriority] = useState('low');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [assigneesList, setAssigneesList] = useState([]);
    const [isLoading,setIsLoading]=useState(false)

    const selectMultipleImages = () => {
        const input = document.getElementById("fileInput");
    input.click();
    }

    const onDelete = (e) => {
console.log(e);
        setProjects(e);
    }

    const onSelect = (e) => {
  console.log(e);
        setProjects(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(title === '' || description === '' || startDate === '' || endDate === ''){
            Toast.error('Please fill all the fields');
            return;
        }
    setIsLoading(true)
        var formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('priority', priority);
        formData.append('assignees', assignees.map((e)=>e.id));
        formData.append('projects', projects.map(e=>e.id));
        formData.append('status', 'pending');
        
   for (let index = 0; index < files.length; index++) {
    const element = files[index];
    formData.append('files', element);
   }



        var config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BACKEND_URL}/tasks/create`,
            headers: {
              Authorization: `Bearer ${token}`,
             "Content-Type": "*/*",
            },
            data: formData,
          };

  
  axios(config)
  .then(function (response) {
    setIsLoading(false)
    const res= response.data;
    Toast.success(res.message)

    dispatch(setTask(res.task))
        window.location.replace('/tasks')
  }).catch(function (error) {

   Toast.error('Something went wrong')

   setIsLoading(false)
 
  });
    }


  
  return (
    <div className="flex justify-center items-center h-screen">
   <ToastContainer/>
<div id="crud-modal" tabindex="-1" aria-hidden="true" class={
    open?`flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full`:'hidden'}>
    <div class=" p-4 w-full max-w-md max-h-full">
 
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
    
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                   Add Assignees
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={()=>setOpen(false)}>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
      
            <div class="p-4 md:p-5" >
                <div class="grid gap-4 mb-4 grid-cols-2">

                    {
                        users&&users.map((user)=>{
                            const find = assignees&&assignees.find((e)=>e.id===user.id)
                            
                            return find? (
                            <div className='bg-blue-200 rounded p-2' onClick={(e)=>setAssignees(assignees.filter(e=>e.id!==user.id))}>
                                {user.firstName}
                                </div>
                        ):<div className='border  rounded p-2' onClick={(e)=>setAssignees([...assignees,user])}>
                        {user.firstName}
                        </div>})
                    }

         
                </div>
            </div>
        </div>
    </div>
</div> 
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-full" method='POST' encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${title===''?'border-red-400':''}` }
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
               {
        title==''?(
            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        ):null
      }
        </div>

    <div class="w-full flex flex-wrap  -mx-3 mb-6">
    <div class="w-full md:w-1/2  px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Start Date
      </label>
      <input 
      
      class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${startDate===''?'border-red-400':''}` } id="grid-first-name" type="date"
      onChange={(e) => setStartDate(e.target.value)}
/>
      {
        startDate==''?(
            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        ):null
      }
  
    </div>
    <div class="w-full md:w-1/2 pl-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        End Date
      </label>
      <input class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${endDate===''?'border-red-400':''}` } id="grid-last-name" type="date" 
      onChange={(e) => setEndDate(e.target.value)}
      />
          {
        endDate==''?(
            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        ):null
      }
    </div>
  </div>

  <div>
  


  </div>



  <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Assignees
          </label>
          <div className='flex'>

    {
        assignees.map((assignee) => (
            <div className=''>{assignee.email}
            <span className='text-red-400 mx-3' onClick={() => setAssignees(assignees.filter((item) => item.id !== assignee.id))}>X</span>
            </div>
        ))
    }


<div className='flex justify-center items-center text-blue-500 ml-4 rounded text-white bg-blue-400 h-5 w-5'>
<span className=' ' onClick={()=>setOpen(true)}>+</span>
</div>

                </div>

    </div>

    <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Projects
          </label>
  <Multiselect
options={state.options} 
onRemove={onDelete}
onSelect={onSelect}
displayValue="name" 
/>
    </div>
     
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${description===''?'border-red-400':''}` }
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
              {
        description==''?(
            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        ):null
      }
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Priority
          </label>
           
           <div className='flex gap-5'>
<div className='flex'>
<input type="radio" name="priority" checked value="low"

onChange={(e) => setPriority(e.target.value)}
/>
    <label for="priority">Low</label><br/>
</div>

<div>
<input type="radio"  name="priority" value="Normal"
onChange={(e) => setPriority(e.target.value)}
/>
    <label for="priority">Normal</label><br/>
</div>

<div>
<input type="radio" name="priority" value="High"
onChange={(e) => setPriority(e.target.value)}
/>
    <label for="priority">High</label><br/>
</div>
           </div>

        </div>
        <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  onChange={(e) => {
                   console.log(e.target.files.length);

                    setFiles(e.target.files);
                  }}
                />
        <div className="flex items-center justify-between">
            <div className='flex gap-1'>
                <div>
                    {files&&files.length}
                </div>
            <img src={AttachIcon} alt='attach' onClick={()=>selectMultipleImages()} className='w-5 h-5'/>
            <span className='text-md'>Attachments</span>
            </div>

          <div className='flex gap-4'>
            <Link to='/tasks'>
          <span
            className="bg-white-500 hover:bg-blue-700 text-black border font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cancel
          </span>
          </Link>
          {
            isLoading?    <button

            className="bg-blue-100  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
        
          >
            Loading
          </button>
          :    <button

          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
          }
     
          </div>
    
        </div>
      </form>
    </div>
  );
};

export default AddTaskScreen;
