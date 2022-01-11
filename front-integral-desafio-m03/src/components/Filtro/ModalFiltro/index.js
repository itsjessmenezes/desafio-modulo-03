import './style.css'

function ModalFiltro({ transacao, selectedCategory, setSelectedCategory, selectedDay, setSelectedDay, setValorMax, valorMax, setValorMin, valorMin }) {
  const dayWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

  const handleClear = () => {
    setSelectedCategory([])
    setSelectedDay([])
    setValorMax('')
    setValorMin('')

  }

  const handleApply = () => {
    setSelectedCategory([])
    setSelectedDay([])
    setValorMax('')
    setValorMin('')
  }
  return (
    <div className="container-filters">
      <div className="column-type">
        <p className="titulo">Dia da semana</p>
        {dayWeek.map((dia, id) =>
        (
          <div key={dia}>
            <input type="checkbox" onClick={() => setSelectedDay(dia)} id={id} name="chip-filter" className="chip-filter" />
            <label id="chip-filter" htmlFor={id} className="container-chip" name="chip-filter">{dia} <span>+</span> </label>
          </div>
        ))}
      </div>
      <div className="divisor-filter"></div>

      <div className="column-type">
        <span className="titulo">Categoria</span>
        {
          transacao.map(cat =>
          (
            <div key={cat.category}>
              <input type="checkbox" onClick={() => setSelectedCategory(cat.category)} id={cat.category} name="chip-filter" className="chip-filter" />
              <label id="chip-filter" htmlFor={cat.category} className="container-chip" name="chip-filter">{cat.category} <span>+</span> </label>
            </div>
          ))}
      </div>
      <div className="divisor-filter"></div>
      <div className="column-type">
        <span className="titulo">Valor</span>
        <div className="min-max">
          <label htmlFor="min-value" id="min-value" >Min</label>
          <input type="number" name="min" id="min-value" onChange={(e) => setValorMin(e.target.value)} value={valorMin} />

          <label htmlFor="max-value" id="max-value" >Max</label>
          <input type="number" name="max" id="max-value" onChange={(e) => setValorMax(e.target.value)} value={valorMax} />
        </div>

      </div>
      <div className="column-type">
        <div className="buttons-filter">
          <button className="btn-clear-filters" onClick={handleClear}>Limpar Filtros</button>
          <button className="btn-apply-filters" onClick={handleApply}>Aplicar Filtros</button>
        </div>
      </div>
    </div>
  );
}

export default ModalFiltro;