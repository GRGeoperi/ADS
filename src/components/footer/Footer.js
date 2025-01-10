import * as React from 'react';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import AppTheme from '../shared-theme/AppTheme';

export default function Footer(props) {
    return (
        <AppTheme {...props}>
            <Box position="absolute" width="100%" bottom={0} py={4}>
                <Container direction="column" justifyContent="center">
                    <Box
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", lg: "row" }}
                        justifyContent="center"
                        alignItems="center"
                        px={1.5}
                    >
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexWrap="wrap"
                            color="white"
                        >
                            &copy; {new Date().getFullYear()}, creado para la materia
                            de Análisis y Diseño de Sistemas
                        </Box>
                        <Box
                            component="ul"
                            sx={({ breakpoints }) => ({
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "center",
                                listStyle: "none",
                                mt: 3,
                                mb: 0,
                                p: 0,

                                [breakpoints.up("lg")]: {
                                    mt: 0,
                                },
                            })}
                        >
                        </Box>
                    </Box>
                </Container>
            </Box>
        </AppTheme>
    );
}
