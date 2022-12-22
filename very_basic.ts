// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2

function handleRequest(requews: req)
handleRequest(req.url, req.method as "GET");