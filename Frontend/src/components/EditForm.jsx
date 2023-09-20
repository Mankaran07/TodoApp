/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { Card , TextField , Button } from '@mui/material';

const EditForm = ({ todo, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const handleSubmit = async () => {
  const url = "https://todoapp-backend-mc1o.onrender.com"
    try {
      const updatedTodo = {
        id: todo.id,
        title,
        description,
      };
      await axios.put(url + `/todos/${todo.id}`, updatedTodo);
      onUpdate(updatedTodo);
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
          backdropFilter: 'blur(8px)',
          transition: 'backdrop-filter 0.3s ease-in-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '36%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          display:'block',
        }}
      >
        <Card
          variant="outlined"
          style={{
            width: '300%',
            height: '35vh',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
          }}
        >
          <TextField
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            style={{ width: '90%' }}
          />
          <TextField
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            style={{ width: '90%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1%', gap: '1%' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
              onClick={handleSubmit}
            >
              Update
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'error.main',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'error.dark',
                },
              }}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default EditForm;