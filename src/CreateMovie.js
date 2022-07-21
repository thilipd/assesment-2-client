import React, { useState, useEffect } from 'react'
import ReactChipInput from "react-chip-input";
import { Paper } from '@mui/material';
import axios from './axios/axios';
import { toast } from 'react-toastify';
import ListMovies from './ListMovies';


const intailaValue = {
    movieName: '',
    cast: [],
    gener: '',
    release: '',
    rating: 0
}

const CreateMovie = () => {

    const [chips, setChips] = useState([])

    const [movies, setMovies] = useState([]);

    const [load, setLoad] = useState([false])

    const [movieDetails, setMovieDetails] = useState(intailaValue);

    const { movieName, gener, release, rating } = movieDetails;

    const handleChange = (e) => {

        const { value, name } = e.target;

        console.log(value, name)

        setMovieDetails({ ...movieDetails, [name]: value });

    }



    const handleSubmit = (e) => {
        e.preventDefault();

        setLoad(true)
        axios.post('/movies/create', { ...movieDetails })
            .then((res) => {
                toast.success(`${res.data.msg}`)
                setLoad(false);

                setTimeout(window.location.reload(), 300);
            })
            .catch((err) => {
                if (err.response.status == 400) {
                    toast.error(err.response.data.msg)
                }
                toast.error(err.message);
                setLoad(false)
            })

        setMovieDetails(intailaValue);
        setChips([])

    }


    const addChip = (chip) => {

        setChips([...chips, chip])
        setMovieDetails({ ...movieDetails, cast: [...chips, chip] })
    }

    const removeChip = (i) => {

        chips.splice(i, 1);
        setMovieDetails({ ...movieDetails, cast: [...chips] })

    }

    const fetchMovies = async () => {
        setLoad(true)
        await axios.get('/movies/list')
            .then((res) => {
                setMovies(res.data);
                setLoad(false)
                console.log(res.data)
            })
            .catch((err) => {
                if (err.response.status == 400) {
                    toast.error(err.response.data.msg)
                }
                toast.error(err.message);
                setLoad(false);
            })

    }

    useEffect(() => {
        fetchMovies();
    }, []);


    return (
        load ?
            <>
            </> :
            <>
                <div className='d-flex  align-items-start justify-content-center  movieContainer'>
                    <Paper elevation={3} className='paper'>
                        <h2>Create Movie</h2>
                        <label>
                            <div className="lableContainer">
                                Cast:
                            </div>
                            <div className="inputContainer" style={{ width: '300px' }}>
                                <ReactChipInput
                                    className="castChip"
                                    chips={chips}
                                    onSubmit={(value) => addChip(value)}
                                    onRemove={index => removeChip(index)}
                                />
                            </div>
                        </label><br />
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
                    <ListMovies movies={movies} load={load} setLoad={setLoad} />
                </div>
            </>

    )
}

export default CreateMovie
