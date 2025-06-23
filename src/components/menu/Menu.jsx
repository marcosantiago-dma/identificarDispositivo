import React, { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import "./Menu.css";

async function getDeviceFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const hash = Array.from(result.visitorId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (hash % 500) + 1;
}

// Função para tentar obter IP(s) privados via WebRTC
function getLocalIPs(callback) {
  const ips = new Set();
  const pc = new RTCPeerConnection({ iceServers: [] });

  pc.createDataChannel("");
  pc.createOffer()
    .then((offer) => pc.setLocalDescription(offer))
    .catch(() => { /* falha ignorada */ });

  pc.onicecandidate = (event) => {
    if (!event.candidate) {
      // Acabou de coletar todos os coletores
      callback(Array.from(ips));
      return;
    }
    // Aqui, cada "candidate" ICE pode conter um IP privado
    const regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
    const ipMatch = regex.exec(event.candidate.candidate);
    if (ipMatch) {
      ips.add(ipMatch[1]);
    }
  };
}

const Modal = ({ show, onClose, message }) => {
  if (!show) return null;
  return (
    <div className="react-modal-overlay">
      <div className="react-modal-content">
        <h2 className="react-modal-title">Atenção</h2>
        <p className="react-modal-message">{message}</p>
        <button onClick={onClose} className="react-modal-button">
          OK
        </button>
      </div>
    </div>
  );
};

export default function Menu() {
  const [modal, setModal] = useState({ show: false, message: "" });
  const [deviceId, setDeviceId] = useState(null);
  const [ipPublic, setIpPublic] = useState(null);
  const [ipPrivates, setIpPrivates] = useState([]);

  useEffect(() => {
    getDeviceFingerprint().then(setDeviceId);

    fetch("https://ipinfo.io/json?token=8760836c341ef2")
      .then((res) => res.json())
      .then((data) => setIpPublic(data.ip))
      .catch((err) => console.error("Erro ao obter IP público:", err));

    getLocalIPs((ips) => {
      setIpPrivates(ips);
    });

    // (Seu código original de proteções e eventos pode ser inserido aqui...)

  }, []);

  return (
    <>
      <Modal
        show={modal.show}
        message={modal.message}
        onClose={() => setModal({ show: false, message: "" })}
      />
      <div className="Menu" style={{ backgroundColor: "#FFFFFF" }}>
        <img
          src="https://grupodma.com.br/assets/dma-logo.png"
          className="imgLogoMenu"
          alt="logo"
        />
        <div className="grid">
          <h2>Identificar dispositivo</h2>
          <h3>Login</h3>
          <p>
            <b>ID do dispositivo:</b> {deviceId}
          </p>
          <p>
            <b>IP público:</b> {ipPublic || "Carregando..."}
          </p>
          <p>
            <b>IP(s) privado(s):</b>{" "}
            {ipPrivates.length > 0 ? ipPrivates.join(", ") : "Não detectado"}
          </p>
          <input type="number" placeholder="Matricula" />
          <input type="password" placeholder="Senha" />
          <button className="button">Entrar</button>
        </div>
      </div>
    </>
  );
}