import { Col, Row, Spinner, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Movie = (props) => {
  const [movie, setMovie] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovies = async () => {
    setIsLoading(true);
    setMovie([]);
    setHasError(false);
    setErrorMessage("");

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=7d14a2d5&s=${props.filmTitle}`);

      if (response.ok) {
        const data = await response.json();
        const movies = (data.Search || []).slice(0, 6);
        setHasError(false);
        setMovie(movies);
      } else {
        if (response.status === 404) {
          throw new Error("Film non trovato");
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [props.filmTitle]); 

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" role="status" variant="info">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {hasError && (
        <Alert variant="danger" className="text-center">
          {errorMessage || "Errore nel caricamento dei film. Riprova più tardi."}
        </Alert>
      )}
      <Row className="row-cols-2 row-cols-md-3 row-cols-lg-6 justify-content-center">
        {movie.map((movie) => (
          <Col key={movie.imdbID} className="mb-3 d-flex justify-content-center">
            
            <Link to={`/movie-details/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Movie;
