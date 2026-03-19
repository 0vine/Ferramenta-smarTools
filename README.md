📡 Ferramenta de Configuração de Rastreadores M2M via SMS

📝 Descrição
Esta aplicação foi desenvolvida para auxiliar na configuração de rastreadores M2M via SMS.
Através do envio de comandos específicos, o rastreador é configurado e integrado à plataforma desejada pelo cliente, simplificando o processo de ativação e gerenciamento.

🚀 Tecnologias Utilizadas
JavaScript

Node.js

Electron.js

🔗 Integração com API BrasilSMS
A aplicação utiliza a API da BrasilSMS para realizar o envio e gerenciamento das mensagens SMS necessárias para configurar os rastreadores.

Métodos da API usados na aplicação
Envio de SMS (sendSMS)

Responsável por enviar comandos de configuração diretamente para o número do rastreador.

Exemplo de uso: enviar parâmetros como servidor, porta, APN, usuário e senha.

Diagrama -

Usuário (navegador)
   │
   │ Digita número + mensagem
   ▼
Front-end (HTML/JS)
   │
   │ POST /send-sms
   ▼
Backend (Express + Twilio)
   │
   │ Envia SMS via Twilio API
   │ Define statusCallback → /sms-status
   ▼
Twilio (provedor de SMS)
   │
   │ Entrega SMS ao destinatário
   │ Notifica status (queued, sent, delivered, failed)
   ▼
Webhook /sms-status (Backend)
   │
   │ Recebe atualização da Twilio
   │ Emite evento via Socket.IO
   ▼
Front-end (Socket.IO)
   │
   │ Atualiza histórico em tempo real
   ▼
Usuário vê status atualizado (pontinho colorido)
