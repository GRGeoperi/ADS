import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }
            const result = await response.json();
            setAlertMessage(result.message);
            setUsers(users.filter(user => user.id_usuario !== id));
        } catch (err) {
            setError(err.message);
        }
    };    

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Altura completa de la ventana
    };

    const tableStyle = {
        width: 'auto', // Ajusta la tabla al contenido
        margin: '0 auto', // Centra la tabla horizontalmente
    };

    return (
        <div style={containerStyle}>
        {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
        <TableContainer component={Paper} style={tableStyle}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Alias</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {users.map((user) => (
                            <TableRow>
                                <TableCell>{user.id_usuario}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.nombre}</TableCell>
                                <TableCell>{user.alias}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleDelete(user.id_usuario)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserTable;