const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const accountSid = 'ACb58d4a4f671457337b2facc6d475e902'; //  SID
const authToken = '2c562ec9e607c7c89c5c9cfa93439480'; //  Auth Token
const client = twilio(accountSid, authToken);

//   URL pública gerada pelo ngrok
const NGROK_URL = 'https://prelacteal-poikiloblastic-rowan.ngrok-free.dev';

//  Nova rota raiz para teste
app.get("/", (req, res) => {
  res.send("🚀 API SmarTools está online e rodando!");
});

// Envio de SMS
app.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;

  try {
    const sms = await client.messages.create({
      from: '+16672399426',
      to: to,
      body: message,
      statusCallback: `${NGROK_URL}/sms-status`
    });

    // Retorna já com status inicial (queued)
    res.json({ 
      success: true, 
      sid: sms.sid, 
      to: to, 
      body: message, 
      status: sms.status // geralmente "queued"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Webhook da Twilio para status
app.post('/sms-status', (req, res) => {
  const { MessageSid, MessageStatus, To } = req.body;

  console.log("Webhook recebido da Twilio:", req.body);

  // Atualiza o frontend em tempo real
  io.emit('smsStatusUpdate', {
    sid: MessageSid,
    to: To,
    status: MessageStatus
  });

  res.sendStatus(200);
});

// 🚀 Agora rodando na porta 4000
server.listen(4000, () => console.log('Servidor rodando na porta 4000'));
