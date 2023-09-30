import { CameraFill, ChatHeartFill, CupStraw } from 'react-bootstrap-icons';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';

import { TICKET_VALUES } from '../../Utilities/constants';

import './ticket-component.css';

function Ticket({addPoints, showToast, user, rideLog, attraction, points}) {
    let btnType;
    let backType;
    let action;
    let ticketCode;

    // Stylings based on the ticket type
    switch (attraction["ticket-value"]) {
        case 'O': 
            ticketCode = '$';
            btnType = "ticket-btn ticket-btn-o"; 
            backType = "ticket-back ticket-back-o";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Visit Shop</Button>
            );
        break;
        case 'P': 
            ticketCode = <CameraFill />;
            btnType = "ticket-btn ticket-btn-p";
            backType = "ticket-back ticket-back-p";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Took Photo</Button>
            );
        break;  
        case 'R':
            ticketCode = <CupStraw />;
            btnType = "ticket-btn ticket-btn-r";
            backType = "ticket-back ticket-back-r";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Eat Food</Button>
            );
        break;
        case 'M':
            ticketCode = <ChatHeartFill />;
            btnType = "ticket-btn ticket-btn-m";
            backType = "ticket-back ticket-back-m";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Met Character</Button>
            );
        break;      
        case 'A': 
            ticketCode = 'A';
            btnType = "ticket-btn ticket-btn-a";
            backType = "ticket-back ticket-back-a";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Join Line</Button>
            );
        break;
        case 'B': 
            ticketCode = 'B';
            btnType = "ticket-btn ticket-btn-b"; 
            backType = "ticket-back ticket-back-b";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Join Line</Button>
            );
        break;
        case 'C': 
            ticketCode = 'C';
            btnType = "ticket-btn ticket-btn-c"; 
            backType = "ticket-back ticket-back-c";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Join Line</Button>
            );
        break;
        case 'D': 
            ticketCode = 'D';
            btnType = "ticket-btn ticket-btn-d"; 
            backType = "ticket-back ticket-back-d";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Join Line</Button>
            );
        break;
        case 'E': 
            ticketCode = 'E';
            btnType = "ticket-btn ticket-btn-e"; 
            backType = "ticket-back ticket-back-e";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Join Line</Button>
            );
        break;
        case 'S': 
            ticketCode = 'S';
            btnType = "ticket-btn ticket-btn-s"; 
            backType = "ticket-back ticket-back-s";
            action = (
                <Button onClick={() => logAttraction(attraction)}>Join Line</Button>
            );
        break;
    }

    function logAttraction(attractionObj) {
        const timeStamp = new Date();
        const uId = user.id;
        const attractionName = attractionObj["attraction"];
        const pointUpdate = TICKET_VALUES[attractionObj["ticket-value"]];

        let attractionText;

        addPoints(pointUpdate);

        switch (attractionObj["ticket-value"]) {
            case 'O': 
                attractionText = "visited the shop";
            break;
            case 'P': 
                attractionText = "got a";
            break;
            case 'R': 
                attractionText = "ate at the";
            break;
            case 'M': 
                attractionText = "joined a";
            break;
            default: 
                attractionText = "rode";
        }

        showToast(
            <div>
                <b>{uId}</b> {attractionText} <b><i>{attractionName}</i></b> @ <b>{timeStamp.toLocaleString()}</b>.
            </div>
        );

        rideLog.push({
            time: timeStamp,
            user: uId,
            ride: attractionName,
            ticket: attractionObj["ticket-value"],
            currentPoints: points + pointUpdate
        });
    }

    return (
        <Row style={{marginBottom: '8px'}}>
            <Container className={backType}>
                <Row className='ticket-underline'>
                    <b>{attraction["attraction"]}</b>
                </Row>
                <Row>
                    <Col xs={9}>
                        {attraction["attraction-type"]} 
                    </Col>
                    <Col xs={3}>
                        <button className={btnType}>{ticketCode}</button>
                    </Col>  
                </Row>
            </Container> 
            {action}                
        </Row>
    )
}

export default Ticket;
