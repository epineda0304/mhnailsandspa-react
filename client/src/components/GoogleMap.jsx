export default function GoogleMap() {
  return (
    <iframe
      style={{ border: 0, width: "100%", height: "50vh" }}
      loading="lazy"
      src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJD-0Cp_Np54gRnFddkh5whJA&key=AIzaSyCJ4LOvCYMV6_gF9MQKlU2r7XHJd4__Vlg&zoom=18"
    ></iframe>
  );
}
