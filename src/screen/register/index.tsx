import { useNavigate } from "react-router";
import { useActionState } from "react";
import { Button, Container, TextField } from "@mui/material"
import Grid from '@mui/material/Grid2';

// Components
import { submitForm } from "../../components/register/action";

// Styles
import "./Style.scss"

const Register = () => {
    const [, formAction, isPending] = useActionState(submitForm, undefined);
    const navigate = useNavigate();

    return (
        <Container className="register__container">
            <form className="form-control" action={formAction}>
                <Grid container spacing={2} className="grid-wrapper">
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
                    <Grid size={{ xs: 12 }}>
                        <Button loading={isPending} fullWidth variant="contained" type="submit">Register</Button>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button onClick={() => navigate("/login")} fullWidth variant="outlined" type="button">Back to Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Register