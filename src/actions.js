const dataUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1Pol0UZZaFmRD6QeY3nyBKds3jQCD7ixgYqxkoN3P_ik/values/hoja?key=AIzaSyDieB0KccUfXLYivb0OEkXK-lI1dyJycxw';

export function searchAsync(query){
  return (dispatch) => {
    dispatch(isLoading(true));
    setTimeout(
      () => {
          dispatch(isLoading(false));
          dispatch(search(query));
      }
    , 2000)
  }
}

export function search(query){
  return{
    type: 'SEARCH',
    payload: {
      query
    }
  }
}

export function isLoading(value){
  return{
    type: 'LOADING',
    payload: {
      value
    }
  }
}


export function procesaDatosAJSON(infoJson){
  let entries = infoJson.values;
  let numFilas = entries.length;
  //Procesamos los datos
  let campos = [];
  let datos = [];
  for(var f=0; f<numFilas; f++) {
      let fila = entries[f];

      //Recorremos cada fila por columnas
      //creamos un nuevo objeto
      let obj = {};
      for(var c=0; c<fila.length; c++) {
          let celda = fila[c];
          if (f == 0){    //Si es la fila 0, son los nombres de los campos
              //Anotamos el nombre en la lista de campos
              campos.push(celda);
          }
          else {  //En las ddemás filas
              //Asignamos la propiedad que corresponda según la posición
              obj[campos[c]] = celda;
          }
      }
      //Añadimos el nuevo objeto a la colección de datos (si no es la primera fila)
      if (f > 0) datos.push(obj);
  }
  return datos;
}

export function fetchDataBegin() {
  return {
    type: 'FETCH_DATA_BEGIN'
  }
};

export function fetchDataSuccess(data) {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: { data }
  }
};

export function fetchDataFailure(error) {
  return {
    type: 'FETCH_DATA_FAILURE',
    payload: { error }
  }
};

export function fetchData() {
  return dispatch => {
    dispatch(fetchDataBegin());
    return fetch(dataUrl, { method: 'GET', mode: 'cors' })
      .then(handleErrors)
      .then(res => res.json())
      .then(res => procesaDatosAJSON(res))
      .then(res => {
        dispatch(fetchDataSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchDataFailure(error));
      });
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

