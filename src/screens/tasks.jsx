
import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {fetchTasks} from '../redux/features/actions/tasks';
import Footer from '../components/includes/footer';
import { Link } from 'react-router-dom';
import { toast as Toast,ToastContainer } from 'react-toastify';
import axios from "axios";
import { CSVLink } from "react-csv";
import { deleteTask, setTask, updateTask } from '../redux/features/tasksSlice';
import { fetchUsers } from '../redux/features/actions/auth';

const TasksScreen = () => {
    const dispatch = useDispatch();

    const {tasks, loading, error} = useSelector(state => state.tasks);
    const {users} = useSelector(state => state.users);

    const token = localStorage.getItem('token');
    console.log(tasks)

    useEffect(() => {
        dispatch(fetchTasks());
        dispatch(fetchUsers())
    }

    , [dispatch]);


    const handleDelete=(task)=>{


        var config = {
            method: "delete",
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BACKEND_URL}/tasks/delete/${task.id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {},
          };

  
  axios(config)
  .then(function (response) {
    const res= response.data;
    Toast.success(res.message)
    dispatch(deleteTask(task.id))

  }).catch(function (error) {

   Toast.error('Something went wrong')


 
  });
    }

    const navigate=(task)=>{
        dispatch(setTask(task))
        window.location.replace(`/tasks/${task.id}`)

    }

    const handleComplete=(task)=>{
        var config = {
            method: "put",
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BACKEND_URL}/tasks/complete/${task.id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {},
          };

          axios(config)
          .then(function (response) {
            const res= response.data;
            Toast.success("Marked well")
            dispatch(updateTask(res.task))
        
          }).catch(function (error) {
        
           Toast.error('Something went wrong')
        
        
         
          });

        }

    const csvData = [
        ["ID", "Title", "Description", "Assignees", "Priority", "Attachments","Status"],
        ...tasks.map(({ id, title, description, assignees, priority, attachments,status }) => [
          id,
          title,
          description,
          users.filter((user)=>assignees.find(e=>e===user.id)).map((user)=>user.email).join(','),
          priority,
          attachments,
          status
        ]),
      ];


        
        

    

  
  return (
    
    <div className=''>
        <ToastContainer/>
           <section class="  flex  justify-center">
    <div className="container md:h-[80vh] h-full  mt-10 mb-10">
        <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
              {/* Export Button Start */}
      <CSVLink className="bg-blue-400 p-3 rounded" filename={`${Date.now().toFixed()}`+'-tasks.csv'} data={csvData}>
        Export to CSV
      </CSVLink>
     <Link to='/add-task'> 
        <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white'>
            Add Task
        </button>
        </Link>
        </div>
   
      <div className="flex flex-wrap ">
      {loading && <div
        className='flex justify-center items-center w-full h-[50vh] 
        text-blue-400 text-2xl'>Loading...</div>}
        {tasks&&tasks.map((task) => (
        
            <div
            key={task.id}
       
            className={`flex items-center md:w-1/4 w-full m-2 justify-between p-4 rounded-lg shadow mt-10 ${
              task.status==='completed' ? 'bg-green-200' : 'bg-gray-200'
            }`}
          >
                <Link to={`/tasks/${task.id}`}>
            <div>
            <span className="text-lg">{task.title}</span>
            <p>
                {task.description}
            </p>
            <div>
                
            </div>
            </div>
            </Link>
        <div>
            <span className='bg-red-400 px-1 text-white rounded' onClick={()=>handleDelete(task)}>
                delete
            </span>
        <input
              type="checkbox"
              checked={task.status==='completed'}
              onChange={()=>handleComplete(task)}
              className="ml-4"
              readOnly
            />

        </div>
        
          </div>
       
          
        ))}
      </div>
    </div>
    </section>
    <Footer/>
    </div>
  );
};

export default TasksScreen;
