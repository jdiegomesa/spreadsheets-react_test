import React, { Component} from 'react';

class Card extends Component{
  render(){
    return(
       <div className="Content-card">
            <img className="Content-card-img" src={`https://drive.google.com/uc?export=view&id=${this.props.foto}`} alt="flor_uno" />
            {/* <p className='Content-card-flag'>{this.props.ecosistema}</p> */}
            <h5 className="Content-card-title">{this.props.nombre}</h5>
            <p className="Content-card-text"><span>Nombre científico: </span>{this.props.nombre_cientifico}</p>
            <p className="Content-card-text"><span>Familia: </span>{this.props.familia}</p>
            <p className="Content-card-text">{this.props.descripcion}</p>

        </div>
    )
  }
}

export default Card;
