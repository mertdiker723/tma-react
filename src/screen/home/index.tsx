import axios from "axios";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router";

// Material UI
import { Table, TableContainer, Paper, Container, Box, CircularProgress, Alert, Button } from "@mui/material";

// Icons
import SendIcon from '@mui/icons-material/Send';

// Core
import ITask from "../../core/models/task";

// Components
import TableHeadWrapper from "../../components/task/TableHeadWrapper";
import TableBodyWrapper from "../../components/task/TableBodyWrapper";

// Lib
import { getToken } from "../../lib/auth";

// Styles
import "./Style.scss";

type StateType = {
    tasks: ITask[];
    error: string | null;
    isLoading: boolean;
    loginUserId: string | null;
}

const Home = () => {
    const [state, setState] = useReducer((currentState: StateType, newState: Partial<StateType>) => ({ ...currentState, ...newState }), {
        tasks: [],
        error: null,
        isLoading: true,
        loginUserId: null
    });
    const navigate = useNavigate();
    const { id } = getToken();
    const { tasks, error, isLoading, loginUserId } = state;

    useEffect(() => {
        axios.get('/alltask')
            .then(res => {
                setState({ tasks: res?.data?.data });
                if (id) {
                    setState({ loginUserId: id });
                    return;
                }
                setState({ loginUserId: null });
            })
            .catch((err) => {
                setState({ error: err?.message });
            }
            ).finally(() => {
                setState({ isLoading: false });
            });
    }, [id]);

    const deleteTask = (id: string) => {
        axios.delete(`/task/${id}`)
            .then(() => {
                setState({
                    tasks: tasks.filter(task => task._id !== id)
                })
            })
            .catch((err) => {
                setState({
                    error: err?.message
                })
            });
    }

    const editTask = (id: string) => {
        navigate(`/task/${id}`);
    }

    const addTask = () => {
        navigate('/task');
    }

    return (
        <Container className="home__table-container">
            <Button type="button" onClick={addTask} variant="contained" sx={{ mb: 2 }} endIcon={<SendIcon />}>Add Task</Button>
            {
                isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    error ? <Alert sx={{ mt: 2 }} severity="error">{error}</Alert> : (
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHeadWrapper head={["Title", "Description", "Status"]} />
                                <TableBodyWrapper deleteTask={deleteTask} editTask={editTask} tasks={tasks} loginUserId={loginUserId} />
                            </Table>
                        </TableContainer>
                    )
                )
            }

        </Container>
    )
}

export default Home