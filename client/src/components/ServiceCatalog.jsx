import Container from "react-bootstrap/esm/Container";

/* eslint-disable react/prop-types */
export default function ServiceCatalog({ type }) {
  function selectedMenuItem() {
    const menuEl = document.getElementById("menu1");

    if (menuEl != null) {
      for (let i = 0; i < menuEl.children.length; i++) {
        if (menuEl.children[i].innerHTML.includes(type)) {
          menuEl.children[i].children[0].style.backgroundColor = "#478778";
          menuEl.children[i].children[0].style.color = "White";
        }
      }
    }

    const menu2El = document.getElementById("menu2");

    if (menu2El != null) {
      for (let i = 0; i < menu2El.children.length; i++) {
        if (menu2El.children[i].innerHTML.includes(type)) {
          menu2El.children[i].children[0].style.backgroundColor = "#478778";
          menu2El.children[i].children[0].style.color = "White";
        }
      }
    }
  }

  return (
    <>
      <Container
        onLoad={selectedMenuItem()}
        className="d-flex flex-wrap justify-content-around pt-5"
        id="menu1"
      >
        <a
          href="/serviceMenu/Deal"
          style={{
            textDecoration: "none",
            color: "Black",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              border: "2px solid black",
              backgroundColor: "#DC143C",
              color: "white",
            }}
          >
            Deals
          </div>
        </a>
        <a
          href="/serviceMenu/Facial"
          style={{ textDecoration: "none", color: "Black" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              border: "2px solid black",
              backgroundColor: "#DC143C",
              color: "white",
            }}
          >
            Facials
          </div>
        </a>
        <a
          href="/serviceMenu/Nails"
          style={{ textDecoration: "none", color: "Black" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              border: "2px solid black",
              backgroundColor: "#DC143C",
              color: "white",
            }}
          >
            Nails
          </div>
        </a>
      </Container>
      <Container
        className="d-flex flex-wrap justify-content-around mt-4 pb-4"
        id="menu2"
      >
        <a
          href="/serviceMenu/Pedicure"
          style={{ textDecoration: "none", color: "Black" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              border: "2px solid black",
              backgroundColor: "#DC143C",
              color: "white",
            }}
          >
            Pedicure
          </div>
        </a>
        <a
          href="/serviceMenu/Wax"
          style={{ textDecoration: "none", color: "Black" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              border: "2px solid black",
              backgroundColor: "#DC143C",
              color: "white",
            }}
          >
            Waxes
          </div>
        </a>
        <a
          href="/serviceMenu/Combos"
          style={{ textDecoration: "none", color: "Black" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              border: "2px solid black",
              backgroundColor: "#DC143C",
              color: "white",
            }}
          >
            Combos
          </div>
        </a>
        {/* <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
            }}
          ></div> */}
      </Container>
    </>
  );
}