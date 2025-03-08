import axios from "axios";
import { useEffect, useReducer } from "react";

// Material UI
import { Table, TableContainer, Paper, Container, Box, CircularProgress, Alert } from "@mui/material";

// Core
import ITask from "../../core/models/task";

// Components
import TableHeadWrapper from "../../components/task/TableHeadWrapper";
import TableBodyWrapper from "../../components/task/TableBodyWrapper";

// Styles
import "./Style.scss";

type StateType = {
    tasks: ITask[];
    error: string | null;
    isLoading: boolean;
}

const Home = () => {
    const [state, setState] = useReducer((currentState: StateType, newState: Partial<StateType>) => ({ ...currentState, ...newState }), {
        tasks: [],
        error: null,
        isLoading: true
    });
    const { tasks, error, isLoading } = state;

    useEffect(() => {
        axios.get('/task')
            .then(res => {
                setState({ tasks: res?.data?.data });
            })
            .catch((err) => {
                setState({ error: err?.message });
            }
            ).finally(() => {
                setState({ isLoading: false });
            });
    }, []);

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
                                <TableBodyWrapper deleteTask={() => { }} editTask={() => { }} tasks={tasks} disableButtons />
                            </Table>
                        </TableContainer>
                    )
                )
            }

        </Container>
    )
}

export default Home