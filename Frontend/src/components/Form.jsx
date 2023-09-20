/* eslint-disable react/prop-types */
import { Button, Card, Stack, TextField, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useState , forwardRef} from "react";
import axios from "axios";


const Form = ({addTodo}) => {
    const url = "https://todoapp-backend-mc1o.onrender.com";
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [open , setOpen] = useState(false);
    const [error , setError] = useState(false);
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
        setError(false);
    };
    const addNew = async () => {
        try {
            const res = await axios.post(url + '/todos', {
              title,
              description,
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            addTodo(res.data)
            setOpen(true);
            setTitle('');
            setDescription('');
        } 
        catch (error) {
            setError(true);
            setTitle('');
            setDescription('');
        }
    };
    return(
        <Stack 
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            padding={2}
            mt={1}
        >
            <Card 
                variant="outlined" 
                style={{
                    width:"40%",
                    height:"35vh", 
                    display:"flex",
                    justifyContent:"space-evenly", 
                    flexDirection:"column",
                    gap:3,
                    alignItems:"center"
                }}
            >
                <TextField
                    variant="outlined"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    label='Title'
                    style={{width:"90%"}}
                />
                <TextField
                    variant="outlined"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    label="Description"
                    style={{width:"90%"}}
                />
                <Button variant="contained" size="large" style={{width:"30%"}} onClick={addNew}>Submit</Button>
            </Card>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '200%' , fontSize: 20 }}>
                    Todo Added Successfully!!!
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '200%' , fontSize: 20 }}>
                    Title or Desciption Required!!!
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default Form;