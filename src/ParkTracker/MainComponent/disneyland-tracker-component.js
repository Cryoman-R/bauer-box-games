import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import Ticket from '../TicketComponent/ticket-component'

import { USER } from "../../Utilities/db-connect";
import { React, useState, useEffect } from 'react';

const SERVER = "https://bauer-box-service.onrender.com";

let rideLog = []
let user = USER;

function DisneylandTracker() {
    const [loading, setLoading] = useState(true);
    const [parks, setParks] = useState({});
    const [points, setPoints] = useState(0);  
    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState(<></>);

    useEffect(() => {
        // Get all of the attractions
        fetch(`${SERVER}/getAttractionDetails`)
        .then(async response => {
            const data = await response.json();

            // Check for error response
            if (!response.ok) {
                // Get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            setParks(data);
            setLoading(false);
        }).catch(error => {
            console.error('There was an error!', error);
            return error;
        });
    }, []);    

    function addPoints(amount) {
        setPoints(points + amount);
        console.log(rideLog);
    }

    function generateAttractionList() {
        let rows = [];
        let eventNum = 0;
        let subEventNum = 0;

        Object.keys(parks).forEach(park => {
            const thisPark = parks[park];
            const thisLands = thisPark.lands;

            let landsList = [];

            Object.keys(thisLands).forEach(land => {
                const thisLand = thisLands[land];
                const thisAttractions = thisLand.attractions;

                let attractionList = [];

                Object.keys(thisAttractions).forEach(attraction => {
                    const thisAttraction = thisAttractions[attraction];

                    attractionList.push(<Ticket 
                        addPoints={addPoints} 
                        showToast={showToast}
                        user={user} 
                        rideLog={rideLog} 
                        attraction={thisAttraction} 
                        points={points} />
                    );
                });

                landsList.push(
                    <Accordion.Item eventKey={subEventNum}>
                        <Accordion.Header><h5>{thisLand.landName}</h5></Accordion.Header>
                        <Accordion.Body>
                            {attractionList}
                        </Accordion.Body>
                    </Accordion.Item>
                );

                subEventNum++;
            }); 
            
            rows.push(
                <Accordion.Item eventKey={eventNum}>
                    <Accordion.Header><h4>{thisPark.parkName}</h4></Accordion.Header>
                    <Accordion.Body>
                        <Accordion defaultActiveKey="0">
                            {landsList}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            );

            eventNum++;
        });

        return (<Accordion defaultActiveKey="0">{rows}</Accordion>)
    }

    function showToast(toastMessage) {
        setShow(true);
        setToastMessage(toastMessage);
    }
    
    return (
        <div>
            <div className="card-basic">
                <Container>
                    <Row><Col xs={8}><h2>Disney Tracker</h2></Col><Col xs={4}><h3>{points}</h3></Col></Row>
                </Container>
            </div>
            <div className="card-basic"> 
                {loading == true ? <h4>Loading Attraction List...</h4> : ""}               
                {generateAttractionList()}
            </div>
            <ToastContainer className="p-3" position="bottom-center">
                <Toast bg="info" onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header closeButton={false}>
                        <strong>Event Logged</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}

export default DisneylandTracker;
