import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './axios/axios';
import { toast } from 'react-toastify';
import ReactChipInput from "react-chip-input";
import { Paper } from '@mui/material';

const intailaValue = {
    movieName: '',
    cast: [],
    gener: '',
    release: '',
    rating: 0
}

const EditMovie = () => {

    const [movie, setMovie] = useState(intailaValue);
    const [load, setLoad] = useState([false])
    const [chips, setChips] = useState([])

    const { movieName, gener, release, rating } = movie;

    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoad(true)
        axios.put(`/movies/update/${id}`, { ...movie })
            .then((res) => {
                toast.success(`${res.data.msg}`)
                setLoad(false);

                setTimeout(navigate('/movie'), 300);
            })
            .catch((err) => {
                if (err.response.status == 400) {
                    toast.error(err.response.data.msg)
                }
                toast.error(err.message);
                setLoad(false)
            })

        setMovie(intailaValue);
        setChips([])


    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        setMovie({ ...movie, [name]: value })
    }


    const addChip = (chip) => {

        setChips([...chips, chip])
        setMovie({ ...movie, cast: [...chips, chip] })
    }

    const removeChip = (i) => {

        chips.splice(i, 1);
        setMovie({ ...movie, cast: [...chips] })

    }


    const fetchMovie = async () => {
        setLoad(true)
        await axios.post(`/movies/list/${id}`)
            .then(res => {
                console.log(res.data)
                setChips([...res.data.cast])
                setMovie({ ...res.data, release: res.data.release.slice(0, 10) })
                setLoad(false)
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.msg)
                }
                toast.error(err.message);
                setLoad(false)
            })

    }

    useEffect(() => {
        fetchMovie();

    }, [])


    return (
        load ?
            <>
            </> :
            <>
                <div className='d-flex  align-items-start justify-content-center  movieContainer'>
                    <Paper elevation={3} className='paper'>
                        <h2>Edit Movie</h2>
                        <label>
                            <div className="lableContainer">
                                Cast:
                            </div>
                            <div className="inputContainer" style={{ width: '300px' }}>
                                <ReactChipInput
                                    className="castChip .p-3"
                                    chips={chips}
                                    onSubmit={(value) => addChip(value)}
                                    onRemove={index => removeChip(index)}

                                />
                            </div>
                        </label><br /><br />
                        <form onSubmit={(e) => handleSubmit(e)} className="col registerForm">
                            <label>
                                <div className="lableContainer">
                                    Movie:
                                </div>
                                <div className="inputContainer">
                                    <input type="text"
                                        name='movieName'
                                        value={movieName}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </label><br /><br />


                            <label>
                                <div className="lableContainer">
                                    Gener
                                </div>
                                <div className="inputContainer">
                                    <input type="text"
                                        name='gener'
                                        value={gener}
                                        onChange={(e) => handleChange(e)}

                                    />
                                </div>
                            </label><br /><br />
                            <label>
                                <div className="lableContainer">
                                    Rating:
                                </div>
                                <div className="inputContainer">
                                    <input type="number"
                                        max={10}
                                        name='rating'
                                        value={rating}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </label><br /><br />

                            <label>
                                <div className="lableContainer">
                                    Release:
                                </div>
                                <div className="inputContainer">
                                    <input type="date"
                                        name='release'
                                        value={release}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </label><br /><br />
                            <input className='btn btn-primary' type="submit" value="Submit" />
                        </form><br /><br />

                        <label>

                        </label><br /><br />
                    </Paper >

                </div>
            </>
    )
}

export default EditMovie
