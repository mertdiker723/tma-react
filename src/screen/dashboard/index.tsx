import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


// Material UI
import { Table, TableContainer, Paper, Container, CircularProgress, Box, Alert } from '@mui/material';

// Core
import ITask from '../../core/models/task';

// Components
import TableHeadWrapper from '../../components/task/TableHeadWrapper';
import TableBodyWrapper from '../../components/task/TableBodyWrapper';

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
                const message = err?.response?.data?.message || 'An error occurred';
                setError(message);
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
                                <TableBodyWrapper deleteTask={deleteTask} editTask={editTask} tasks={tasks} />
                            </Table>
                        </TableContainer>
                    )
                )
            }
        </Container>
    );
}

export default Dashboard