📡 Ferramenta de Configuração de Rastreadores M2M via SMS

📝 Descrição
Esta aplicação foi desenvolvida para auxiliar na configuração de rastreadores M2M via SMS.
Através do envio de comandos específicos, o rastreador é configurado e integrado à plataforma desejada pelo cliente, simplificando o processo de ativação e gerenciamento.


--
🎨 Front-end
HTML5 → estrutura da página.

CSS3 → estilização (layout dividido, tela de loading, pop-up, botões com hover, indicadores de status).

JavaScript (Vanilla JS) → lógica da aplicação (envio de SMS, manipulação do DOM, abertura/fechamento de pop-up, histórico).

Socket.IO (cliente) → comunicação em tempo real com o servidor para atualizar status dos SMS.

Fetch API → envio de requisições HTTP para o backend (POST /send-sms).




⚙️ Back-end
Node.js → ambiente de execução.

Express.js → framework para criar rotas e gerenciar requisições HTTP.

body-parser → interpretar JSON e dados de formulários.

CORS → permitir requisições de origens diferentes (necessário para o front acessar o backend).

Twilio SDK → integração com o serviço de SMS (envio e recebimento de status).

http (nativo do Node) → criação do servidor base.

Socket.IO (servidor) → emissão de eventos em tempo real para o front-end.

Ngrok → expor o servidor local para a internet e receber callbacks da Twilio.
