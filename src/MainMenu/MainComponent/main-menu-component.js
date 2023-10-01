import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Link } from "react-router-dom";

function MainMenu() {
    return (
        <div>
            <div className="card-basic">
                <h2>Bauer Box Games</h2>
            </div>

            <div className="card-basic">
                <h2>Games Menu</h2>
                <Container>
                    <Row>
                        <Link to="disneylandTracker"><Button variant="primary">Disney Parks Tracker</Button></Link>
                    </Row>
                    <Row>
                        <Link to="honeyPot"><Button variant="warning">Honey Pot</Button></Link>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default MainMenu;
