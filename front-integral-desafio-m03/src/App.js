import './App.css';
import Header from './components/Header';
import Filtro from './components/Filtro';
import Resumo from './components/Resumo';
import Tabela from './components/Tabela';
import Modal from './components/Modal';
import { useEffect, useState } from 'react';
import ItemTabela from './components/ItemTabela';


function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalValue, setModalValue] = useState({
    value: '',
    description: '',
    category: '',
    date: '',
    type: 'debit'
  });
  const [transacao, setTransacao] = useState([]);
  const [editing, setEditing] = useState(false);

  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');

  useEffect(() => {
    getEntry();
  }, []);

  useEffect(() => {
    if (editing) {
      setModalValue({
        value: editing.value,
        category: editing.category,
        date: editing.date,
        type: editing.type,
        description: editing.description
      });
      return;
    }
    setModalValue({
      value: '',
      description: '',
      category: '',
      date: '',
      type: 'debit'
    });
  }, [editing]);

  const getEntry = async () => {
    try {
      const response = await fetch(`http://localhost:3333/transactions`, { method: 'GET' });
      const data = await response.json();
      setTransacao(data);

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="App">
      {openModal &&
        <Modal
          setOpenModal={setOpenModal}
          getEntry={getEntry}
          editing={editing}
          setEditing={setEditing}
          modalValue={modalValue}
          setModalValue={setModalValue}
        />}
      <Header />
      <div className="container-body">
        <div className="container">
          <Filtro
            transacao={transacao}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            valorMin={valorMin}
            setValorMin={setValorMin}
            valorMax={valorMax}
            setValorMax={setValorMax}
          />
          <Tabela transacao={transacao} setTransacao={setTransacao} />
          {
            transacao.map((registro) => (
              <ItemTabela
                key={registro.id}
                transacao={registro}
                setOpenModal={setOpenModal}
                getEntry={getEntry}
                setEditing={setEditing}
              />
            ))}
        </div>
        <Resumo setOpenModal={setOpenModal} setTransacao={setTransacao} transacao={transacao} />
      </div>
    </div>
  );
}

export default App;
