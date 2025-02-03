export default function GoogleMap() {
  return (
    <iframe
      style={{ border: 0, width: "100%", height: "50vh" }}
      loading="lazy"
      src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJcfp-bWVp54gRPCqPsdSC6rE&key=AIzaSyCJ4LOvCYMV6_gF9MQKlU2r7XHJd4__Vlg&zoom=18"
    ></iframe>
  );
}
//       src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJQTluAdVr54gRKQieKvH65W8&key=AIzaSyCJ4LOvCYMV6_gF9MQKlU2r7XHJd4__Vlg&zoom=18"
