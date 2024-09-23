import Container from "react-bootstrap/esm/Container";
import SocialMedia from "./SocialMedia";

export default function CustomFooter() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      fluid
      style={{ backgroundColor: "black", height: "16vh" }}
    >
      <SocialMedia />
      <div className="border w-50"></div>
    </Container>
  );
}
