const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const doctorRouter = require("./routes/doctor/doctor");
const patientRouter = require("./routes/patient/patient");

const emailController = require("./controllers/emailController");
const loginController = require("./controllers/loginController");
const pdfController = require("./controllers/pdfController");
const chatController = require("./controllers/chatController");
const verifyToken = require("./controllers/verifyToken");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/doctor", doctorRouter);
app.use("/patient", patientRouter);

app.get("/confirm/:token", emailController.confirmEmail);
app.post("/login", loginController.login);
app.get("/loginViaJwt", verifyToken, loginController.loginViaJwt);
app.post("/sendConfEmail", emailController.sendConfirmationEmail);

app.post("/insertPDF", verifyToken, pdfController.insertPDF);
app.get("/getPDFs", verifyToken, pdfController.getPDFs);
app.get("/getPDFsForPatient", verifyToken, pdfController.getPDFsForPatient);
app.delete("/deletePDF", verifyToken, pdfController.removePDF);
app.patch("/updatePDF", verifyToken, pdfController.updatePDF);

app.get("/getAllMedications", verifyToken, pdfController.getAllMedications);
app.get(
  "/getAllMedicationsForPatient",
  verifyToken,
  pdfController.getAllMedicationsForPatient
);

app.post("/sendForgotPassEmail", emailController.sendForgotPassEmail);
app.post("/resetPass", emailController.resetPass);

app.post("/addChatMessage", verifyToken, chatController.addChatMessage);
app.get("/getChatMessages", verifyToken, chatController.getChatMessages);

const io = new Server(server, {
  /*Code adapted from: https://github.com/machadop1407/react-socketio-chat-app */
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //   console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});

server.listen(3001);
