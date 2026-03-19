# 📱 SmarTools - Envio de SMS com Twilio

Aplicação web para envio de SMS com acompanhamento de status em tempo real.  
O projeto combina **front-end em HTML/CSS/JS** com **back-end em Node.js/Express** integrado ao serviço **Twilio**.

---

## 🚀 Funcionalidades
- Tela inicial com **loading animado**.
- Formulário para envio de SMS (número de destino + mensagem).
- Histórico de mensagens enviadas com **indicadores visuais de status**:
  - 🟡 queued  
  - 🔵 sent  
  - 🟢 delivered  
  - 🔴 failed/undelivered
- Atualização de status em **tempo real via WebSocket (Socket.IO)**.
- Pop-up com informações de APN.
- Botão para limpar histórico e iniciar novo envio.

---

## 🛠️ Tecnologias utilizadas

### Front-end
- **HTML5** → estrutura da aplicação  
- **CSS3** → estilização e animações  
- **JavaScript (Vanilla JS)** → lógica de envio e manipulação do DOM  
- **Fetch API** → requisições HTTP para o backend  
- **Socket.IO (cliente)** → atualização em tempo real dos status  

### Back-end
- **Node.js** → ambiente de execução  
- **Express.js** → criação de rotas e API REST  
- **Twilio SDK** → envio de SMS e recebimento de status  
- **Socket.IO (servidor)** → comunicação em tempo real com o front-end  
- **body-parser** → tratamento de requisições JSON  
- **CORS** → habilitar acesso entre origens diferentes  
- **Ngrok** → expor servidor local para receber callbacks da Twilio  

---

## 📡 Fluxo da aplicação
1. Usuário envia SMS pelo formulário no navegador.  
2. Front-end faz requisição `POST /send-sms` para o backend.  
3. Backend usa Twilio para enviar o SMS e retorna status inicial ("queued").  
4. Twilio processa o envio e chama o webhook `/sms-status`.  
5. Backend recebe atualização e emite evento via Socket.IO.  
6. Front-end atualiza o histórico em tempo real.  
7. Usuário visualiza status atualizado com indicador colorido.  

---


