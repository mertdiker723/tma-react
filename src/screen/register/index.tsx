import { useNavigate } from "react-router";
import { useActionState, useEffect, useState } from "react";
import { Alert, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';

// Components
import { submitForm } from "../../components/register/action";

// Styles
import "./Style.scss"

const Register = () => {
    const [stateItem, formAction, isPending] = useActionState(submitForm, undefined);
    const [status, setState] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const { data, token } = stateItem || {};

        if (data && token) {
            localStorage.setItem("token", token);
            setTimeout(() => {
                navigate('/');
            }, 0);
        }
    }, [stateItem, navigate])


    return (
        <Container className="register__container">
            <form className="form-control" action={formAction}>
                <Grid container spacing={2} className="grid-wrapper">
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h6">TMA - Register</Typography>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            name="userName"
                            placeholder="Enter username"
                            required
                        />
                    </Grid>
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
                    <Grid size={{ xs: 12 }} className="checkbox-field">
                        <FormControlLabel
                            control={<Checkbox name="status" checked={status} onChange={(e) => setState(e.target.checked)} />}
                            label="Register, as admin user!"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button loading={isPending} fullWidth variant="contained" type="submit">Register</Button>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button onClick={() => navigate("/login")} fullWidth variant="outlined" type="button">Back to Login</Button>
                    </Grid>
                    {
                        !stateItem?.success && stateItem?.message && (
                            <Grid size={{ xs: 12 }}>
                                <Alert sx={{ mt: 2 }} severity="error">{stateItem?.message}</Alert>
                            </Grid>
                        )
                    }
                </Grid>
            </form>
        </Container>
    )
}

export default Register