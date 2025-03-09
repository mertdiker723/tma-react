import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Container, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';


// Styles
import "./Style.scss";
import { submitForm } from "../../components/login/action";


const Login = () => {
    const [stateItem, formAction, isPending] = useActionState(submitForm, undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const { data, token } = stateItem || {};

        if (data && token) {
            localStorage.setItem("token", token);
        }
    }, [stateItem])

    return (
        <Container className="login__container">
            <form className="form-control" action={formAction}>
                <Grid container spacing={2} className="grid-wrapper">
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            name="email"
                            placeholder="Enter email"
                            type="email"
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button loading={isPending} fullWidth variant="contained" type="submit">Login</Button>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button onClick={() => navigate("/register")} fullWidth variant="outlined" type="button">Register</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Login