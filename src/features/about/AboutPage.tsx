import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const config = {
        headers: {'content-type': 'application/json'}
    };

    let navigate = useNavigate();

    return (
        <Container>
            <Typography gutterBottom variant="h2">
                Testing Error messages
            </Typography>

            <ButtonGroup fullWidth>
                <Button
                    variant="contained"
                    onClick={() => axios.post('buggy/validate-error', {name: 'e', email: 'few'}, config)
                                        .then(response => response.data)
                                        .catch(errors => setValidationErrors(errors))}
                >Test Validation Error</Button>

                <Button
                    variant="contained"
                    onClick={() => axios.get('buggy/404')
                                        .then(response => response.data)
                                        .catch((error: AxiosError) => console.log(error.response?.data))}
                >Test error 404</Button>

                <Button
                    variant="contained"
                    onClick={() => axios.get('buggy/500')
                                        .then(response => response.data)
                                        .catch((error: AxiosError) => console.log(error.response?.data))}
                >Test Error 500</Button>
            </ButtonGroup>

            {validationErrors.length > 0 && 
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }

        </Container>
    );
}