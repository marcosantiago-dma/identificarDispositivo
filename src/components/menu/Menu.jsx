import React, { useEffect, useState } from "react";
import './Menu.css';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

// Função para gerar fingerprint
async function getDeviceFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const hash = Array.from(result.visitorId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return (hash % 250) + 1;
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
  const [ipInfo, setIpInfo] = useState(null);

  useEffect(() => {
    // Fingerprint
    getDeviceFingerprint().then(setDeviceId);

    // IP + localização com ipinfo.io
    fetch('https://ipinfo.io/json?token=8760836c341ef2') // substitua pelo seu token
      .then(res => res.json())
      .then(data => setIpInfo(data))
      .catch(err => console.error("Erro ao obter IP:", err));

    // Proteções e bloqueios diversos...
    const preventDefault = e => e.preventDefault();

    document.addEventListener('copy', preventDefault);
    document.addEventListener('cut', preventDefault);
    document.addEventListener('paste', preventDefault);
    document.addEventListener('dragstart', preventDefault);
    document.addEventListener('selectstart', preventDefault);

    const contextMenuHandler = e => {
      e.preventDefault();
      setModal({ show: true, message: "Não é possível usar essa função." });
    };
    document.addEventListener('contextmenu', contextMenuHandler);

    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', preventDefault);
    });

    const dragOverHandler = (e) => e.preventDefault();
    const dropHandler = (e) => {
      e.preventDefault();
      setModal({ show: true, message: "Não é possível soltar conteúdo externo nesta página." });
    };
    document.addEventListener('dragover', dragOverHandler);
    document.addEventListener('drop', dropHandler);

    const keydownHandler = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)) || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        setModal({ show: true, message: "Não é possível usar essa função." });
      }
    };
    document.addEventListener('keydown', keydownHandler);

    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const visibilityHandler = () => {
      if (document.visibilityState === 'hidden' && isMobile) {
        setModal({ show: true, message: "Captura de tela não é permitida." });
      }
    };
    document.addEventListener('visibilitychange', visibilityHandler);

    let touchTimer = null;
    const handleTouchStart = () => {
      if (isMobile) {
        touchTimer = setTimeout(() => {
          setModal({ show: true, message: "Não é possível usar essa função." });
        }, 500);
      }
    };
    const handleTouchEnd = () => {
      if (touchTimer) {
        clearTimeout(touchTimer);
        touchTimer = null;
      }
    };
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('copy', preventDefault);
      document.removeEventListener('cut', preventDefault);
      document.removeEventListener('paste', preventDefault);
      document.removeEventListener('dragstart', preventDefault);
      document.removeEventListener('selectstart', preventDefault);
      document.removeEventListener('contextmenu', contextMenuHandler);
      document.removeEventListener('dragover', dragOverHandler);
      document.removeEventListener('drop', dropHandler);
      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('visibilitychange', visibilityHandler);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.querySelectorAll('img').forEach(img => {
        img.removeEventListener('dragstart', preventDefault);
      });
    };
  }, []);

  return (
    <>
      <Modal
        show={modal.show}
        message={modal.message}
        onClose={() => setModal({ show: false, message: "" })}
      />
      <div className="Menu" style={{ backgroundColor: "#FFFFFF" }}>
        <img src="https://grupodma.com.br/assets/dma-logo.png" className="imgLogoMenu" alt="logo" />
        <div className="grid">
          <h2>Identificar dispositivo</h2>
          <h3>Login</h3>
          <p><b>ID do dispositivo:</b> {deviceId}</p>
          {ipInfo && (
            <>
              <p><b>IP:</b> {ipInfo.ip}</p>
            </>
          )}
          <input type="number" placeholder="Matricula" />
          <input type="password" placeholder="Senha" />
          <button className="button">Entrar</button>
        </div>
      </div>
    </>
  );
}
