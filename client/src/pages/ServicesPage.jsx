import Calendar from "react-calendar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/esm/Container";

import Helper from "../helpers/Utilities.js";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import InfoIcon from "../assets/icons/info-icon.svg";
import LeftIcon from "../assets/icons/left-icon.svg";
import RightIcon from "../assets/icons/right-icon.svg";

import ServiceCatalog from "../components/ServiceCatalog.jsx";

import "react-calendar/dist/Calendar.css";

const _pediAddOns = [
  { name: "Chrome", price: 15, fixed: true },
  { name: "French", price: 10, fixed: true },
  { name: "Gel", price: 15, fixed: true },
];

const _nailsAddOns = [
  { name: "Designs", price: 10, fixed: false },
  { name: "Lengths", price: 10, fixed: false },
  { name: "Shape", price: 5, fixed: true },
  { name: "Soak off", price: 10, fixed: true },
];

const _facialAddOns = [
  { name: "LED", price: 20, fixed: true },
  { name: "Brightening Mask", price: 20, fixed: true },
  { name: "Vitamin C Mask", price: 20, fixed: true },
];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { type } = useParams();

  useEffect(function () {
    async function grabServices() {
      try {
        setIsLoading(true);
        const res = await fetch(`/services/${type}`);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const jsonRes = await res.json();

        const data = JSON.parse(jsonRes.items);
        const discountsData = JSON.parse(jsonRes.discounts);

        setServices(data);
        setDiscounts(discountsData);
        setIsLoading(false);
      } catch (err) {
        if (err) console.log(err);
      }
    }

    grabServices();
  }, []);

  return (
    <>
      <ServiceSection
        services={services}
        discounts={discounts}
        isLoading={isLoading}
      />
    </>
  );
}

/* eslint-disable react/prop-types */
function ServiceDescription({ service }) {
  return (
    <div id={service.itemData.variations[0].id} className="collapse">
      <p>
        {service.itemData?.description === undefined ? (
          <span>No description</span>
        ) : (
          <span>{service.itemData.description}</span>
        )}
      </p>
    </div>
  );
}

/* eslint-disable react/prop-types */
function ServiceDescriptionBtn({ service }) {
  function toggleCollapse(value) {
    const el = document.getElementById(value);

    if (el.className === "collapse") {
      el.className = "show";
    } else {
      el.className = "collapse";
    }
  }

  return (
    <p className="d-flex align-items-center">
      <span
        type="button"
        onClick={() => toggleCollapse(service.itemData.variations[0].id)}
        aria-controls={service.itemData.variations[0].id}
      >
        <img src={InfoIcon} className="me-2" />
      </span>
      More Info
    </p>
  );
}

/* eslint-disable react/prop-types */
function ServiceHeader({ service, discounts }) {
  return (
    <>
      <h4>
        {service.itemData.name} - {getItemPrice(service, discounts)}
      </h4>
      <p>
        {Helper.formatTime(
          service.itemData.variations[0].itemVariationData.serviceDuration
        )}
      </p>
    </>
  );
}

