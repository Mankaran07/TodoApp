import Form from './Form';
import Todos from './Todos';
import EditForm from './EditForm';
import AlertSnackbar from './Snackbar';
import { useState , useEffect } from 'react';
import axios from 'axios';

 const Todo = () => {
  const url = "https://todoapp-backend-mc1o.onrender.com";
  const [todos , setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    try {
      const response = await axios.get(url + '/todos');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const addTodo = () => {
    try {
      fetchTodos(); 
    } catch (error) {
      console.error(error);
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
      await axios.put(url + `/todos/${updatedTodo.id}`, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
      setOpen(true);
      setSnackbarMessage('Todo Updated Successfully!!!');
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(url + `/todos/${todoId}`);
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
      setOpen(true);
      setSnackbarMessage('Todo Deleted Successfully!!!');
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  return(
    <>
      <Form addTodo={addTodo} />
      {editingTodo ? (
        <EditForm
          todo={editingTodo}
          onUpdate={updateTodo}
          onCancel={cancelEditing}
        />
      ) : (
        <Todos
          todos={todos}
          onEdit={startEditing}
          onDelete={deleteTodo}
        />
      )}
      <AlertSnackbar 
        open={open} 
        onClose={handleCloseSnackbar} 
        message={snackbarMessage} 
      />
    </>
  )  
}

export default Todo;