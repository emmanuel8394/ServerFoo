const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/enviarNotificacion", (req, res) => {
  const { token, titulo, cuerpo } = req.body;

  const mensaje = {
    data: {
      title: titulo,
      body: cuerpo,
    },
    token: token,
  };

  admin
    .messaging()
    .send(mensaje)
    .then((response) => {
      console.log("✅ Notificación enviada correctamente:", response);
      res.status(200).send("Notificación enviada");
    })
    .catch((error) => {
      console.error("❌ Error al enviar la notificación:", error);
      res.status(500).send("Error al enviar la notificación");
    });
});

app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});

