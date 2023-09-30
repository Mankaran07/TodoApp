import { 
    Card, 
    Typography, 
    TextField, 
    Button, 
    Checkbox, 
    Stack, 
    FormControlLabel,  
    } from '@mui/material';
import './css/Signup.css'
import AlertSnackbar from './Snackbar';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
const SignIn = () => {
    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [open , setOpen] = useState(false);
    const [snackbarMessage , setSnackbarMessage] = useState("");
    const [color , setColor] = useState("info");
    const url = import.meta.env.VITE_url;
    const validate = async () => {
        try {
            const data = {
                email: email,
                password: password
            };
            const response = await axios.post(url + '/auth/login' , data);
            const message = response.data.message;
            let token = undefined;
            if(response.data.token) {
                token = response.data.token;
            }
            console.log(response);
            localStorage.setItem('token' , token);
            setOpen(true);
            setColor("success");
            setSnackbarMessage(message);
            setTimeout(function() {
                navigate('/todo');
            },1000);
        }
        catch(error) {
            console.error('Error:' , error);
            const message = error.response.data;
            setOpen(true);
            setColor("error");
            setSnackbarMessage(message);
            setEmail("");
            setPassword("");
        }
    }
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
                    Welcome Back. Login Below
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
                        onChange= {e => setEmail(e.target.value)}
                        value={email}
                        label='Email' />
                    <TextField 
                        variant='outlined' 
                        onChange= {e => setPassword(e.target.value)}
                        value={password}
                        label='Password' 
                        type='Password' />
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
                        <FormControlLabel control={<Checkbox size="medium" />} label="Remember me" />
                    </Stack>
                    <Button 
                        variant='contained' 
                        size='large'
                        onClick= {validate}
                        >LOGIN</Button>
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

export default SignIn;