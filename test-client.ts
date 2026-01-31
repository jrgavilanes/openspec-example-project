const ws = new WebSocket("ws://localhost:3000");

ws.onerror = (e) => {
    console.error("Connection error:", e);
};

ws.onclose = (e) => {
    console.log("Connection closed", e.code, e.reason);
};

ws.onopen = () => {
  console.log("Connected");
  
  // Create a party
  ws.send(JSON.stringify({ action: "create", name: "Test Party" }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Received:", data);

  if (data.type === "update" && data.partidos.length > 0) {
    const partido = data.partidos.find(p => p.name === "Test Party");
    if (partido && partido.numvotes === 0) {
        console.log("Voting for party:", partido.id);
        ws.send(JSON.stringify({ action: "vote", id: partido.id }));
    } else if (partido && partido.numvotes === 1) {
        console.log("Vote confirmed! Deleting party...");
        ws.send(JSON.stringify({ action: "delete", id: partido.id }));
    } else if (data.partidos.length === 0) { // Or if our party is gone
        console.log("Party deleted. Test complete.");
        process.exit(0);
    }
  }
};
