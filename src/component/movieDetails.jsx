import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Alert, Container, Row, Col, ListGroup } from "react-bootstrap";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovieDetails = async () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");

    try {
     
      const response = await fetch(`https://www.omdbapi.com/?apikey=7d14a2d5&i=${movieId}`);
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dettagli del film");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error("Film non trovato");
      }

      setMovie(data);

      // Fetch commenti per il film da API commenti
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2FjYjk5OTg0MzFhZTAwMTU0MmU4MjkiLCJpYXQiOjE3MzkzNzI5NTMsImV4cCI6MTc0MDU4MjU1M30.qhzbUWvCa-URZujtEF_c__k1QChfqG6fv7FZcHGAh8k"; // Sostituisci con il tuo token di autenticazione
      const commentsResponse = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!commentsResponse.ok) {
        throw new Error("Errore nel recupero dei commenti");
      }

      const commentsData = await commentsResponse.json();
      setComments(commentsData);
    } catch (error) {
      setHasError(true);
      setErrorMessage(error.message || "Errore sconosciuto");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  return (
    <Container className="my-3 text-light text-center">
      {isLoading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" role="status" variant="info" />
        </div>
      )}
      {hasError && <Alert variant="danger">{errorMessage}</Alert>}
      {movie && !isLoading && !hasError && (
        <div>
          <Row className="text-center mb-3">
            <Col>
              <h2>{movie.Title}</h2>
            </Col>
          </Row>
          <Row className="text-center mb-3">
            <Col>
              <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{movie.Plot}</p>
              <p>
                <strong>Year:</strong> {movie.Year}
              </p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h3>Commenti</h3>
              {comments.length > 0 ? (
                <ListGroup>
                  {comments.map((comment, index) => (
                    <ListGroup.Item key={index}>
                      <strong>Rating: {comment.rate}</strong> - {comment.comment}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No comments available.</p>
              )}
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default MovieDetails;
