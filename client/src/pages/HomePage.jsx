import Container from "react-bootstrap/esm/Container";
// import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";

import HomeBgLogo from "../assets/HomeBg.jpeg";
// import AdImage from "../assets/SpecialsAd.jpeg";
// import massageImage from "../assets/massages.jpg";
import NailsImage from "../assets/manicure.png";
import PedicureImage from "../assets/pedicure.jpeg";
import FacialImage from "../assets/facial.jpeg";
import WaxImage from "../assets/waxes.jpg";
import CombosImage from "../assets/combos.jpg";
// import ProfileImage from "../assets/temp.jpg";

import LocationPage from "./LocationPage";

import { useState } from "react";

import styles from "../styles/style.module.css";

export default function HomePage() {
  const [modalShow, setModalShow] = useState(true);

  return (
    <>
      <HomeBackgroundImage />
      <ServicesSection />
      {/* <AboutSection /> */}
      <LocationPage />
      <AdPopup show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

function HomeBackgroundImage() {
  return (
    <div className="d-flex">
      <img
        alt="Home Background Photo"
        src={HomeBgLogo}
        className={styles.welcomeImage}
      />
    </div>
  );
}

/* eslint-disable react/prop-types */
function ServiceDetailsInDepth({ imageSrc, details }) {
  return (
    <>
      {imageSrc === undefined ? (
        <Image src="" style={{ opacity: 0 }} width={90} height={90} />
      ) : (
        <Image
          alt={`${details} Image`}
          src={imageSrc}
          roundedCircle
          width={90}
          height={90}
        />
      )}
      <p className="mt-2">{details}</p>
    </>
  );
}

/* eslint-disable react/prop-types */
function ServiceDetails({ imageSrc, details, parameter }) {
  return (
    <div className="d-flex flex-column">
      {details === null || details === undefined ? (
        <ServiceDetailsInDepth />
      ) : (
        <a
          href={`/serviceMenu/${parameter}`}
          style={{ textDecoration: "none", color: "White" }}
        >
          <ServiceDetailsInDepth imageSrc={imageSrc} details={details} />
        </a>
      )}
    </div>
  );
}

function ServicesWrapper() {
  return (
    <>
      <Container className="d-flex flex-wrap justify-content-around">
        <ServiceDetails
          imageSrc={NailsImage}
          details={"Nails"}
          parameter={"Nails"}
        />
        <ServiceDetails
          imageSrc={PedicureImage}
          details={"Pedicures"}
          parameter={"Pedicure"}
        />
        <ServiceDetails
          imageSrc={WaxImage}
          details={"Waxes"}
          parameter={"Wax"}
        />
      </Container>
      <Container className="d-flex flex-wrap justify-content-around mt-4 pb-4">
        <ServiceDetails
          imageSrc={FacialImage}
          details={"Facials"}
          parameter={"Facial"}
        />
        {/* <ServiceDetails
          imageSrc={massageImage}
          details={"Deals"}
          parameter={"Deal"}
        /> */}
        <ServiceDetails
          imageSrc={CombosImage}
          details={"Combos"}
          parameter={"Combos"}
        />
        <ServiceDetails />
      </Container>
    </>
  );
}

function ServicesSection() {
  return (
    <Container
      fluid
      className="text-center"
      style={{ backgroundColor: "#5f8575", color: "white" }}
    >
      <h3 className="pt-5 mb-5 text-center">Services</h3>
      <ServicesWrapper />
    </Container>
  );
}

// function AboutSection() {
//   return (
//     <Container fluid className="d-flex flex-column align-items-center">
//       <h3 className="pt-5 mb-4 text-center">About Us</h3>
//       <Image
//         src={ProfileImage}
//         height={225}
//         width={225}
//         roundedCircle
//         className="border border-success border-4"
//       />
//       <p className="text-center mt-3 pb-31 w-75">
//         Right here is a few setences saying whatever it is that maria wants here
//         this is just simply a place holder so I dont go insane Right here is a
//         few setences saying whatever it is that maria wants here this is just
//         simply a place holder so I dont go insane
//       </p>
//     </Container>
//   );
// }

// function AdPopup(props) {
//   return (
//     <Modal
//       {...props}
//       size="md"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton></Modal.Header>
//       <img alt="Ad" src={AdImage} className="w-100 h-50" />
//     </Modal>
//   );
// }

// Displaying Messages
function AdPopup(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>We&#39;re Moving!</Modal.Header>
      <Modal.Body>
        <p>
          We&#39;re sorry for the inconvenience, due to us relocating, for the
          next 2 weeks we&#39;re only accepting appointments Thursdays and
          Saturdays by phone calls only. <br />
          Please call us at: 407-870-3826
        </p>
      </Modal.Body>
    </Modal>
  );
}

// function CarouselsGallery() {
//   return (
//     <Container fluid>
//       <h3 className="pt-5 mb-5 text-center">Photo Gallery</h3>
//       <Carousel data-bs-theme="dark" className="pb-5">
//         <Carousel.Item>
//           <Image alt="Test" className={styles.sliderImage} src={NailsImage} />
//         </Carousel.Item>
//         <Carousel.Item>
//           <Image alt="Test" src={FacialImage} className={styles.sliderImage} />
//         </Carousel.Item>
//         <Carousel.Item>
//           <Image alt="Test" src={WaxImage} className={styles.sliderImage} />
//         </Carousel.Item>
//       </Carousel>
//       <button className="d-block btn btn-dark mx-auto mb-4">
//         View Gallery
//       </button>
//     </Container>
//   );
// }
