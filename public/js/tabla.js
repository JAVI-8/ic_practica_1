        let iniC = -1; //fila de la casilla de incio
        let iniF = -1;//columna de la casilla de inicio
        let finC = -1;//fila de la meta
        let finF = -1;//columna de la meta
        let obstaculo = 0;
        var wayPoints = [];//guarda los waitpoints
        let filas = 10; // Número de filas de la tabla
        let columnas = 10; // Número de columnas de la tabla
        var escenario = [];//matriz en donde se guarda las posiciones
        let sol = [];//contiene la solucion
       
        function resolver(){
          closeContainers();
            if(iniF != -1 && iniC != -1 && finF != -1 && finC != -1){//comprueba si se han indicado el inicio y la meta
              nodoInicio = escenario[iniF][iniC];
              nodoMeta = escenario[finF][finC];
              if(sol.length > 0)
                borrar_sol();
              
              let caminoOptimo;

              if(wayPoints.length == 0){//comprueba si se ha indicado que hay algun wait point
                caminoOptimo = aEstrella(nodoInicio, nodoMeta);
              }
              else{
                caminoOptimo = resolver_W(nodoInicio, nodoMeta);
              }

              if(!caminoOptimo){//comprueba si hay algun camino posible
                document.getElementById("mensajeError").innerText = "No existe un camino posible";
                document.getElementById("mensajeError").style.display = "block";
              }
            }
            else{
              document.getElementById("mensajeError").innerText = "Falta indicar o el inicio o la meta o ambos";
              document.getElementById("mensajeError").style.display = "block";
            }
        }

        function nuevaColumna() {
          if(document.getElementById("nuevaColumnaContainer").style.display  === "none") { 
            closeContainers(); 
            document.getElementById("nuevaColumnaContainer").style.display = "block";
          }
          else{
            closeContainers(); 
          }
        }
        function inicio() {
          if(document.getElementById("casillaInicio").style.display  === "none") { 
            closeContainers(); 
            document.getElementById("casillaInicio").style.display = "block";
          }
          else{
            closeContainers(); 
          }
        }
        function meta() {
          if(document.getElementById("casillaFinal").style.display  === "none") { 
            closeContainers(); 
            document.getElementById("casillaFinal").style.display = "block";
          }
          else{
            closeContainers(); 
          }
        }
        function prohibidas() {
          if(document.getElementById("casillaProhibida").style.display  === "none") { 
            closeContainers(); 
            document.getElementById("casillaProhibida").style.display = "block";
          }
          else{
            closeContainers(); 
          }
        }
        function wayPoint(){
          if(document.getElementById("wayPoint").style.display  === "none") { 
            closeContainers(); 
            document.getElementById("wayPoint").style.display = "block";
          }
          else{
            closeContainers(); 
          } 
        }
        function peligro(){
          if(document.getElementById("peligro").style.display  === "none") { 
            closeContainers(); 
            document.getElementById("peligro").style.display = "block";
          }
          else{
            closeContainers(); 
          } 
        }
        function marcarPeligro(){
          var numFilas = document.getElementById("filaPeligrosa").value;
          var numColumnas = document.getElementById("columnaPeligrosa").value;

          // Llamar a la función y pasar el número de filas y columnas
          if(es_numerico(numFilas, numColumnas)){
            if( dentro_cuadricula(numFilas, numColumnas)){
            if(!esCasillaProhibida(numFilas, numColumnas)){
             agregarPeligro(numFilas, numColumnas);
            }
          }
          }
      }
      function agregarPeligro(fila, columna){
        // Obtener la celda correspondiente y cambiar su color
        if(sol.length > 0)
          borrar_sol();

        var celda = document.getElementById('tabla').rows[fila].cells[columna];
        celda.style.backgroundColor = "red";
        escenario[fila][columna].peligroso=true;
      }
      function agregarColumnas() {
        var numFilas = document.getElementById("numFilasInput").value;
        var numColumnas = document.getElementById("numColumnasInput").value;

            // Llamar a la función y pasar el número de filas y columnas
        agregarNuevasColumnas(numFilas, numColumnas);
      }
      function marcarWayPoint(){
        var numFilas = document.getElementById("filaW").value;
        var numColumnas = document.getElementById("columnaW").value;

          // Llamar a la función y pasar el número de filas y columnas
          if(es_numerico(numFilas, numColumnas)){
            if( dentro_cuadricula(numFilas, numColumnas)){
            if(!esCasillaProhibida(numFilas, numColumnas)){
             agregarWayPoint(numFilas, numColumnas);
            }
          }
          }
      }
      function agregarWayPoint(fila, columna){
            // Obtener la celda correspondiente y cambiar su color
        if(sol.length > 0)
          borrar_sol();

        var celda = document.getElementById('tabla').rows[fila].cells[columna];
        celda.style.backgroundColor = "blue";
        wayPoints.push(escenario[fila][columna]);
        escenario[fila][columna].wayPoint=true;
      }
      function marcarProhibida() {
        var numFilas = document.getElementById("filaP").value;
        var numColumnas = document.getElementById("columnaP").value;

          // Llamar a la función y pasar el número de filas y columnas
          if(es_numerico(numFilas, numColumnas)){
            if( dentro_cuadricula(numFilas, numColumnas)){
            if(!esCasillaProhibida(numFilas, numColumnas)){
              agregarProhibida(numFilas, numColumnas);
            }
          }
          }
      }
      function agregarProhibida(fila, columna) {
          // Obtener la celda correspondiente y cambiar su color
          if(sol.length > 0)
            borrar_sol();

          if(sol.length > 0)
            borrar_sol();

          var celda = document.getElementById('tabla').rows[fila].cells[columna];
          var imageUrl;
          switch(obstaculo){
          case 0:
            imageUrl = '/img/hamilton.jpeg';
            obstaculo++;
            break;
          case 1:
            imageUrl = '/img/ocon.jpeg';
            obstaculo++;
            break;
          case 2:           
            imageUrl = '/img/verstappen.jpeg';
            obstaculo = 0;
            break;
          
        }
          escenario[fila][columna].obstaculo=true;
          celda.style.backgroundImage='url('+imageUrl+')';
          celda.style.backgroundSize = 'cover';
      }
        function marcarInicio() {
            var numFilas = document.getElementById("filaIni").value;
            var numColumnas = document.getElementById("columnaIni").value;

            // Llamar a la función y pasar el número de filas y columnas
            if(es_numerico(numFilas, numColumnas)){
              if( dentro_cuadricula(numFilas, numColumnas)){
              if(!esCasillaProhibida(numFilas, numColumnas)){
                agregarInicio(numFilas, numColumnas);
              }
            }
          }
        }
        function agregarInicio(fila, columna) {
         if(sol.length > 0)
          borrar_sol();

          if(iniC != -1 && iniF!= -1){
              var celda = document.getElementById('tabla').rows[iniF].cells[iniC];
                celda.style.backgroundColor = "white";
                celda.style.backgroundImage = '';
          }
            // Obtener la celda correspondiente y cambiar su color
            var celda = document.getElementById('tabla').rows[fila].cells[columna];
            //celda.style.backgroundColor = "blue";
            var imageUrl = '/img/nano.jpeg';
            celda.style.backgroundImage='url('+imageUrl+')';
            celda.style.backgroundSize = 'cover';
            iniC = columna;
            iniF=fila;
        }
        function marcarFinal() {
          var numFilas = document.getElementById("filaFin").value;
          var numColumnas = document.getElementById("columnaFin").value;

          // Llamar a la función y pasar el número de filas y columnas
          if(es_numerico(numFilas, numColumnas)){
            if(dentro_cuadricula(numFilas, numColumnas)){
              if(!esCasillaProhibida(numFilas, numColumnas)){
               agregarFinal(numFilas, numColumnas);
              }
            }
          }
        }
      function agregarFinal(fila, columna) {
        if(sol.length > 0)
          borrar_sol();

        if(finC != -1 && finF!= -1){
              var celda = document.getElementById('tabla').rows[finF].cells[finC];
              celda.style.backgroundColor = "white";
              celda.style.backgroundImage = '';
        }
          // Obtener la celda correspondiente y cambiar su color
          var celda = document.getElementById('tabla').rows[fila].cells[columna];
          //celda.style.backgroundColor = "green";
          var imageUrl = '/img/trofeo.jpeg';
            celda.style.backgroundImage='url('+imageUrl+')';
            celda.style.backgroundSize = 'cover';
          finC = columna;
          finF=fila;
          
      }
      function agregarNuevasColumnas(f, c) {
        filas = f;
        columnas = c;
        sol = [];
        obstaculo=0;
        closeContainers();
        let tablaElement = document.getElementById('tabla');
        // Borrar la tabla existente
        tablaElement.innerHTML = "";
        wayPoints = [];
        iniC=-1;
        iniF=-1;
        finC=-1;
        finF=-1;
        // Construir una nueva tabla con el tamaño especificado
        for(let i = 0; i < f; i++) {
          let row = tablaElement.insertRow(i);
          escenario[i] = [];
          for(let j = 0; j < c; j++) {
            let cell = row.insertCell(j);
            cell.id = `${i}-${j}`;
            escenario[i][j] = new Nodo(i, j);
                   
            }
          }
          document.getElementById("mensajeError").style.display = "none";
        }

        function esCasillaProhibida(fila, columna) {
          borrar_sol(sol);
          closeContainers();
          if(fila == iniF && columna == iniC){
            document.getElementById("mensajeError").innerText = "En esta posicion se encuentra el inicio. No se puede colocar otro elemento";
            document.getElementById("mensajeError").style.display = "block";
            return true;
          }
          if(fila == finF && columna==finC){
            document.getElementById("mensajeError").innerText = "En esta posicion se encuentra la meta. No se puede colocar otro elemento";
            document.getElementById("mensajeError").style.display = "block";
            return true; 
          }

          if(escenario[fila][columna].obstaculo){ 
            document.getElementById("mensajeError").innerText = "En esta posicion se encuentra un obstaculo. No se puede colocar otro elemento";
            document.getElementById("mensajeError").style.display = "block";
            return true;
          }
          if(escenario[fila][columna].wayPoint){
            document.getElementById("mensajeError").innerText = "En esta posicion se encuentra un way point. No se puede colocar otro elemento";
            document.getElementById("mensajeError").style.display = "block";
            return true;
          }
          if(escenario[fila][columna].peligro){
            document.getElementById("mensajeError").innerText = "En esta posicion se encuentra una casilla peligrosa. No se puede colocar otro elemento";
            document.getElementById("mensajeError").style.display = "block";
            return true;
          }
        document.getElementById("mensajeError").style.display = "none";
        return false; // La casilla no es prohibida
      }
      function closeContainers(){
        document.getElementById("nuevaColumnaContainer").style.display = "none";
        document.getElementById("casillaFinal").style.display = "none";
        document.getElementById("casillaInicio").style.display = "none";
        document.getElementById("casillaProhibida").style.display = "none";
        document.getElementById("wayPoint").style.display = "none";
        document.getElementById("peligro").style.display = "none";
      }
      function es_numerico(fila, columna){
        var filN = /^\d+$/.test(fila);
        var colN = /^\d+$/.test(columna);
        if(!filN || !colN){
            document.getElementById("mensajeError").innerText = "Por favor introduzca valores numericos";
            document.getElementById("mensajeError").style.display = "block";
            return false;
        }
        return true;
      }
      function dentro_cuadricula(f, c){
        if(filas <= f || columnas <= c || c < 0 || f < 0){
            document.getElementById("mensajeError").innerText = "Introduzca valores dentro del rango de la tabla";
            document.getElementById("mensajeError").style.display = "block";
           return false;
        }
        return true;
      }
          window.onload = function() {
          agregarNuevasColumnas(10, 10);
      };