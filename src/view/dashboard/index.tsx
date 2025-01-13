const Dashboart: React.FC = () => {
  const socket = new WebSocket("ws://localhost:5000");
  console.log(socket);
  socket.onopen = function (e) {
    socket.send("123");
    console.log(socket);
  };
  return <>dashboart</>;
};

export default Dashboart;
