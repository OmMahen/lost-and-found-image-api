import app from "./app.js";

const port = process.env.PORT || 3000; // or any other port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
