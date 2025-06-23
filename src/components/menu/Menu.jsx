/* global EB */
import React, { useEffect, useState } from "react";
import "./Menu.css";

// Função para obter o número de série no Enterprise Browser
function getSerialNumber(callback) {
  if (window.EB && EB.Device && EB.Device.getSerialNumber) {
    EB.Device.getSerialNumber(function (result) {
      callback(result.serialNumber || "Não disponível");
    });
  } else {
    callback("API Enterprise Browser não disponível");
  }
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
  const [serial, setSerial] = useState("Carregando...");

  useEffect(() => {
    getSerialNumber(setSerial);
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
          <p className="by">Desenvolvido por Marco Tulio C Santiago</p>
          <h2>Login</h2>
          <p>
            <b>Serial do coletor:</b> {serial}
          </p>
          <input type="number" placeholder="Matricula" />
          <input type="password" placeholder="Senha" />
          <button className="button">Entrar</button>
          
        </div>
      </div>
    </>
  );
}