import { Link } from 'react-router';

// MU - Components
import {
    AppBar,
    Box,
    Toolbar,
    Container,
    Button,

} from '@mui/material';

const pages = ['Home', 'Task', 'Dashboard'];
const uerPages = ['Login', 'Register'];

function Navbar() {
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
                        {uerPages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                component={Link}
                                to={`/${page.toLowerCase()}`}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
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