import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

import { API_SERVER } from '../../AllApps/Store/constants';
import { format } from 'date-fns';

import React, { useState, useEffect } from 'react';

import "./honey-pot-component.css";

const SERVER = API_SERVER;

const HoneyPot = () => {
    const [body, setBody] = useState(<></>);
    const [footer, setFooter] = useState(<></>);
    const [games, setGames] = useState([]);
    const [header, setHeader] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);    

    let isCoOp = false;
    let gamePayload = {
        "is-co-op": isCoOp
    };

    useEffect(() => {
        loadAllGameDetails();
    }, []);

    const GameDetailsModal = (props) => {
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

    const handleGameDetailChange = (e) => {
        switch (e.target.name) {
            case "game-name": gamePayload["game"] = e.target.value; break;
            case "game-type": gamePayload["game-type"] = e.target.value; break;
            case "min-players": gamePayload["min-players"] = e.target.value; break;
            case "max-players": gamePayload["max-players"] = e.target.value; break;
            case "is-co-op": 
                isCoOp = !isCoOp;
                gamePayload["is-co-op"] = isCoOp; 
            break;
            default:
        }
    }

    const loadAllGameDetails = () => {
        setLoading(true);
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
    }

    const postGameDetails = (data) => {
        fetch(`${SERVER}/postGameDetails`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(async response => {
            const data = await response.json();

            // Check for error response
            if (!response.ok) {
                // Get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            loadAllGameDetails();
            setModalShow(false);            
        }).catch(error => {
            console.error('There was an error!', error);
            setModalShow(false);
            return error;
        });
    }

    function renderGames() {
        let gameEntry = [];

        games.forEach(entry => {
            gameEntry.push(<div className={"card-white"}>
                <b>{entry["game"]}</b>
                <button className={"view-btn"} onClick={() => openGameDetails(entry)}>Details</button>
            </div>);
        });

        return (
            <div>
                {gameEntry}
            </div>
        );
    }

    const openAddGame = () => {
        setHeader("Add New Game");
        setBody(
            <Form>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="game-label">Game</InputGroup.Text>
                        <Form.Control
                            name="game-name"
                            aria-label="Game"
                            aria-describedby="game-name"
                            onChange={handleGameDetailChange}
                            required
                        />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Select name="game-type" aria-label="game-type" onChange={handleGameDetailChange} required>
                        <option>Game Type</option>
                        <option value="Board Game">Board Game</option>
                        <option value="Card Game">Card Game</option>
                        <option value="Resource Management">Resource Management</option>
                        <option value="Tile Game">Tile Game</option>
                        <option value="Video Game">Video Game</option>
                    </Form.Select>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Min / Max Players</InputGroup.Text>
                    <Form.Control name="min-players" aria-label="Minimum Players" onChange={handleGameDetailChange} required />
                    <Form.Control name="max-players" aria-label="Maximum Players" onChange={handleGameDetailChange} required/>
                </InputGroup>
                <InputGroup>
                    <Form.Check
                        type="switch"
                        name="is-co-op"
                        label="Co-Op"
                        onChange={handleGameDetailChange}
                    />
                </InputGroup>
            </Form>
        );
        setFooter(
            <>
                <Button variant="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => postGameDetails(gamePayload)}>Submit</Button>
            </>
        );
        setModalShow(true);
    }

    const openGameDetails = (game) => {
        console.log(game["is-co-op"])
        const coOp = game["is-co-op"] === true ? "Co-Op" : ""

        setHeader(game["game"]);
        setBody(
            <div>
                <b>{game["game-type"]} </b>{coOp}<br />
                <b>{game["min-players"]} - {game["max-players"]}</b> Players <br /> 
                <b>Last Played</b> {null === game["last-played"] ? "" : format(new Date(game["last-played"]), 'MMMM do yyyy')} <br /> 
                <b>Last Winner</b> {game["last-winner"]}
            </div>
        );
        setFooter(
            <>
                <Button variant="warning">Edit Details</Button>
                <Button variant="primary">Play Game</Button> 
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
                    height: 400,
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}>
                    {loading === true ? <h4>Loading Game List...</h4> : ""}   
                    {renderGames()}
                </div>
            </div>

            <GameDetailsModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}

export default HoneyPot;
