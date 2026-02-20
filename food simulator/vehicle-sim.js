const { io } = require("socket.io-client");
const socket = io("http://localhost:4000/courier");
const COURIER_ID = "courier-demo-1";

socket.on('connect', () => {
  console.log('connected', socket.id);
  socket.emit('register', { courierId: COURIER_ID, name: '홍길동', vehicle_type: 'bike' });
  setInterval(()=> {
    const lat = 37.56 + (Math.random()-0.5)*0.01;
    const lng = 126.97 + (Math.random()-0.5)*0.01;
    socket.emit('location', { courierId: COURIER_ID, lat, lng });
  }, 3000);
});
