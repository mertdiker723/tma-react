import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


// Material UI
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Container, Button, CircularProgress, Box, Alert } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

// Core
import ITask from '../../core/models/task';

// Components
import TableHeadWrapper from '../../components/task/TableHeadWrapper';

// Styles
import "./Style.scss";

const Dashboard = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/task')
            .then(res => {
                setTasks(res?.data?.data);
            })
            .catch((err) => {
                setError(err?.message);
            }
            ).finally(() => {
                setIsLoading(false);
            });
    }, []);

    const deleteTask = (id: string) => {
        axios.delete(`/task/${id}`)
            .then(res => {
                console.log(res);
                setTasks(tasks.filter(task => task._id !== id));
            })
            .catch((err) => {
                setError(err?.message);
            });
    }

    const editTask = (id: string) => {
        navigate(`/task/${id}`);
    }

    return (
        <Container className='table-container'>
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
                                <TableBody>
                                    {tasks?.map((row) => {
                                        const { _id, title, description, status } = row || {};
                                        return (
                                            <TableRow
                                                key={_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {title}
                                                </TableCell>
                                                <TableCell>{description}</TableCell>
                                                <TableCell><CircleIcon sx={{ color: status ? 'green' : "red" }} /></TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        type='button'
                                                        onClick={() => editTask(_id)}>
                                                        Update
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        type='button'
                                                        sx={{ marginLeft: 2 }}
                                                        onClick={() => deleteTask(_id)}>
                                                        Delete
                                                    </Button>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    )
                )
            }
        </Container>
    );
}

export default Dashboard