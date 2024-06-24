import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

    export default function Error404(){
        const location = useLocation();
        const navigate = useNavigate();
        console.log(location.state);
        return (
            <Container component={Paper}>
                <Typography variant="h5" gutterBottom>404 Error</Typography>
                <div>{location.state ? location.state.error : 'Internal Server Error'}</div>
                <Divider></Divider>
                <Button onClick={()=>{navigate(-1)}}>Go Back</Button>
            </Container>
        );

    }