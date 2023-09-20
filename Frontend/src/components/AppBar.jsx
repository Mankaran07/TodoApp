import { Button , Divider , Typography , Stack} from "@mui/material";
import {useNavigate} from 'react-router-dom'
// import { useState  } from "react";
// import axios from "axios";
import './css/AppBar.css'
// import { fetchUsername } from "./Username";

// const fetchUsername = async () => {
//     try {
//         const url = "http://localhost:3004/auth/me"; 
//         const token = localStorage.getItem('token');
//         if(!token) return "";
//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return response.data.username;
//     }
//     catch(error) {
//         console.error(error);
//     }
// }

const AppBar = () => {
    const navigate = useNavigate();
    // const [username , setUsername] = useState("");
    // useEffect(() => {
        // fetchUsername().then((res) => {
        //     setUsername(res);
        //     console.log("res");
        // })
    // } , []);
    // const logout = async () => {
    //     try {
    //         localStorage.removeItem('token');
    //         setUsername("");
    //         navigate('/');
    //     }
    //     catch(error) {
    //         console.error(error);
    //     }
    // }
    return (
        <Stack 
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"baseline"}
            className="nav-bar"
        >
            <Stack>
                <div onClick={() => {navigate('/')}} style={{cursor:"pointer"}}><Typography variant="h3" to="/" color={'#112D4E'}><strong><i>ToDo</i></strong></Typography></div>
            </Stack>
            <Stack 
                direction={"row"} 
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                {/* {username === "" ? ( */}
                    {/* <> */}
                    <Button variant="outlined" size="large" onClick={() => {navigate('/auth/login')}}>LogIn</Button>
                    <Button variant="contained" size="large" onClick={() => {navigate('/auth/signup')}}>SignUp</Button>
                    {/* </> */}
                {/* ) : (
                    <>
                    <Typography variant="h4" fontWeight={500} fontFamily={'Segoe UI'} color={'#112D4E'}>Hi, {username}</Typography>
                    // <Button variant="contained" size="large" onClick={logout}>LogOut</Button> 
                    </>
                )} */}
                
            </Stack>
        </Stack>
    )

}


export default AppBar;