import FB from "../assets/icons/facebook-icon.svg";
import Insta from "../assets/icons/insta-icon.svg";

export default function SocialMedia() {
  return (
    <div className="d-flex flex-row pb-4">
      <a href="https://m.facebook.com/61560397468054/">
        <img
          alt="Facebook Icon"
          src={FB}
          width={30}
          height={30}
          className="me-3"
        />
      </a>
      <a href="https://www.instagram.com/mh.nails.and.spa/?igsh=MXdndHIwZmZ3NXlkeQ%3D%3D">
        <img alt="Instagram Icon" src={Insta} width={30} height={30} />
      </a>
    </div>
  );
}
