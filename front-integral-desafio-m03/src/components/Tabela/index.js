import './style.css';

// import setaUp from '../../assets/arrow-up.svg';
// import setaDown from '../../assets/arrow-down.svg';
import { useState } from 'react';

function Tabela({ transacao, setTransacao }) {
  const [order, setOrder] = useState(true);
  const [columnOrder, setColumnOrder] = useState('');

  const handleOrder = e => {
    const newOrder = !order;
    const orderBy = e.target.id;
    let registerList = [...transacao];

    switch (orderBy) {
      case 'date':
        registerList = newOrder ? registerList.sort((a, b) => {
          return (+ new Date(a.date)) - (+ new Date(b.date))
        }) : registerList.sort((a, b) => {
          return (+ new Date(b.date)) - (+ new Date(a.date))
        });
        break;
      case 'week':
        registerList = newOrder ? registerList.sort((a, b) => {
          return (new Date(a.date).getDay()) - (new Date(b.date).getDay())
        }) : registerList.sort((a, b) => {
          return (new Date(b.date).getDay()) - (new Date(a.date).getDay())
        });

        break;
      case 'valor':
        registerList = newOrder ? registerList.sort((a, b) => {
          return (a.value) - (b.value)
        }) : registerList.sort((a, b) => {
          return (b.value) - (a.value)
        });
        break;
      default:
        break;
    }

    setTransacao(registerList);
    setOrder(newOrder);
    setColumnOrder(orderBy);
  }

  return (
    <div className="table" >
      <div className="table-head">
        <div className="column-title date" >
          <span onClick={handleOrder} id="date" >Data</span>
        </div>
        <div className="column-title" id="week-day" >
          <span onClick={handleOrder} id="week" >Dia da semana</span>
        </div>
        <div className="column-title" id="description">Descrição</div>
        <div className="column-title" id="category">Categoria</div>
        <div className="column-title" id="value" >
          <span onClick={handleOrder} id="valor" >Valor</span>
        </div>
      </div>
    </div>
  );
}

export default Tabela;