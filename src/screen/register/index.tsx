import { useActionState } from "react";
import { Button, Container, TextField } from "@mui/material"
import Grid from '@mui/material/Grid2';

// Components
import { submitForm } from "../../components/register/action";

// Styles
import "./Style.scss"
import Toastify from "../../common/Toastify";

const Register = () => {
    const [stateItem, formAction, isPending] = useActionState(submitForm, undefined);
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
                </Grid>
            </form>
            <Toastify
                data={stateItem?.data}
                message="User created"
            />
        </Container>
    )
}

export default Register