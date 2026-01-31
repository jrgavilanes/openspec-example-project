const ws = new WebSocket("ws://localhost:3000");
ws.onopen = () => {
  console.log("Connected");
  const payload = JSON.stringify({ action: "create", name: "Partido Test" });
  console.log("Sending:", payload);
  ws.send(payload);
  setTimeout(() => ws.close(), 500);
};
ws.onmessage = (event) => console.log("Received:", event.data);
ws.onclose = () => console.log("Closed");
