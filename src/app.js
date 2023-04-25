import React, { Component} from 'react';
import { connect } from 'react-redux';
import { List as list} from 'immutable';
import { bindActionCreators } from 'redux';
import * as actions from './actions.js';

import Card from './components/card';

class App extends Component{
  buscar = event => {
    event.preventDefault();

    this.props.actions.search(this.input.value);
  }
  setInputRef = element => {
    this.input = element;
  }
  componentDidMount() {
    this.props.actions.fetchData();
  }
  
  render(){
    return(
      <section>
        <div  className='BotanicoPortada'>
          <h1 className='BotanicoPortada-title'>Jardín Botánico de Bogotá</h1>
          <h2 className='BotanicoPortada-subtitle'>Digital</h2>
        </div>
        <p></p>
        <form onSubmit={this.buscar} className="Botanico-search">
          <label className="Botanico-search-label">Buscar especie:</label>
          <input type="text" ref={this.setInputRef} className="Botanico-search-input"></input>
          <button onClick={this.buscar} className="Botanico-search-button">Buscar</button>
        </form>
        <div class="Content">
          {
            this.props.status ? (
              this.props.busqueda.map((el) =>
                <Card 
                  // ecosistema={el.ecosistema}
                  nombre_cientifico={el.nombre_cientifico}
                  nombre={el.nombre}
                  familia={el.familia}
                  foto={el.foto}
                  descripcion={el.descripcion}
                />
              )
            ):(
              <h1>No se encontró nada</h1>
            )
          }
          {
            this.props.loading &&
            <p>Buscando...</p>
          }
        
        </div>
      </section>
    )
  }
}

function mapStateToProps(state, props){
  let results = list();
  let status = true;
  const search = state.get('data').get('search');
  const nombres = state.get('data').get('data');
  console.log('Busqueda = ' + search)
  if (search){
    results = nombres.filter((item) => {
      return item.nombre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""));
    })
  } else {
    results = nombres
    console.log(results);
  }
  if (results.length > 0){
    status = true
  } else {
    status = false
  }
  return{
    status,
    busqueda: results,
    loading: state.get('isLoading').get('active')
  }
}

function mapDispatchToProps(dispatch){
  return{
      actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
