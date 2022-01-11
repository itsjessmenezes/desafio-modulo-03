import './style.css';
import Portal from '../helpers/Portal';
import setaUp from '../../assets/arrow-up-confirm.svg';
import excluir from '../../assets/delete.svg';
import editar from '../../assets/edit.svg';
import { usePopper } from 'react-popper';
import { useState } from 'react/cjs/react.development';


function ItemTabela({ transacao, setOpenModal, getEntry, setEditing }) {

  const [openPop, setOpenPop] = useState(false);
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: 'bottom-start' })


  const dia = transacao.date.slice(8, 10);
  const mes = transacao.date.slice(5, 7);
  const ano = transacao.date.slice(0, 4);
  const dataFormatada = `${dia}/${mes}/${ano}`;

  const editingModal = () => {
    setOpenModal(true);
    setEditing(transacao);
  }
  const confirmBtn = () => {
    if (!openPop) {
      setOpenPop(true);
    } else {
      setOpenPop(false);
    }
  }

  const handlerDelete = async (id) => {
    try {
      await fetch(`http://localhost:3333/transactions/${id}`, { method: 'DELETE' });
      await getEntry();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="table-body">
      <div className="table-line" key={transacao.id}>
        <div className="column-title" id="day">{dataFormatada}</div>
        <div className="column-title" id="week">{transacao.week_day}</div>
        <div className="column-title" id="desc">{transacao.description}</div>
        <div className="column-title" id="cat">{transacao.category}</div>
        <div
          className={`column-title ${transacao.type === 'credit' ? 'credit-color' : 'debit-color'}`}
          id="val">R${transacao.value}
        </div>
        <div className="icons">
          <img className="edit-icon" onClick={() => editingModal()} src={editar} alt="Editar" />
          <img className="delete-icon" key={transacao.id} onClick={confirmBtn} ref={setReferenceElement} src={excluir} alt="Excluir" />
        </div>
        <div className="divisor" ></div>
        {openPop && (
          <Portal>
            <div className={`container-btn ${openPop ? 'block' : ''}`} ref={setPopperElement} style={styles.popper} {...attributes.popper} key={transacao.id}>
              <img className="confirm-btn-seta-up" src={setaUp} alt="" />
              <div className="container-confirm-delete">
                <p>Apagar item?</p>
                <button className="btn-actions-confirm-delete confirm" onClick={() => handlerDelete(transacao.id) && setOpenPop(false)}>Sim</button>
                <button className="btn-actions-confirm-delete delete" onClick={() => setOpenPop(false)}>Não</button>
              </div>
            </div>
          </Portal>
        )}
      </div>
    </div>
  );
}

export default ItemTabela;