import app from "./app"

// Start the server
const port = process.env.PORT || 3007
app.listen(port, () => console.log(`Jaipur listening on port ${port}!`))
