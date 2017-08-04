var generar    = document.getElementById('ejecutar');
var tablero    = document.getElementById('tablero');
var solucion   = document.getElementById("solucion");
var siguiente  = document.getElementById("siguiente");
var tablaFinal = [];
var contMove = 1;

function printMatrix(M) {
    console.log("___________________");
    for (var i = 0; i < M.length; i++)
        console.log(M[i]);
    console.log("___________________");

}

function check(i, j, n) {
    if (i >= 0 && j >= 0 && i < n && j < n)
        return true;
    return false;
}

function randInt(n) {
    return Math.floor(Math.random() * n);
}

function gen_heuristic(n) {
    var M = initMatrix(n);
    var p = 1;
    while (p <= n / 2 + 1) {
        for (var i = p - 1; i <= n - p; i++) {
            M[p - 1][i] = p;
            M[i][p - 1] = p;
            M[i][n - p] = p;
            M[n - p][i] = p;
        }
        p++;
    }
    M[0][0] = 0;
    M[0][n - 1] = 0;
    M[n - 1][0] = 0;
    M[n - 1][n - 1] = 0;
    return M;
}

function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d
};

function use_helper(soluciones, helper) {
    var pos = -1;
    var min = 10000;
    soluciones = shuffleArray(soluciones);
    for (var i = 0; i < soluciones.length; i++) {
        var x = soluciones[i].x;
        var y = soluciones[i].y;
        if (helper[x][y] < min) {
            min = helper[x][y];
            pos = i;
        }
    }
    return pos;
}

function gen_solution(M, helper, n) {
    var mov_x = [-2, -1, +1, +2, +2, +1, -1, -2];
    var mov_y = [-1, -2, -2, -1, +1, +2, +2, +1];
    var step = 1;
    var x = 0;
    var y = 0;

    M[x][y] = step;
    while (true) {
        if (step == n * n) {
            //console.log('Eureka!!!');
            return true;
        }
        var soluciones = [];
        for (var index = 0; index < mov_x.length; index++) {
            var i = x + mov_x[index];
            var j = y + mov_y[index];
            if (check(i, j, n) && M[i][j] == 0) {
                soluciones.push({
                    x: i,
                    y: j
                });
            }
        }
        if (soluciones.length == 0) {
            //console.log("fail!!");
            break;
        }
        var idx = use_helper(soluciones, helper);
        x = soluciones[idx].x;
        y = soluciones[idx].y;
        step++;
        M[x][y] = step;
        tablaFinal
    .push(M[x][y] = step);
        //console.log("step: " + step);
    }
    return false;
}

function initMatrix(n) {
    var matrix = [];
    for (var i = 0; i < n; i++) {
        var fila = [];
        for (var j = 0; j < n; j++) {
            fila[j] = 0;
        }
        matrix[i] = fila;
    }
    return matrix;
}

function generarTabla() {
    tablero.innerHTML = '';
    var n = parseInt(document.getElementById('lados').value);

    for (var i = 0; i < 1000; i++) {
        var M = initMatrix(n);
        var helper = gen_heuristic(n);
        if (gen_solution(M, helper, n)) {
            printMatrix(M);
            tablaFinal = M;
            break;
        }
    }

    var tabla = document.createElement('table');
    for (var i = 0; i < n; i++) {
        var fila = document.createElement('tr');
        for (var j = 0; j < n; j++) {
            var celda = document.createElement('td');
            if (i % 2 == 0 && j % 2 != 0 || i % 2 != 0 && j % 2 == 0) {
                celda.setAttribute('class', 'negro');
            }
            celda.setAttribute('id', M[i][j]);
            var p = document.createElement('p');
            p.setAttribute("class", "num");
            p.innerHTML = M[i][j];
            celda.appendChild(p);

            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    tablero.appendChild(tabla);
}

generar.onclick = function () {
    generarTabla();
    var n = document.getElementsByClassName("num");
    for (var i = 0; i < n.length; i++) {
        n[i].innerText = "";
    }
}

solucion.onclick = function () {
    generarTabla();
}


siguiente.onclick = function () {
    var cont= document.createTextNode(contMove);
    var celdas = document.getElementsByTagName("td");
    var image= document.createElement("img");
    //
    image.setAttribute('src','http://www.tuditees.com/camisetas/ajedrez-caballo.png')
    var n = parseInt(document.getElementById('lados').value);
    for (var j = 0; j < celdas.length; j++) {
        if (celdas[j].id == contMove) {
           // celdas[j].appendChild(cont);
            celdas[j].appendChild(image);

        }
    }
    if (contMove > (n * n)) {
        generarTabla();
        var num = document.getElementsByClassName("num");
        for (var i = 0; i < num.length; i++) {
            num[i].innerText = "";
        }
        contMove = 0;
    }
    contMove++;
}