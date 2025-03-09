import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';

// MU - Components
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Button,

} from '@mui/material';

// Core
import { LOGIN, REGISTER } from '../../core/router/RoutesUrl';
import { getToken } from '../../lib/auth';

const pages = ['Home', 'Task', 'Dashboard'];

const Navbar = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const location = useLocation()
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (token) {
            try {
                const { id }: { id: string } = jwtDecode(token);
                setUserId(id);
            } catch {
                setUserId(null);
            }
        } else {
            setUserId(null);
        }
    }, [token]);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    if (!userId || [LOGIN, REGISTER].includes(location.pathname)) return null;

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