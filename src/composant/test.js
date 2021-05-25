import "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [movies, setMovies] = useState({
    nom: "",
    key: "",
    genre: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3004/posts`, movies).then((res) => {
      console.log(res);
    });
  };

  const [aff, setAff] = useState([]);
  const getAff = () => {
    axios.get(`http://localhost:3004/posts`).then((res1) => {
      var a = res1.data;
      setAff(a);
    });
  };
  useEffect(() => {
    getAff();
  }, []);

  const supprimer = (id, e) => {
    axios.delete(`http://localhost:3004/posts/${id}`).then((res2) => {
      console.log(res2);
    });
  };

  // const modif = (id, e) => {
  //   axios.get(`http://localhost:3004/posts/${id}`).then((res2) => {
  //     console.log(res2);
  //   });
  // };

  // const [aff, setAff] = useState([]);
  // useEffect(() => {
  //   axios.get(`http://localhost:3004/posts`, movies).then((res1) => {
  //     var a = res1.data;
  //     setAff(a);
  //   });
  // });
  return (
    <div>
      <Row className="formulaire">
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>nom de film </Form.Label>
              <Form.Control
                type="text"
                placeholder="nom de film"
                onChange={(e) => setMovies({ ...movies, nom: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>key de film </Form.Label>
              <Form.Control
                type="text"
                placeholder="key de film"
                onChange={(e) => setMovies({ ...movies, key: e.target.value })}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.Label>genre</Form.Label>
            <Form.Control
              placeholder="genre"
              onChange={(e) => setMovies({ ...movies, genre: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={aff}>
            Submit
          </Button>
        </Form>
      </Row>
      {[...aff].map((el) => (
        <div>
          {el.nom}
          {el.key}
          <input type="text" />
          <button onClick={(e) => supprimer(el.id, e)}>supprimer</button>
          {/* <button onClick={(e) => modif(el.id, e)}>modif</button> */}
        </div>
      ))}
    </div>
  );
}

export default Test;
