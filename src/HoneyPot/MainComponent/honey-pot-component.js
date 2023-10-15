import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

import { React, useState, useEffect } from 'react';

import "./honey-pot-component.css";

const SERVER = "https://bauer-box-service.onrender.com";

function HoneyPot() {
    const [body, setBody] = useState(<></>);
    const [footer, setFooter] = useState(<></>);
    const [games, setGames] = useState([]);
    const [header, setHeader] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);    

    useEffect(() => {
        // Get all of the attractions
        fetch(`${SERVER}/getAllGameDetails`)
        .then(async response => {
            const data = await response.json();

            // Check for error response
            if (!response.ok) {
                // Get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            setGames(data.sort((a, b) => (a.game > b.game) ? 1 : (a.game < b.game) ? -1 : 0));
            setLoading(false);
        }).catch(error => {
            console.error('There was an error!', error);
            return error;
        });
    }, []);

    function GameDetailsModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer>
                    {footer}
                </Modal.Footer>
            </Modal>
        );
    }

    function renderGames() {
        let gameEntry = [];

        games.forEach(entry => {
            gameEntry.push(<div className={"card-white"}>
                <b>{entry["game"]}</b>
                <button className={"view-btn"}>Details</button>
            </div>);
        });

        return (
            <div>
                {gameEntry}
            </div>
        );
    }

    function openAddGame() {
        setHeader("Add New Game");
        setBody(
            <Form>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="game-name">Game</InputGroup.Text>
                        <Form.Control
                        aria-label="Game"
                        aria-describedby="game-name"
                        />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Select aria-label="game-type">
                        <option>Game Type</option>
                        <option value="Board Game">Board Game</option>
                        <option value="Card Game">Card Game</option>
                        <option value="Video Game">Video Game</option>
                    </Form.Select>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Min / Max Players</InputGroup.Text>
                    <Form.Control aria-label="Minimum Players" />
                    <Form.Control aria-label="Maximum Players" />
                </InputGroup>
            </Form>
        );
        setFooter(
            <>
                <Button variant="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
                <Button variant="primary">Submit</Button>
            </>
        );
        setModalShow(true);
    }

    return (
        <div>
            <div className="card-honey">
                <h2>Honey Pot</h2>
            </div>
            
            <div className="card-basic">
                <h2>Games</h2>
                <Button onClick={() => openAddGame()}>Add New Game</Button>
                <Button style={{float: 'right'}}>Suggest a Game</Button>
                <hr />
                <div style={{
                    overflow: "auto",
                    width: "100%",
                    height: 600,
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}>
                    {loading == true ? <h4>Loading Game List...</h4> : ""}   
                    {renderGames()}
                </div>
            </div>

            <GameDetailsModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}

export default HoneyPot;
