import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Helper from "../helpers/Utilities.js";

import styles from "../styles/style.module.css";

import logo from "/Logo.svg";

/* eslint-disable react/prop-types */
export default function ConfirmationPage({
  booking,
  staff,
  service,
  addOns,
  totalPrice,
}) {
  let timeFrame = undefined;

  if (Object.keys(booking).length !== 0)
    timeFrame = Helper.formatDateToParts(
      booking.startAt,
      "America/New_York",
      booking.appointmentSegments[0].durationMinutes
    );

  return (
    <Container
      className={styles.receipt}
      style={{
        boxShadow:
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        minHeight: "100vh",
      }}
    >
      <img
        className="align-self-center"
        alt="logo"
        src={logo}
        width={60}
        height={60}
      />
      <p className="mt-2 text-center">
        44 Lawton Ave <br /> Oviedo FL, 32765
      </p>
      <Row className="mb-3">
        <Col>
          <div className="d-flex">Service:</div>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            {Object.keys(service).length !== 0 ? service.itemData.name : ""}
          </div>
        </Col>
      </Row>
      <Row className="mt-1 mb-3">
        <Col>
          <div className="d-flex">Add-ons:</div>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            {addOns.length === 0
              ? "None"
              : addOns.map((addOn, index) => (
                  <span key={addOn}>
                    {addOn}
                    {index === addOns.length - 1 ? "" : ","}
                  </span>
                ))}
          </div>
        </Col>
      </Row>
      <div style={{ borderTopStyle: "dashed" }}></div>
      <p className="text-center mt-3">Appointment Details</p>
      <Row className="mt-3 mb-3">
        <Col>
          <div className="d-flex">Service Provider:</div>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            {Object.keys(staff).length !== 0 ? staff.displayName : ""}
          </div>
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col>
          <div className="d-flex">Scheduled on:</div>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            {timeFrame != undefined && timeFrame.length > 0 ? timeFrame[0] : ""}
          </div>
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col>
          <div className="d-flex">Appt. Time:</div>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            {timeFrame != undefined && timeFrame.length > 1 ? timeFrame[1] : ""}
          </div>
        </Col>
      </Row>
      <div style={{ borderTopStyle: "dashed" }}></div>
      <p className="text-center mt-3">SALE</p>
      <Row className="mb-3">
        <Col>
          <div className="d-flex">Total Amount:</div>
        </Col>
        <Col>
          <div className="d-flex justify-content-end">${totalPrice}</div>
        </Col>
      </Row>
      <p className="text-center">
        *Additional charges may apply for any add-ons
      </p>
      <div style={{ borderTopStyle: "dashed" }}></div>
      <p className="mt-5 text-center">Thank you for booking with us !</p>
      <p className="text-center">Your appointment has been approved.</p>
    </Container>
  );
}

// America/New_York
