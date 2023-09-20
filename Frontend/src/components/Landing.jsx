import { Stack , Typography} from "@mui/material";
import './css/Landing.css'

const Landing = () => {
    return(
        <>
        <div className="card">
            <Stack
                direction={"row"}
                justifyContent={"space-around"}
                spacing={0}
                color={'#112D4E'}
                className="box"
            >
                <Stack
                    alignItems={"flex-start"}
                    width={'50%'}
                >
                    <Typography variant="overline" fontSize={30} fontWeight={200} fontFamily={'Segoe UI'}>Efficient way to add todos</Typography>
                    <Typography variant="h3" mb={4} fontSize={40} fontWeight={800} fontFamily={'Segoe UI'} width={'50%'}>Stay organized and manage your tasks effortlessly with our intuitive todo app.</Typography>
                    <Typography variant="subtitle1" fontSize={20} fontFamily={'Segoe UI'}>Ready to get started? Click the <strong><i>Sign Up</i></strong> button to create your account now!</Typography>
                </Stack>
                <Stack justifyContent={"flex-start"} alignItems={"center"}>
                </Stack>
            </Stack>
        </div>
        </>
    )
}


export default Landing;