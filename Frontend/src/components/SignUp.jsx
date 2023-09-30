import './css/SignUp.css'
import { Card, Typography, TextField, Button , Stack } from '@mui/material';
import { useState } from 'react';
import AlertSnackbar from './Snackbar';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [open , setOpen] = useState(false);
    const [snackbarMessage , setSnackbarMessage] = useState("");
    const [color , setColor] = useState("info");
    const url = import.meta.env.VITE_url;
    const validate = async () => {
        try {
            
            const data = {
                username: username,
                email: email,
                password: password
            };

            const response = await axios.post(url + '/auth/signup' , data);
            const {message , token} = response.data;
            localStorage.setItem('token' , token);
            setOpen(true);
            setColor("success");
            setSnackbarMessage(message);
            setTimeout(function() {
                navigate('/todo');
            },1000);
        }
        catch(error){
            console.error('Error:' , error);
            const message = error.response.data;
            setOpen(true);
            setColor("error");
            setSnackbarMessage(message);
            setUsername("");
            setEmail("");
            setPassword("");
        }
    };
    const handleCloseSnackbar = () => {
        setOpen(false);
    };
    return (
        <>
        <Stack>
            <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                pt={15}
                >
                <Typography variant='h4' color={'#112D4E'}>
                    Welcome to <strong>Taskify</strong>. Sign Up Below
                </Typography>

            </Stack>
            <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                pt={3}
            >
                <Card variant="outlined" className='card-Signup'>
                <TextField 
                        variant='outlined' 
                        onChange= {e => setUsername(e.target.value)}
                        value={username}
                        label='Username' />
                    <TextField 
                        variant='outlined' 
                        onChange= {e => setEmail(e.target.value)}
                        value={email}
                        label='Email' />
                    <TextField 
                        variant='outlined' 
                        onChange= {e => setPassword(e.target.value)}
                        value={password}
                        label='Password' 
                        type='Password' />
                    <Button 
                        variant='contained' 
                        size='large'
                        onClick= {validate}
                        >SignUp</Button>
                </Card>
            </Stack>
        </Stack>
        <AlertSnackbar 
        open={open} 
        onClose={handleCloseSnackbar} 
        message={snackbarMessage} 
        color = {color}
        />
        </>
    )
}

export default SignUp;