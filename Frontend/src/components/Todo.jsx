import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Todos from './Todos';
import EditForm from './EditForm';
import AlertSnackbar from './Snackbar';

const Todo = () => {
  const navigate = useNavigate();
  const url = 'http://localhost:3004/todo';
  const axiosInstance = axios.create({
    baseURL: url,
  });

  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [color, setColor] = useState('info');

  useEffect(() => {
    fetchTodos();
  } , []);

  const checkTokenAndRedirect = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setOpen(true);
      setSnackbarMessage('Login to add todo');
      setColor('info');
      setTimeout(() => {
        navigate('/');
      }, 2000);
      return false;
    }
    return true;
  };

  const fetchTodos = async () => {
    try {
      if (!checkTokenAndRedirect()) return;

      const response = await axiosInstance.get('/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
      handleError(error);
    }
  };

  const handleError = (error) => {
    console.error(error);
    const message = error.response?.data?.error || 'An error occurred';
    setOpen(true);
    setSnackbarMessage(message);
    setColor('error');
  };

  const addTodo = () => {
    try {
      if (!checkTokenAndRedirect()) return;
      fetchTodos();
    } catch (error) {
      handleError(error);
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
  };

  const updateTodo = async (updatedTodo) => {
    try {
      if (!checkTokenAndRedirect()) return;

      await axiosInstance.put(`/todos/${updatedTodo.todoId}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const updatedTodos = todos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
      setOpen(true);
      setSnackbarMessage('Todo Updated Successfully!!!');
      setColor('success');

      // Call fetchTodos after successful update
      fetchTodos();
    } catch (error) {
      handleError(error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      if (!checkTokenAndRedirect()) return;

      await axiosInstance.delete(`/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const updatedTodos = todos.filter((todo) => todo._id !== todoId);
      setTodos(updatedTodos);
      setOpen(true);
      setSnackbarMessage('Todo Deleted Successfully!!!');
      setColor('success');

      // Call fetchTodos after successful delete
      fetchTodos();
    } catch (error) {
      handleError(error);
    }
  };

  const completeTodo = async (todoId) => {
    try {
      if (!checkTokenAndRedirect()) return;
  
      const response = await axiosInstance.patch(`/todos/${todoId}/done`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          userId: localStorage.getItem('userId'), // Include the userId in the headers
        },
      });
  
      // Check if the response contains the updated todo
      if (response.data) {
        // Toggle the "done" property by reversing its current value
        const updatedTodos = todos.map((todo) => {
          if (todo._id === todoId) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setOpen(true);
        setSnackbarMessage('Todo status updated');
        setColor('success');
  
        // Call fetchTodos to refresh the list
        fetchTodos();
      } else {
        // Handle the case where the backend does not return the updated todo
        handleError({ response: { data: { error: 'Todo not found' } } });
      }
    } catch (error) {
      handleError(error);
    }
  };
  
  

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <>
      <Form addTodo={addTodo} />
      {editingTodo ? (
        <EditForm todo={editingTodo} onUpdate={updateTodo} onCancel={cancelEditing} />
      ) : (
        <Todos
          todos={todos}
          onEdit={startEditing}
          onDelete={deleteTodo}
          onDone={completeTodo}
        />
      )}
      <AlertSnackbar open={open} onClose={handleCloseSnackbar} message={snackbarMessage} color={color} />
    </>
  );
};

export default Todo;
