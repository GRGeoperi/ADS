import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import { Link } from 'react-router-dom';
import SvgIcon from '@mui/material/SvgIcon';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import DashboardIcon from '@mui/icons-material/Dashboard';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const NavBarContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 1dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export default function NavBar({ isAuthenticated }) {
    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <NavBarContainer direction="column" justifyContent="space-between">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button variant="contained" color="primary" size="small">
                                <HomeIcon fontSize="small" />
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        {isAuthenticated ? (
                            // Navbar para usuarios autenticados
                            <>
                                <Link to="/dashboard" variant="text" color="inherit">
                                    <Button color="primary" variant="text" size="small">
                                        <DashboardIcon fontSize="small" />
                                    </Button>
                                </Link>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                        localStorage.removeItem("token"); // Elimina el token
                                        window.location.reload(); // Recarga la página
                                        window.location.href = "/"; // Redirige a la página de inicio
                                    }}
                                >
                                    <LockIcon fontSize="small" />
                                </Button>
                                <ColorModeIconDropdown />
                            </>
                        ) : (
                            // Navbar para usuarios no autenticados
                            <>
                                <Link to="/signin" variant="text" color="inherit">
                                    <Button color="primary" variant="text" size="small">
                                        <LoginIcon fontSize="small" />
                                    </Button>
                                </Link>
                                <Link to="/signup" variant="text" color="inherit">
                                    <Button color="primary" variant="contained" size="small">
                                        Registrarse
                                    </Button>
                                </Link>
                                <ColorModeIconDropdown />
                            </>
                        )}
                    </Box>
                </StyledToolbar>
            </NavBarContainer>
        </AppTheme>
    );
}
