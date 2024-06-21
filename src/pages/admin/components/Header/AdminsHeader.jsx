import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';

const pages = [];
const settings = ['Profile', 'Logout'];

function AdminsHeader({ isSidebarOpen }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const profile = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();
    const userData = localStorage.getItem('userData');

    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData._id) {
            const profileId = userData._id;
            dispatch(fetchSingleProfile(profileId));
        }
    }, [dispatch]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        const cookies = new Cookies();


        // Clear all cookies
        const allCookies = cookies.getAll();
        Object.keys(allCookies).forEach(cookieName => {
            cookies.remove(cookieName, { path: '/' });
        });

        // Clear local storage
        localStorage.clear();

        // Navigate to the login page
        navigate('/');
    };

    return (
        <AppBar
            position="relative"
            sx={{
                backgroundColor: '#8c7569',
                width: `calc(100% - ${isSidebarOpen ? '120px' : '100px'})`,
                marginLeft: '50px',
                transition: 'width 0.5s, margin-left 0.5s'
            }}
        >
            <Container sx={{ width: '100%' }}>
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' } }} /> */}
                    <Typography
                        variant="h3"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SMSP
                    </Typography>

                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' } }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SMSP
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={profile ? profile.onCloudinaryLink : "https://i.pinimg.com/736x/7b/8c/d8/7b8cd8b068e4b9f80b4bcf0928d7d499.jpg"} />
                                <Typography sx={{ color: 'white', marginLeft: '15px' }}>{profile && `Hello, ${profile.fullName}`}</Typography>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        if (setting === 'Logout') {
                                            handleLogout();
                                        }
                                        else if (setting === 'Profile') {
                                            navigate('/admin/profile')
                                        }
                                    }}
                                >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AdminsHeader;