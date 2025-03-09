import { Alert, Stack } from "@mui/material"
import { Link } from "react-router"


const NotFound = () => {
    return (
        <Stack sx={{ width: '100%', display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }} spacing={2}>
            <Alert severity="warning">Page not Found (404). <Link to="/">Please go back to Home Page</Link></Alert>

        </Stack>
    )
}

export default NotFound