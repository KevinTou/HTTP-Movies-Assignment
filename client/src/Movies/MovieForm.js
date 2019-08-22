import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const MovieForm = props => {
  const [movie, setMovie] = useState(initialMovie);
  const id = props.match.params.id;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then(res => {
      setMovie(res.data);
    });
  }, []);

  const handleChange = event => {
    let value = event.target.value;

    if (event.target.name === "stars") {
      value = event.target.value.split(",");
    } else if (event.target.name === "metascore") {
      value = Number.parseInt(event.target.value);
    }

    setMovie({
      ...movie,
      [event.target.name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        setMovie(initialMovie);
        props.history.push("/");
      })
      .catch(err => {
        console.log("Error: ", err.response);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form-container">
      <fieldset className="movie-form">
        <legend>Movie Form</legend>
        <label htmlFor="title" className="movie-form-label">
          Title:
          <input
            className="movie-form-input"
            type="text"
            name="title"
            id="name"
            onChange={handleChange}
            value={movie.title}
          />
        </label>

        <label htmlFor="director" className="movie-form-label">
          Director:
          <input
            className="movie-form-input"
            type="text"
            name="director"
            id="director"
            onChange={handleChange}
            value={movie.director}
          />
        </label>

        <label htmlFor="metascore" className="movie-form-label">
          Metascore:
          <input
            className="movie-form-input"
            type="number"
            min={0}
            max={100}
            name="metascore"
            id="metascore"
            onChange={handleChange}
            value={movie.metascore}
          />
        </label>

        <label htmlFor="stars" className="movie-form-label">
          Stars:
          <input
            className="movie-form-input"
            type="text"
            name="stars"
            id="stars"
            onChange={handleChange}
            value={movie.stars}
          />
        </label>

        <button>Update</button>
      </fieldset>
    </form>
  );
};

export default MovieForm;
