import Container from "react-bootstrap/esm/Container";

/* eslint-disable react/prop-types */
export default function ServiceCatalog({ type }) {
  function selectedMenuItem() {
    const menuEl = document.getElementById("menu1");

    if (menuEl != null) {
      for (let i = 0; i < menuEl.children.length; i++) {
        if (menuEl.children[i].innerHTML.includes(type)) {
          menuEl.children[i].children[0].style.backgroundColor = "black";
          menuEl.children[i].children[0].style.color = "white";
        }
      }
    }

    const menu2El = document.getElementById("menu2");

    if (menu2El != null) {
      for (let i = 0; i < menu2El.children.length; i++) {
        if (menu2El.children[i].innerHTML.includes(type)) {
          menu2El.children[i].children[0].style.backgroundColor = "black";
          menu2El.children[i].children[0].style.color = "white";
        }
      }
    }
  }

  return (
    <>
      <Container
        className="d-flex flex-wrap justify-content-around pt-5"
        id="menu2"
      >
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
              backgroundColor: "white",
              color: "black",
            }}
          >
            Nails
          </div>
        </a>
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
              backgroundColor: "white",
              color: "black",
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
              backgroundColor: "white",
              color: "black",
            }}
          >
            Waxes
          </div>
        </a>
      </Container>
      <Container
        onLoad={selectedMenuItem()}
        className="d-flex flex-wrap justify-content-around mt-4 pb-5"
        id="menu1"
      >
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
              backgroundColor: "white",
              color: "black",
            }}
          >
            Facials
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
              backgroundColor: "white",
              color: "black",
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
        <a
          href="/serviceMenu/Deal"
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "50%",
              border: "2px solid black",
              backgroundColor: "white",
              color: "black",
            }}
          >
            Deals
          </div>
        </a>
      </Container>
    </>
  );
}
