import axios from "axios";
import { useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

// Material UI
import { Table, TableContainer, Paper, Container, Box, CircularProgress, Alert } from "@mui/material";

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
    const token = getToken();
    const { tasks, error, isLoading, loginUserId } = state;

    useEffect(() => {
        axios.get('/alltask')
            .then(res => {
                setState({ tasks: res?.data?.data });
                if (token) {
                    try {
                        const { id }: { id: string } = jwtDecode(token);
                        setState({ loginUserId: id });
                    } catch {
                        setState({ loginUserId: null });
                    }
                }

            })
            .catch((err) => {
                setState({ error: err?.message });
            }
            ).finally(() => {
                setState({ isLoading: false });
            });
    }, [token]);

    const deleteTask = (id: string) => {
        axios.delete(`/task/${id}`)
            .then(res => {
                console.log(res);
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


    return (
        <Container className="home__table-container">
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