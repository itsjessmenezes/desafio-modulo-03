import './style.css';
import { useState } from "react";
import filtrar from '../../assets/filtro.svg';
import ModalFiltro from './ModalFiltro';

function Filtro({ transacao, selectedCategory, setSelectedCategory, selectedDay, setSelectedDay, setValorMax, valorMax, setValorMin, valorMin, aplicarFiltros, limparFiltros }) {
  const [filtro, setFiltro] = useState(false);

  function handlerFilter() {
    if (filtro) {
      setFiltro(false);
    } else {
      setFiltro(true);
    }
  }
  return (
    <div>
      <div onClick={handlerFilter} className="open-filters-button">
        <img src={filtrar} alt="Filtrar" />
        <span className="filtrar">Filtrar</span>
      </div>
      {filtro && <ModalFiltro
        transacao={transacao}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        valorMin={valorMin}
        setValorMin={setValorMin}
        valorMax={valorMax}
        setValorMax={setValorMax}
        aplicarFiltros={aplicarFiltros}
        limparFiltros={limparFiltros}
      />}
    </div>
  );
}

export default Filtro;