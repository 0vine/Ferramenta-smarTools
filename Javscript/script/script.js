 function copiarTexto(texto) {
  navigator.clipboard.writeText(texto).then(() => {
    mostrarToast("Copiado: " + texto);
  }).catch(err => {
    console.error("Erro ao copiar: ", err);
  });
}

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  toast.textContent = mensagem
  toast.className = 'show';
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

    function atualizarPagina() {
      location.reload();
    }
    // Loading inicial com fade-out
    window.addEventListener("load", () => {
      const loading = document.getElementById("loading");
      const app = document.getElementById("app");

      setTimeout(() => {
        loading.classList.add("fade-out");
        app.classList.add("visible");
      }, 2000);
    });

    let ultimoIdMensagem = null;

    const socket = io("http://localhost:4000");

     async function enviar() {
    const numeroDestino = document.getElementById("destinoInput").value.trim();
    const mensagem = document.getElementById("mensagemInput").value.trim();

    if (numeroDestino && mensagem) {
      try {
        const response = await fetch("http://localhost:4000/send-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: numeroDestino, message: mensagem })
        });

        const data = await response.json();

        if (data.success) {
          adicionarLog(data.to, data.body, data.sid, "queued");
        } else {
          adicionarLog("Erro", data.error);
        }
      } catch (error) {
        adicionarLog("Erro", "Falha na requisição: " + error.message);
      }
    } else {
      adicionarLog("Erro", "Preencha o número de destino e a mensagem.");
    }
  }

  function adicionarLog(numero, mensagem, idMensagem = null, status = "enviado") {
    const historico = document.getElementById("historico");
    const log = document.createElement("div");
    log.className = "sms-log";
    if (idMensagem) log.id = "log-" + idMensagem;

    const agora = new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    log.innerHTML = `
      <strong>Número: ${numero} | Mensagem: ${mensagem}</strong>
      <span class="sms-time">Enviado às ${agora}</span>
      <span class="status-dot status-${status}"></span>
    `;
    historico.appendChild(log);
  }

  // Atualiza status em tempo real via WebSocket
  socket.on("smsStatusUpdate", (data) => {
    const log = document.getElementById("log-" + data.sid);
    if (log) {
      const dot = log.querySelector(".status-dot");
      dot.className = `status-dot status-${data.status}`;
    }
  });


    function novoEnvio() {
      document.getElementById("historico").innerHTML = "<h3>Histórico de SMS enviados</h3>";
      document.getElementById("destinoInput").value = "";
      document.getElementById("mensagemInput").value = "";
      document.getElementById("sessao").style.display = "none";
      ultimoIdMensagem = null;
    }

    // Funções do pop-up
    function abrirPopup() {
      document.getElementById("popupOverlay").style.display = "flex";
    }

    function fecharPopup(event) {
      const overlay = document.getElementById("popupOverlay");
      // Fecha se clicar no fundo ou no botão
      if (!event || event.target === overlay) {
        overlay.style.display = "none";
      }
    }

    document.getElementById("destinoInput").addEventListener("focus", function() {
  if (!this.value.startsWith("+")) {
    this.value = "+" + this.value;
  }
});
