import React, { useEffect, useState } from "react";
import './Menu.css';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

// Função de fingerprint para identificar o dispositivo
async function getDeviceFingerprint() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  // Garante valor entre 1 e 250
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
                <button
                    onClick={onClose}
                    className="react-modal-button"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default function Menu() {
    const [modal, setModal] = useState({ show: false, message: "" });
    const [deviceId, setDeviceId] = useState(null);

    useEffect(() => {
        // Corrigido: chamada assíncrona para fingerprint
        getDeviceFingerprint().then(setDeviceId);

        const preventDefault = e => e.preventDefault();

        document.addEventListener('copy', preventDefault);
        document.addEventListener('cut', preventDefault);
        document.addEventListener('paste', preventDefault);
        document.addEventListener('dragstart', preventDefault);
        document.addEventListener('selectstart', preventDefault);

        // Bloqueia o botão direito do mouse
        const contextMenuHandler = e => {
            e.preventDefault();
            setModal({ show: true, message: "Não é possível usar essa função." });
        };
        document.addEventListener('contextmenu', contextMenuHandler);

        // Bloqueia o arrastar de imagens
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', preventDefault);
        });

        // Bloqueia arrastar e soltar textos/arquivos de fora para dentro da página
        const dragOverHandler = (e) => {
            e.preventDefault();
        };
        const dropHandler = (e) => {
            e.preventDefault();
            setModal({ show: true, message: "Não é possível soltar conteúdo externo nesta página." });
        };
        document.addEventListener('dragover', dragOverHandler);
        document.addEventListener('drop', dropHandler);

        // Bloqueia teclas comuns para abrir DevTools
        const keydownHandler = (e) => {
            // F12
            if (e.keyCode === 123) {
                e.preventDefault();
                setModal({ show: true, message: "Não é possível usar essa função." });
            }
            // Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J
            if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) {
                e.preventDefault();
                setModal({ show: true, message: "Não é possível usar essa função." });
            }
            // Ctrl+U
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                setModal({ show: true, message: "Não é possível usar essa função." });
            }
        };
        document.addEventListener('keydown', keydownHandler);

        // Tenta bloquear captura de tela em dispositivos móveis (não é 100% garantido)
        const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
        const visibilityHandler = () => {
            if (document.visibilityState === 'hidden' && isMobile) {
                setModal({ show: true, message: "Captura de tela não é permitida." });
            }
        };
        document.addEventListener('visibilitychange', visibilityHandler);

        // Detecta long press em qualquer canto da tela em dispositivos móveis
        let touchTimer = null;
        const handleTouchStart = (e) => {
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
                    <input type="number" placeholder="Matricula" />
                    <input type="password" placeholder="Senha" />
                    <button className="button">Entrar</button>                
                </div>
            </div>
        </>
    );
}