import { useEffect, useState } from 'react/cjs/react.development';
import './style.css';

function Resumo({ setOpenModal, transacao }) {
  const [resumo, setResumo] = useState({ entradas: 0, saidas: 0, total: 0 });

  useEffect(() => {
    const entradas = transacao.reduce((prevVal, curVal) => {
      if (curVal.type === 'credit') {
        prevVal += curVal.value;
      }
      return prevVal;
    }, 0);

    const saidas = transacao.reduce((prevVal, curVal) => {
      if (curVal.type === 'debit') {
        prevVal += curVal.value;
      }
      return prevVal;
    }, 0);

    const newResumo =
    {
      entradas,
      saidas,
      total: entradas - saidas
    }
    setResumo(newResumo);
  }, [transacao]);

  return (
    <div className="card">
      <div className="container-resume">
        <h1 className="h1-resumo">Resumo</h1>
        <div className="entradas">
          <span>Entradas</span>
          <span className="in credit-color">{resumo.entradas.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <div className="saidas">
          <span>Saídas</span>
          <span className="out debit-color">{resumo.saidas.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <div className="line-divisor"></div>
        <div className="total">
          <span>Saldo</span>
          <span className="balance">{resumo.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
        </div>
      </div>
      <button onClick={() => setOpenModal(true)} className="btn-add">Adicionar Registro</button>
    </div>
  );
}

export default Resumo;