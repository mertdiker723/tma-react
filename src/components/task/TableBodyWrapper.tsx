import ITask from "../../core/models/task";

import { Button, TableBody, TableCell, TableRow } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';

type TableBodyWrapperProps = {
    tasks: ITask[];
    editTask: (id: string) => void;
    deleteTask: (id: string) => void;
    loginUserId?: string | null;
}

const TableBodyWrapper = ({ tasks, editTask, deleteTask, loginUserId }: TableBodyWrapperProps) => {
    const authorizationButtons = (userId: string) => {
        if (!loginUserId) {
            return false
        }
        return userId !== loginUserId
    }
    return (
        <TableBody>
            {tasks?.map((row) => {
                const { _id, title, description, status, userId } = row || {};

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
                                disabled={authorizationButtons(userId)}
                                onClick={() => editTask(_id)}>
                                Update
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                type='button'
                                sx={{ marginLeft: 2 }}
                                disabled={authorizationButtons(userId)}
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