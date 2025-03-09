import { Link, useLocation, useNavigate } from 'react-router';

// MU - Components
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Button,

} from '@mui/material';
// Core
import { DASHBOARD, HOME, TASK } from '../../core/router/RoutesUrl';

const pages = ['Home', 'Task', 'Dashboard'];

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate();

    if (![HOME, TASK, DASHBOARD].includes(location.pathname)) return null;

    const logoutHandler = () => {
        localStorage.removeItem('token');
        setTimeout(() => {
            navigate('/login');
        }, 0);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                component={Link}
                                to={`/${page.toLowerCase()}`}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex' }}>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            type='button'
                            onClick={logoutHandler}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;