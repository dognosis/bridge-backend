import server from "./app";

const PORT = 3000;

server.listen(PORT, () => {
  return console.log(`Express is listening at https://localhost:${PORT}`);
});
