import { server } from "./server/server";

const PORT = 3333;

server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
