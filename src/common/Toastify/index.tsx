import { useEffect, useState } from "react";

import { IconButton, Snackbar } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

type ToastifyProps = {
    message: string,
    data: unknown,
}

const Toastify = ({ message, data }: ToastifyProps) => {
    const [openTostify, setOpenTostify] = useState(false);
    
    useEffect(() => {
        if (data) {
            setOpenTostify(true);
        }
    }, [data])

    const closeToastify = () => {
        setOpenTostify(false);
    }

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeToastify}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            open={openTostify}
            autoHideDuration={3000}
            onClose={closeToastify}
            message={message}
            action={action}
        />
    )
}

export default Toastify