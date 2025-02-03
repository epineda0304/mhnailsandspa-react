import Container from "react-bootstrap/esm/Container";

import GoogleMap from "../components/GoogleMap";
import SocialMedia from "../components/SocialMedia";

export default function LocationPage() {
  return (
    <>
      <LocationSection />
    </>
  );
}

/* eslint-disable react/prop-types */
function ContactDetails({ title, lineOne, lineTwo }) {
  return (
    <div className="mt-3">
      <h4>{title}</h4>
      <p>
        {lineOne}
        <br />
        {lineTwo}
      </p>
    </div>
  );
}

function ContactSection() {
  return (
    <Container fluid>
      <div className="mt-4">
        <h4>Contact</h4>
        <p>
          <a href="tel:4078703826">407-870-3826</a>
          <br />
          Mh.nails.and.spa@gmail.com
        </p>
      </div>
      <ContactDetails
        title={"Address"}
        lineOne={"120 Alexandria Boulevard, #13"}
        lineTwo={"Oviedo FL, 32765"}
      />
      <ContactDetails
        title={"Opening Hours"}
        lineOne={"Mon ~ Sat: 9:30am - 7pm"}
        lineTwo={"Sun: 11am - 5pm"}
      />
      <div className="mt-3">
        <h4>Social Media</h4>
        <SocialMedia />
      </div>
    </Container>
  );
}

function LocationSection() {
  return (
    <Container fluid style={{ backgroundColor: "#faf9f6" }}>
      <h3 className="pt-4 mb-4 text-center">Oviedo Location</h3>
      <Container>
        <GoogleMap />
        <ContactSection />
      </Container>
    </Container>
  );
}
