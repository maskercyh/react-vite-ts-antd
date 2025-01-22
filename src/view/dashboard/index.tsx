import { getLocalInfo } from "@/utils/local";
import { STORAGE_AUTHORIZE_KEY } from "@/stores/public";
const Dashboart: React.FC = () => {
  const token = getLocalInfo(STORAGE_AUTHORIZE_KEY);
  const socket = new WebSocket(`ws://localhost:5000/socket`);
  socket.onopen = function (e) {
    if (socket.readyState === 1) {
      socket.send(JSON.stringify({ token: token }));
    }
  };
  return <>dashboart</>;
};

export default Dashboart;
