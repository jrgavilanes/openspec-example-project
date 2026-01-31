const ws = new WebSocket("ws://localhost:3000");

ws.onopen = () => {
  console.log("Connected");
  
  // 1. Invalid JSON
  console.log("Sending: Not JSON");
  ws.send("Not JSON");
  
  setTimeout(() => {
    // 2. Invalid Action (Zod will fail union)
    console.log("Sending: Invalid Action");
    ws.send(JSON.stringify({ action: "invalid" }));
  }, 100);

  setTimeout(() => {
    // 3. Validation Error (Missing name)
    console.log("Sending: Create without name");
    ws.send(JSON.stringify({ action: "create" }));
  }, 200);

  setTimeout(() => {
     ws.close();
  }, 500);
};

ws.onmessage = (event) => {
  console.log("Received:", event.data);
};

ws.onerror = (error) => {
    console.error("WebSocket Error:", error);
};

ws.onclose = (event) => {
    console.log("Closed:", event.code, event.reason);
};