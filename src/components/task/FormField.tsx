import { useActionState } from "react";
// import axios from "axios";
import { Alert, Button, Checkbox, Container, FormControlLabel, TextField } from "@mui/material"
import Grid from '@mui/material/Grid2';

// Common
import Toastify from "../../common/Toastify";

// Action
import { submitForm } from "./action";

// Icons
import SendIcon from '@mui/icons-material/Send';

// Styles
import "./Style.scss"

const FormField = () => {
    const [state, formAction, isPending] = useActionState(submitForm, undefined);

    return (
        <Container className="form-control-container">
            <form action={formAction} className="form-control">
                <Grid container spacing={2} className="grid-wrapper">
                    <Grid size={{ xs: 6, sm: 12 }}>
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            name="title"
                            placeholder="Enter task title"
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12 }}>
                        <TextField
                            id="outlined-basic"
                            label="Description"
                            placeholder="Enter task description"
                            name="description"
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12 }} className="checkbox-field">
                        <FormControlLabel disabled control={<Checkbox />} label="Status" />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12 }}>
                        <Button
                            loading={isPending}
                            variant="contained"
                            type="submit"
                            endIcon={<SendIcon />}
                        >
                            Add Task
                        </Button>
                    </Grid>
                </Grid>
                {!state?.success && state?.message && <Alert sx={{ mt: 2 }} severity="error">{state?.message}</Alert>}
            </form>
            <Toastify
                data={state?.data}
                message={`Title: ${state?.data?.title} added!`}
            />
        </Container>
    )
}

export default FormField