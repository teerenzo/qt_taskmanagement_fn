import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../includes/footer";
import { useSelector,useDispatch } from 'react-redux';
import { fetchTasks } from "../../redux/features/actions/tasks";
const Dashboard = () => {

  const dispatch = useDispatch();

  const {tasks, loading, error} = useSelector(state => state.tasks);

  const token = localStorage.getItem('token');
  console.log(tasks)

  useEffect(() => {
      dispatch(fetchTasks());
  
  }

  , [dispatch]);

  return (
    <>
    <div className="App">
      <div className="form">
        <div class="flex gap-20 justify-center">
          <div class="card">
            <h2>All Tasks(s)</h2>
            <p>
              {tasks&&tasks.length}<small></small>
            </p>
          </div>

          <div class="card">
            <h2>Completed Task(s)</h2>
            <p>
              {tasks&&tasks.filter((task) => task.status === "completed").length}
            </p>
          </div>

        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;
