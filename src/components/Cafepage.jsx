import React from "react";
import { Card, CardDeck } from "react-bootstrap";

import CafeNav from "./CafeNav";

const Cafepage = () => {
  return (
    <>
      <CafeNav
      //   eid={eid} eimage={eimage}
      />
      <div style={{margin:"5% 5% 5% 5%",}}>
      <CardDeck>
        <Card>
          <Card.Img
            variant="top"
            src="https://images.pexels.com/photos/6273549/pexels-photo-6273549.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Add to Cart</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://images.pexels.com/photos/6273549/pexels-photo-6273549.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Add to Cart</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img
            variant="top"
            src="https://images.pexels.com/photos/6273549/pexels-photo-6273549.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Add to Cart</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      </div>
    </>
  );
};

export default Cafepage;
