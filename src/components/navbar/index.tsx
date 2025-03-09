import { useEffect, useState } from 'react';
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
import { LOGIN, REGISTER } from '../../core/router/RoutesUrl';
import { getToken } from '../../lib/auth';

const pages = ['Home', 'Task'];

const Navbar = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const location = useLocation()
    const navigate = useNavigate();
    const { id } = getToken();

    useEffect(() => {
        if (id) {
            setUserId(id)
            return;
        }
        setUserId(null);
    }, [id]);

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
                        {pages.map((page) => {
                            const isActive = location.pathname === `/${page.toLowerCase()}`;
                            return (
                                <Button
                                    key={page}
                                    sx={{ my: 2, mr: 1, color: 'white', backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent' }}
                                    component={Link}
                                    to={`/${page.toLowerCase()}`}
                                >
                                    {page}
                                </Button>
                            );
                        })}
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