/* eslint-disable react/prop-types */
function ServiceSection({ services, discounts, isLoading }) {
  const [staff, setStaff] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [version, setVersion] = useState("");
  const [variation, setVariation] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [showAddOns, setShowAddons] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loadCalender, setLoadCalendar] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState("");
  const [isAssetsLoading, setIsAssetsLoading] = useState(false);

  const { type } = useParams();

  function onHandleClose() {
    setModalShow(false);
    setShowCalendar(false);
    setLoadCalendar(false);
    setShowAddons(true);
    setAddOns([]);
    setCurrentServiceId("");
  }

  useEffect(() => {
    async function HandleBookNow() {
      let service = null;

      if (service == null) return;

      if (currentServiceId === "") return;

      for (let i = 0; i < services.length; i++) {
        if (currentServiceId === services[i].id) {
          service = services[i];
          break;
        }
      }

      if (service === null) return;

      setModalShow(true);

      setIsAssetsLoading(true);

      const staffUrl = `/staff/${service.itemData.variations[0].id}?version=${service.itemData.variations[0].version}`;

      const res = await fetch(`${staffUrl}`);

      const jsonRes = await res.json();

      const staffData = JSON.parse(jsonRes.bookableStaff);
      const variationData = JSON.parse(jsonRes.serviceVariation);
      const versionData = JSON.parse(jsonRes.serviceVersion);

      setStaff(staffData);
      setVariation(variationData);
      setVersion(versionData);
      setIsAssetsLoading(false);
    }

    HandleBookNow();
  }, [currentServiceId]);

  return (
    <>
      <Container
        fluid
        style={{ minHeight: "100vh", backgroundColor: "#5f8575" }}
      >
        <ServiceCatalog type={type} />
        <h3 className="text-center">Select a Service</h3>
        {isLoading ? (
          <Container className="d-flex align-items-center justify-content-center mt-4">
            <Spinner animation="border" role="status"></Spinner>
            <span className="ms-3">Loading...</span>
          </Container>
        ) : (
          <Container className="py-4">
            <Row xl={2} lg={2} md={2} sm={1} xs={1} className="gx-lg-4 gy-4">
              {services.map((service) => (
                <Col key={service.id}>
                  <div
                    className="p-3 border border-dark"
                    style={{ borderRadius: "20px", backgroundColor: "#faf9f6" }}
                  >
                    <ServiceHeader service={service} discounts={discounts} />
                    <ServiceDescriptionBtn service={service} />
                    <ServiceDescription service={service} />
                    <button
                      type="button"
                      className="btn btn-sm btn-dark"
                      onClick={() => setCurrentServiceId(service.id)}
                    >
                      Book Now
                    </button>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Container>

      <MainModal
        show={modalShow}
        onHide={() => onHandleClose()}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        loadCalender={loadCalender}
        setLoadCalendar={setLoadCalendar}
        showAddOns={showAddOns}
        setShowAddons={setShowAddons}
        addOns={addOns}
        setAddOns={setAddOns}
        staff={staff}
        variation={variation}
        version={version}
        isAssetsLoading={isAssetsLoading}
        setIsAssetsLoading={setIsAssetsLoading}
      />
    </>
  );
}

/* eslint-disable react/prop-types */
function MainModal({
  show,
  onHide,
  showCalendar,
  setShowCalendar,
  loadCalender,
  setLoadCalendar,
  showAddOns,
  setShowAddons,
  addOns,
  setAddOns,
  staff,
  variation,
  version,
  isAssetsLoading,
  setIsAssetsLoading,
}) {
  let currAddOns = [];
  let navigator = useNavigate();
  const { type } = useParams();

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();

  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [selectedStaff, setSelctedStaff] = useState("");
  const [selectedDate, setSelectedDate] = useState([]);
  const [timeMap, setTimeMap] = useState({});
  const [value, setValue] = useState(new Date());

  if (type === "Pedicure") {
    currAddOns = _pediAddOns;
  } else if (type === "Facial") {
    currAddOns = _facialAddOns;
  } else if (type === "Nails") {
    currAddOns = _nailsAddOns;
  } else {
    setShowAddons(false);
  }

  // Function to handle scrolling when the button is clicked
  const handleScroll = (scrollAmount) => {
    // Calculate the new scroll position
    const newScrollPosition = scrollPosition + scrollAmount;

    if (newScrollPosition < 0 || newScrollPosition > 800) return;

    // Update the state with the new scroll position
    setScrollPosition(newScrollPosition);

    // Access the container element and set its scrollLeft property
    containerRef.current.scrollLeft = newScrollPosition;
  };

  function onHandleSelectedStaff(staffMember, staffMemberId) {
    setSelctedStaff(staffMember);
    setSelectedStaffId(staffMemberId);
  }

  useEffect(() => {
    async function HandleShowCalendar() {
      if (selectedStaff === "" || !loadCalender) return;

      let selectedProvider = null;

      setIsAssetsLoading(true);

      for (let i = 0; i < staff.length; i++) {
        if (staff[i].displayName === selectedStaff) {
          selectedProvider = staff[i];
          break;
        }
      }

      const staffUrl = `/availability/${selectedProvider.teamMemberId}/${variation.id}?version=${version}`;

      const res = await fetch(`${staffUrl}`);

      const jsonRes = await res.json();

      const data = JSON.parse(jsonRes.availabilities);
      const locationData = JSON.parse(jsonRes.locationData);

      setTimeMap(
        Helper.createDateAvailableTimesMap(data, locationData.timezone)
      );

      setShowCalendar(true);
      setIsAssetsLoading(false);
    }

    HandleShowCalendar();
  }, [loadCalender]);

  useEffect(() => {
    async function HandleDateSelector() {
      const nextBtnEl = document.getElementById("nextBtn");
      let month = value.getMonth() + 1;
      let day = value.getDate();

      if (month < 10) {
        month = `0${month}`;
      }

      if (day < 10) {
        day = `0${day}`;
      }

      let lookUpDate = `${value.getFullYear()}-${month}-${day}`;

      if (nextBtnEl != null) nextBtnEl.onclick = () => {};

      setSelectedDate(timeMap[lookUpDate]);
    }

    HandleDateSelector();
  }, [value, selectedStaff, timeMap]);

  function onHandleSelectedDate(time) {
    const scrollEl = document.getElementById("availableTimesDiv");
    const nextBtnEl = document.getElementById("nextBtn");

    for (let i = 0; i < scrollEl.children.length; i++) {
      if (scrollEl.children[i].id === time) {
        scrollEl.children[i].className =
          scrollEl.children[i].className + " bg-primary text-white";
      } else {
        scrollEl.children[i].className = "p-2 border border-dark text-center";
      }
    }

    nextBtnEl.onclick = () => {
      navigator(
        `/contact/${selectedStaffId}/${
          variation.id
        }?startAt=${time}&serviceVersion=${version}&addOns=${JSON.stringify(
          addOns
        )}`
      );
    };
  }

  function isStaffChecked(member) {
    if (selectedStaff === "") {
      setSelctedStaff(member.displayName);
      onHandleSelectedStaff(member.displayName, member.teamMemberId);
      return true;
    } else if (selectedStaff === member.displayName) {
      return true;
    }

    return false;
  }

  function handleNext() {
    if (showAddOns) setShowAddons(false);
    else setLoadCalendar(true);
  }

  function modalTitle() {
    if (showAddOns) {
      return "Select Add-Ons";
    } else if (showCalendar) {
      return "Select Appointment Date";
    } else {
      return "Select a Service Provider";
    }
  }

  function handleClickedAddOn(event, addOn) {
    if (event.target.checked) {
      setAddOns([...addOns, addOn]);
    } else {
      setAddOns(addOns.filter((item) => item !== addOn));
    }
  }

  function handleModalBody() {
    if (showCalendar) {
      return (
        <>
          <Calendar
            onClickDay={(value) => setValue(value)}
            className={"mx-auto"}
            value={value}
          />
          <h4 className="text-center mt-4">Select a Time</h4>
          {selectedDate === undefined || selectedDate.length === 0 ? (
            <p className="text-center">No Available Time Slots</p>
          ) : (
            <Container className="d-flex flex-row align-items-center justify-content-center mt-4">
              <img
                src={LeftIcon}
                onClick={() => handleScroll(-200)}
                className="me-3"
              />
              <div
                ref={containerRef}
                style={{
                  width: "90%",
                  overflowX: "scroll",
                  scrollBehavior: "smooth",
                }}
              >
                <div
                  className="d-flex align-items-center"
                  id="availableTimesDiv"
                  style={{ gap: "20px" }}
                >
                  {selectedDate?.map((date) => (
                    <button
                      key={date.date}
                      id={date.date}
                      onClick={() => onHandleSelectedDate(date.date)}
                      className="p-2 border border-dark text-center"
                      style={{ width: "120px" }}
                    >
                      {date.time}
                    </button>
                  ))}
                </div>
              </div>
              <img
                src={RightIcon}
                onClick={() => handleScroll(200)}
                className="ms-3"
              />
            </Container>
          )}
        </>
      );
    } else if (showAddOns) {
      return currAddOns.map((addOn) => (
        <label key={addOn.name}>
          <input
            type="checkbox"
            className="me-2"
            onChange={(event) => handleClickedAddOn(event, addOn.name)}
          />
          {addOn.name} - {addOn.fixed ? `$${addOn.price}` : `$${addOn.price}+`}
        </label>
      ));
    } else if (!showAddOns) {
      return isAssetsLoading ? (
        <Container className="d-flex align-items-center justify-content-center mt-4">
          <Spinner animation="border" role="status"></Spinner>
          <span className="ms-3">Loading...</span>
        </Container>
      ) : (
        staff.map((member) => (
          <label key={member.teamMemberId}>
            <input
              type="radio"
              className="me-2"
              checked={isStaffChecked(member)}
              onChange={() =>
                onHandleSelectedStaff(member.displayName, member.teamMemberId)
              }
            />
            {member.displayName}
          </label>
        ))
      );
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          <strong>{modalTitle()}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <div className="d-flex flex-column">{handleModalBody()}</div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Close
        </button>
        <button
          className="btn btn-dark"
          id="nextBtn"
          disabled={isAssetsLoading && (!showAddOns || loadCalender)}
          onClick={() => handleNext()}
        >
          {isAssetsLoading && !showAddOns ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            "Next"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

function getItemPrice(item, discounts) {
  const originalPrice = Helper.formatMoney(
    item.itemData.variations[0].itemVariationData.priceMoney.amount
  );

  for (let i = 0; i < discounts.length; i++) {
    if (item.itemData.name === discounts[i].discountData.name) {
      const discountedPrice = Helper.formatMoney(
        discounts[i].discountData.amountMoney.amount
      );

      let origPriceInt = parseInt(originalPrice.substring(1), 10);
      let discountedPriceInt = parseInt(discountedPrice.substring(1), 10);

      return (
        <>
          <span
            style={{
              textDecoration: "line-through",
              textDecorationColor: "red",
            }}
          >
            {originalPrice}
          </span>
          <span> ${origPriceInt - discountedPriceInt}</span>
        </>
      );
    }
  }

  return originalPrice;
}
