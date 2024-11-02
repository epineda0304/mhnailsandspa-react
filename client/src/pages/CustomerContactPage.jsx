import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/esm/Container";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ConfirmationPage from "./ConfirmationPage";

import Snowfall from "react-snowfall";

export default function CustomerContactPage() {
  const [searchParams] = useSearchParams();
  const { staffId, serviceId } = useParams();

  const addOns = JSON.parse(searchParams.get("addOns"));
  const startAt = searchParams.get("startAt");
  const version = searchParams.get("serviceVersion");

  const [staffData, setStaffData] = useState({});
  const [totalPrice, setTotalPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({});
  const [serviceItem, setServiceItem] = useState({});
  const [createBooking, setCreateBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    async function BookAppointment() {
      const firstNameEl = document.getElementById("firstName");
      const lastNameEl = document.getElementById("lastName");
      const phoneNumberEl = document.getElementById("phoneNumber");
      const emailEl = document.getElementById("email");
      const notesEl = document.getElementById("apptNotes");
      const formValidatorEl = document.getElementById("formValidator");

      if (!createBooking) return;

      if (firstNameEl.value === "") {
        formValidatorEl.innerHTML = "Please fill out first name field";
        setCreateBooking(false);
        return;
      }
      if (lastNameEl.value === "") {
        formValidatorEl.innerHTML = "Please fill out last name field";
        setCreateBooking(false);
        return;
      }
      if (phoneNumberEl.value === "") {
        formValidatorEl.innerHTML = "Please fill out phone number field";
        setCreateBooking(false);
        return;
      }
      if (isNaN(phoneNumberEl.value)) {
        formValidatorEl.innerHTML = "Phone numbers should only contain digits";
        setCreateBooking(false);
        return;
      }
      if (phoneNumberEl.value.length < 10) {
        formValidatorEl.innerHTML = "Phone numbers require 10 digits";
        setCreateBooking(false);
        return;
      }
      if (emailEl.value === "") {
        formValidatorEl.innerHTML = "Please fill out email field";
        setCreateBooking(false);
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailEl.value)) {
        formValidatorEl.innerHTML = "Proper email format: example@example.com";
        setCreateBooking(false);
        return;
      }

      setIsLoading(true);

      const bookingUrl = `/booking/create?serviceId=${serviceId}&staffId=${staffId}&version=${version}&startAt=${startAt}&addOns=${JSON.stringify(
        addOns
      )}`;

      const res = await fetch(`${bookingUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstNameEl.value,
          lastName: lastNameEl.value,
          phone: phoneNumberEl.value,
          email: emailEl.value,
          customerNote: notesEl.value,
        }),
      });

      const jsonRes = await res.json();

      const bookingData = JSON.parse(jsonRes.booking);
      const teamMemberData = JSON.parse(jsonRes.teamMemberBookingProfile);
      const serviceData = JSON.parse(jsonRes.serviceItem);
      const totalPriceData = JSON.parse(jsonRes.totalPrice);

      setBookingInfo(bookingData);
      setStaffData(teamMemberData);
      setServiceItem(serviceData);
      setTotalPrice(totalPriceData);

      setShowConfirmation(true);
      setIsLoading(false);
    }

    BookAppointment();
  }, [createBooking]);

  return (
    <>
      <Container
        fluid
        style={{ minHeight: "100vh", backgroundColor: "#A7C7E7" }}
      >
        <Snowfall
          color="white"
          snowflakeCount={175}
          speed={[0.5, 2]}
          radius={[0.5, 2.5]}
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
          }}
        />
        {showConfirmation ? (
          <ConfirmationPage
            booking={bookingInfo}
            staff={staffData}
            service={serviceItem}
            addOns={addOns}
            totalPrice={totalPrice}
          />
        ) : (
          <>
            <h4 className="text-center pt-4">Enter your details</h4>
            <div className="row g-3 mt-4">
              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="givenName"
                    required
                    className="form-control"
                    id="firstName"
                    maxLength="50"
                    placeholder="First name"
                  />
                  <label>First Name</label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    name="familyName"
                    className="form-control"
                    required
                    maxLength="50"
                    id="lastName"
                    placeholder="Last name"
                  />
                  <label>Last Name</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    required
                    maxLength="10"
                    id="phoneNumber"
                    placeholder="Phone Number"
                  />
                  <label>Phone Number</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input
                    name="emailAddress"
                    required
                    maxLength="320"
                    placeholder="Email"
                    id="email"
                    type="email"
                    className="form-control"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    title="Invalid email address"
                  />
                  <label>Email Address</label>
                </div>
              </div>
              <div className="col-12">
                <textarea
                  name="customerNote"
                  className="form-control"
                  id="apptNotes"
                  placeholder="Appointment notes (optional)"
                  maxLength="1500"
                  rows="5"
                ></textarea>
              </div>
              <p className="text-danger" id="formValidator"></p>
              <div className="col-12 d-flex justify-content-center">
                <button
                  className="btn btn-dark mx-auto"
                  type="button"
                  onClick={() => setCreateBooking(true)}
                >
                  Finish Booking
                </button>
              </div>
            </div>
          </>
        )}
      </Container>
      <LoadingDialog show={isLoading} />
    </>
  );
}

function LoadingDialog(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Body>
        <Container className="d-flex align-items-center">
          <Spinner animation="border" role="status"></Spinner>
          <span className="ms-3">Loading...</span>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
