import React, {useState, useContext, useEffect} from 'react';

import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

import uuid from 'react-uuid';

import firebase from 'firebase';

import {UserContext} from '../Context/Context';

function Task () {

  const {user} = useContext(UserContext);

  const [show, setShow] = useState(false);

  const [tasks, setTasks] = useState([]);

  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function fetchTask(){
    let userTaskDesc = [];
    firebase.database().ref('task/').once('value')
    .then(snapshot=>
      {
        let x = 0;
        let y = snapshot.val();
        for (x in y){
            if(y[x].taskCreater === user.id)
            {
              userTaskDesc.push(y[x]);
            }
        }
        setTasks(userTaskDesc);
     }
    );
    }

  useEffect(() => {
    fetchTask();
  });

  function handleCreateParentTask(){
    handleClose();
    let taskId = uuid();
    let data = {};
    data.taskName = taskName;
    data.taskDesc = taskDesc;
    data.child = '';
    data.taskCreater = user.id;
    firebase.database().ref('task/'+taskId).set(data);
    firebase.database().ref('users/'+user.id).once('value')
    .then(snapshot=>{
      let userTaskList = snapshot.val().taskList;
      let userTaskDesc = [];
      userTaskList.push(taskId);
      firebase.database().ref('users/'+user.id).update({taskList:userTaskList});
      firebase.database().ref('task/').once('value')
      .then(snapshot=>
        {
          let x = 0;
          let y = snapshot.val();
          for (x in y){
              if(y[x].taskCreater === user.id)
              {
                userTaskDesc.push(y[x]);
              }
          }
          setTasks(userTaskDesc);
          console.log(userTaskDesc);
        }
      );
    });
    }
  return (
    <div>
      <p>THIS IS TASK PAGE</p>
      <div>
      {
        tasks.map(task => (
          <li key={task.taskName}>
          {task.taskName}
        </li>
        )
        )
      }
      </div>
      <div>
      <Button variant="primary" onClick={handleShow}>
        Create Task
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <p>Task Name</p>
            <input type="text" placeholder="Name the Task" onChange={(e) => setTaskName(e.target.value)}/>
            <p>Description</p>
            <input type="text" placeholder='Task Description' onChange={(e) => setTaskDesc(e.target.value)}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreateParentTask}>
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  )
}

export default Task;
