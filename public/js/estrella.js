class Nodo {
    constructor(fila, columna) {
        this.fila = fila;
        this.columna = columna;
        this.obstaculo = false;
        this.wayPoint = false;
        this.peligroso=false;
        this.g = 0; // Costo real desde el nodo inicial hasta este nodo
        this.f = 0; //g+h
        this.h = 0; // Costo heurístico desde este nodo hasta el nodo objetivo
        this.padre = null;
    }
}
function resolver_W(inicio, meta){
  let aux = [...wayPoints];
  while(aux.length > 0){
   obj = siguiente_wayPoint(aux, inicio);
   
    if(!aEstrella(inicio, obj)){
      return false;
    }
    inicio = obj;

  }

  return aEstrella(inicio, meta);
}

function siguiente_wayPoint(aux, inicio){
    if(aux.length > 0){
      let menor = costeANodo(aux[0], inicio);
      let iMenor = 0;
      let i= 1;

      while(i < aux.length){
        if(menor > costeANodo(aux[i], inicio)){
          menor = costeANodo(aux[i], inicio);
          iMenor = i;
        }
        i++;
      }
      let res = aux[iMenor];
      aux.splice(iMenor, 1);
      return res;
    }
    return null;
}
function aEstrella(inicio, meta) {

  let abierta = [];
  let cerrada = [];

  abierta.push(inicio);
  var m;

  inicio.g=0;
  inicio.h= costeANodo(inicio, meta);
  inicio.f= inicio.g+inicio.h;
  inicio.padre=inicio;
  while(abierta.length != 0){
    m = sacarNodoAbierto(abierta);
    cerrada.push(m);

    if(m === meta){
      construir_sol(m, inicio);
      return true;
    }
    let adyacentes = getAdyacentes(m, escenario);

    for(let aux of adyacentes){
      if(aux.obstaculo){
        cerrada.push(aux);
      }
      else if(cerrada.includes(aux) == false){
        aux.padre=m;
        aux.g= m.g+costeANodo(aux, m);
        aux.h=costeANodo(aux, meta);
        if(aux.peligroso){
          aux.f=aux.g+aux.h+1;
        }
        else{
          aux.f=aux.g+aux.h;
        }

        if(abierta.includes(aux)){
          let nodo = abierta.find(nodo => nodo.fila === aux.fila && nodo.columna===aux.columna);
          
          if(aux.g < nodo.g){
            abierta.splice(abierta.indexOf(nodo), 1);
            nodo.padre = m;
            nodo.g=aux.g;
            abierta.push(nodo);
          }

        }
        else{
          abierta.push(aux);
        }

      }
    }
  }
   return false;
}

function costeANodo(nodo, otroNodo) {
  return Math.sqrt(Math.pow(nodo.fila - otroNodo.fila, 2) + Math.pow(nodo.columna - otroNodo.columna, 2));
}
function sacarNodoAbierto(abierta){
  let imejor=0;
  let fmejor= abierta[imejor].f;
  let i = 1;

  while(i < abierta.length){
    if(abierta[i].f < fmejor){
      imejor = i;
      fmejor= abierta[i].f;

    }
    i++;
  }

  let n = abierta[imejor];
  abierta.splice(imejor, 1);
  return n;
}
function getAdyacentes(nodo, tablero){
  let adyacentes=[];
  let i = nodo.fila;
  let j = nodo.columna;
  if(i == 0){
    if(j == 0){
      adyacentes.push(tablero[i+1][j]);
      adyacentes.push(tablero[i+1][j+1]);
      adyacentes.push(tablero[i][j+1]);
    }
    else if(j == columnas-1){
      adyacentes.push(tablero[i][j-1]);
      adyacentes.push(tablero[i+1][j-1]);
      adyacentes.push(tablero[i+1][j]);
    }
    else{
      adyacentes.push(tablero[i][j-1]);
      adyacentes.push(tablero[i+1][j-1]);
      adyacentes.push(tablero[i+1][j]);
      adyacentes.push(tablero[i+1][j+1]);
      adyacentes.push(tablero[i][j+1]);
    }
  }
  else if(i == filas-1){
    if(j == 0){
      adyacentes.push(tablero[i-1][j]);
      adyacentes.push(tablero[i-1][j+1]);
      adyacentes.push(tablero[i][j+1]);
    }
    else if(j == columnas-1){
      adyacentes.push(tablero[i][j-1]);
      adyacentes.push(tablero[i-1][j-1]);
      adyacentes.push(tablero[i-1][j]);
    }
    else{
      adyacentes.push(tablero[i][j-1]);
      adyacentes.push(tablero[i-1][j-1]);
      adyacentes.push(tablero[i-1][j]);
      adyacentes.push(tablero[i-1][j+1]);
      adyacentes.push(tablero[i][j+1]);
    }
  }
  else {
    if(j == 0) {
      adyacentes.push(tablero[i-1][j]);
      adyacentes.push(tablero[i-1][j+1]);
      adyacentes.push(tablero[i][j+1]);
      adyacentes.push(tablero[i+1][j+1]);
      adyacentes.push(tablero[i+1][j]);

    }
    else if(j == columnas - 1) {
      adyacentes.push(tablero[i-1][j]);
      adyacentes.push(tablero[i-1][j-1]);
      adyacentes.push(tablero[i][j-1]);
      adyacentes.push(tablero[i+1][j-1]);
      adyacentes.push(tablero[i+1][j]);
    }
    else {
      adyacentes.push(tablero[i-1][j+1]);
      adyacentes.push(tablero[i][j+1]);
      adyacentes.push(tablero[i+1][j+1]);
      adyacentes.push(tablero[i+1][j]);
      adyacentes.push(tablero[i+1][j-1]);
      adyacentes.push(tablero[i][j-1]);
      adyacentes.push(tablero[i-1][j-1]);
      adyacentes.push(tablero[i-1][j]);

    }
  }
  if(nodo.padre != nodo){
    adyacentes.splice(adyacentes.indexOf(nodo.padre), 1);
  }
  return adyacentes;
}
function construir_sol(nodo, inicio){
  let m = nodo.padre;
  while(m != inicio){
    sol.push(m);
    if(!escenario[m.fila][m.columna].wayPoint){
      var celda = document.getElementById('tabla').rows[m.fila].cells[m.columna];
      celda.style.backgroundColor = "green";
    }
    m = m.padre;
  }
  return sol;
}
function borrar_sol(){
  for(let nodo of sol){
    var celda = document.getElementById('tabla').rows[nodo.fila].cells[nodo.columna];
    if(escenario[nodo.fila][nodo.columna].wayPoint){
      celda.style.backgroundColor = "blue";
    }
    else{
      if(escenario[nodo.fila][nodo.columna].peligroso){
        celda.style.backgroundColor = "#c4c8cd";
      }
      celda.style.backgroundColor = "white";
    }
  }
  sol = [];

}