import { useActionState, useEffect, useReducer } from "react";
import { useParams } from "react-router";
import axios from "axios";

// MUI
import { Alert, Button, Checkbox, Container, FormControlLabel, TextField } from "@mui/material"
import Grid from '@mui/material/Grid2';

// Common
import Toastify from "../../common/Toastify";

// Action
import { submitForm } from "../../components/task/action";

// Icons
import SendIcon from '@mui/icons-material/Send';

// Styles
import "./Style.scss"

type StateType = {
    title: string | null;
    description: string | null;
    status: boolean;
    error: string | null;
}


const Task = () => {
    const [stateItem, formAction, isPending] = useActionState(submitForm, undefined);
    const { id } = useParams<{ id?: string }>();

    const [state, setState] = useReducer((currentState: StateType, newState: Partial<StateType>) => ({ ...currentState, ...newState }), {
        title: null,
        description: null,
        status: false,
        error: null
    });
    const { title, description, status } = state || {};

    useEffect(() => {
        if (stateItem?.success && stateItem?.data) {
            setState({
                title: stateItem.data.title,
                description: stateItem.data.description,
                status: stateItem.data.status
            });
        }
    }, [id, stateItem]);

    useEffect(() => {
        if (id) {
            axios.get(`/task/${id}`)
                .then(res => {
                    const { title, description, status } = res?.data?.data || {};

                    setState({
                        title,
                        description,
                        status
                    })
                })
                .catch((err) => {
                    setState({
                        error: err?.message
                    })
                })
        }
    }, [id])

    return (
        <Container className="form-control-container">
            <form action={formAction} className="form-control">
                <input type="hidden" name="id" value={id || ""} />
                <Grid container spacing={2} className="grid-wrapper">
                    <Grid size={{ xs: 6, sm: 12 }}>
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            name="title"
                            placeholder="Enter task title"
                            required
                            defaultValue={title}
                            focused
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12 }}>
                        <TextField
                            id="outlined-basic"
                            label="Description"
                            placeholder="Enter task description"
                            name="description"
                            defaultValue={description}
                            focused
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12 }} className="checkbox-field">
                        <FormControlLabel
                            disabled={!id}
                            control={<Checkbox name="status" checked={status} onChange={(e) => setState({ status: e.target.checked })} />}
                            label="Status"
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 12 }}>
                        <Button
                            loading={isPending}
                            variant="contained"
                            type="submit"
                            color={id ? 'success' : 'primary'}
                            defaultChecked={status}
                            endIcon={<SendIcon />}
                            fullWidth
                        >
                            {id ? 'Update' : 'Add'} Task
                        </Button>
                    </Grid>
                </Grid>
                {!stateItem?.success && stateItem?.message && <Alert sx={{ mt: 2 }} severity="error">{stateItem?.message}</Alert>}
            </form>
            <Toastify
                data={stateItem?.data}
                message={`Title: ${stateItem?.data?.title} ${id ? 'updated' : 'added!'}`}
            />
        </Container>
    )
}

export default Task