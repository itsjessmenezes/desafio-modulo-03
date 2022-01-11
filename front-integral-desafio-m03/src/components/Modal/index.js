import './style.css';
import InputMask from 'react-input-mask';
import close from '../../assets/close.svg';

function Modal({
  setOpenModal, getEntry,
  editing, setEditing,
  modalValue, setModalValue
}) {

  const closeClear = () => {
    setOpenModal(false);
    setEditing(false);
    setModalValue({ ...modalValue, type: 'debit' });
  }

  const verifyType = () => {
    if (document.getElementById('credit-button').checked) {
      setModalValue({ ...modalValue, type: 'credit' });
    } else {
      setModalValue({ ...modalValue, type: 'debit' });
    }
  }

  const handleRegister = async () => {

    const dia = modalValue.date.slice(0, 2);
    const mes = Number(modalValue.date.slice(3, 5)) - 1;
    const ano = modalValue.date.slice(6, modalValue.date.length);
    const dataFormatada = new Date(ano, mes, dia);
    const date = new Date(ano, mes, dia).getDay();



    const day = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];
    const weekDay = day[date];

    if (!modalValue.value || !modalValue.category || !modalValue.date || !modalValue.description) {
      return;
    }

    try {
      const dados = {
        date: dataFormatada,
        week_day: weekDay,
        description: modalValue.description,
        value: Number(modalValue.value),
        category: modalValue.category,
        type: modalValue.type
      };

      const response = await fetch(`http://localhost:3333/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      await response.json();

      setModalValue({});

    } catch (error) {
      console.log(error);
    }
    setOpenModal(false);
    await getEntry();
  }


  const handleEdit = async () => {
    const dia = modalValue.date.slice(0, 2);
    const mes = Number(modalValue.date.slice(3, 5)) - 1;
    const ano = modalValue.date.slice(6, modalValue.date.length);
    const dataFormatada = new Date(ano, mes, dia);
    const date = new Date(ano, mes, dia).getDay();



    const day = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];
    const weekDay = day[date];

    if (!modalValue.value || !modalValue.category || !modalValue.date || !modalValue.description) {
      return;
    }

    try {
      const dados = { date: dataFormatada, week_day: weekDay, description: modalValue.description, value: Number(modalValue.value), category: modalValue.category, type: modalValue.type };
      const response = await fetch(`http://localhost:3333/transactions/${editing.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      await response.json();
      setEditing(false);

    } catch (error) {
      console.log(error);
    }
    setOpenModal(false);
    await getEntry();
  }

  return (
    <div className="modal-card">
      <div className="modal-container">
        <div className="add-registro">
          <h1 className="h1">{editing ? 'Editar' : 'Adicionar'} Registro</h1>
          <img onClick={() => closeClear()} className="close-icon" src={close} alt="Fechar" />
        </div>
        <div className="buttons">
          <input onClick={verifyType} id="credit-button" type="radio" name="radio" />
          <label id="credit-button" name="radio" htmlFor="credit-button">Entrada</label>

          <input onClick={verifyType} defaultChecked id="debit-button" type="radio" name="radio" />
          <label id="debit-button" htmlFor="debit-button">Saída</label>
        </div>

        <form className="form">
          <label className="label" htmlFor="valor" >Valor</label>
          <input className="input" type="number" name="value" value={modalValue.value} onChange={(e) => setModalValue({ ...modalValue, value: (e.target.value) })} />

          <label className="label" htmlFor="categoria" >Categoria</label>
          <input className="input" type="text" name="category" value={modalValue.category} onChange={(e) => setModalValue({ ...modalValue, category: (e.target.value) })} />

          <label className="label" htmlFor="data">Data</label>
          <InputMask mask="99/99/9999" className="input" name="date" value={modalValue.date} onChange={(e) => setModalValue({ ...modalValue, date: (e.target.value) })} />

          <label className="label" htmlFor="descricao">Descrição</label>
          <input className="input" type="text" value={modalValue.description} onChange={(e) => setModalValue({ ...modalValue, description: (e.target.value) })} />
        </form>
        <button onClick={() => editing ? handleEdit() : handleRegister()} className="btn-insert">Confirmar</button>
      </div>
    </div>
  );
}

export default Modal;