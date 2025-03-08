import ITask from "../../core/models/task";

import { Button, TableBody, TableCell, TableRow } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';

type TableBodyWrapperProps = {
    tasks: ITask[];
    editTask: (id: string) => void;
    deleteTask: (id: string) => void;
    disableButtons?: boolean;
}

const TableBodyWrapper = ({ tasks, editTask, deleteTask, disableButtons = false }: TableBodyWrapperProps) => {
    return (
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
                                disabled={disableButtons}
                                onClick={() => editTask(_id)}>
                                Update
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                type='button'
                                sx={{ marginLeft: 2 }}
                                disabled={disableButtons}
                                onClick={() => deleteTask(_id)}>
                                Delete
                            </Button>
                        </TableCell>

                    </TableRow>
                )
            })}
        </TableBody>
    )
}

export default TableBodyWrapper