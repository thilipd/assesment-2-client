import React, { useEffect, useState } from 'react';
import axios from './axios/axios';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const ListMovies = ({ movies, load, setLoad }) => {

    let local = JSON.parse(localStorage.getItem('movieLogin'));

    const navigate = useNavigate();

    const handleEdit = (id) => {
        if (local) {

            if (local.name == 'admin') {

                navigate(`/movie/${id}`)
            }
        } else {

            return toast('Invalid request, Only admin can access')
        }
    }

    const handleDelete = async (id) => {


        setLoad(true)
        console.log(id)

        if (local) {

            if (local.name == 'admin') {

                let answer = window.confirm("Delete???");

                if (answer) {
                    await axios.delete(`/movies/delete/${id}`)
                        .then((res) => {
                            toast.warn(res.data.msg);
                            setLoad(false)
                            setTimeout(window.location.reload(), 300);
                        })
                        .catch((err) => {
                            if (err.response.status == 400) {
                                toast.error(err.response.data.msg)
                            }
                            toast.error(err.message);
                            setLoad(false)
                        })


                }

            }
        } else {
            setLoad(false)
            return toast('Invalid request, Only admin can access')
        }
    }


    return (
        <div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Movie</StyledTableCell>
                            <StyledTableCell align="right">Cast</StyledTableCell>
                            <StyledTableCell align="right">Gener</StyledTableCell>
                            <StyledTableCell align="right">Rating</StyledTableCell>
                            <StyledTableCell align="right">Release</StyledTableCell>
                            <StyledTableCell align="right">Edit</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movies && movies.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.movieName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{
                                    row.cast && row.cast.map((c) => <span>{c},</span>)
                                }</StyledTableCell>
                                <StyledTableCell align="right">{row.gener}</StyledTableCell>
                                <StyledTableCell align="right">{row.rating}</StyledTableCell>
                                <StyledTableCell align="right">{row.release.slice(0, 10)}</StyledTableCell>
                                <StyledTableCell align="right"><EditIcon color={'primary'} onClick={() => handleEdit(row._id)} /></StyledTableCell>
                                <StyledTableCell align="right"><DeleteIcon color={'error'} onClick={() => handleDelete(row._id)} /></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default ListMovies
