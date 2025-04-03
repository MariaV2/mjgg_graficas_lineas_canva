const canvas = document.getElementById("lineChart");
const ctx = canvas.getContext("2d");

const labels = ["Ene", "Feb", "Mar","Abr", "May", "Jun","Jul", "Ago", "Sep","Oct", "Nov", "Dic"];
const sanSalvador = [30, 32, 34, 35, 36, 37, 36, 35, 34, 32, 31, 30];
const santaTecla = [25, 26, 28, 29, 31, 32, 32, 31, 30, 28, 27, 26];

const marginLeft = 50;
const marginRight = 50;

//FUNCION PARA DIBUJAR LA LINEA CON ETIQUETAS
function drawLineWithLabels(data,color){
    ctx.beginPath(); //SE COLOCA EN EL PUNTERO EN EL LIENZO
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    for(let i = 0; i < data.length; i++){
        //INICIAR Y FINALIZAR EN LO BORDER ESTABLECIDOS DEL LIENZO (es decir, que no se salga de los bordes)
        const x = (i/(data.length-1)) * (canvas.width - marginLeft - marginRight) + marginLeft;
        const y = canvas.height - (data[i]-15) * 10; // ESCALADO VERTICAL
                                  //arreglo - 15 pixeles * 10 pixeles
        //DIBUJAR LA LINEA
        if (i=== 0){
            ctx.moveTo(x,y); //UBICAR POSICION DEL PUNTERO
        }
        else{
            ctx.lineTo(x,y); //TRAZAR LINEA A POSICION CALCULADA EN "X" e "Y"
        }    

        //ASIGNAR EL COLOR A LA LINEA
        ctx.fillStyle = color; //ASIGNAR EL COLOR A LA LINEA
        ctx.font = "12px Arial"; //ESTILO DE TEXTO (por etiquetas que se mostraran en la grafica)
        ctx.fillText(data[i]+"°C", x+5, y-5); //(VALOR A MOSTRAR EN ETIQUETA, POSICION EN EL EJE "X", POSICION EN EL EJE "Y")                        
    }
    ctx.stroke(); //DIBUJAR
}

function drawAxes(){
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;

    //EJE X
    ctx.moveTo(50,canvas.height-50);//UBICAR LA POSICION DEL PUNTERO EN EL EJE "X" e "Y"
    ctx.lineTo(canvas.width-50,canvas.height-50); // TRAZAR LA LINEA A POSICION ESPECIFICA (800 - 50), (400 - 50) DE ACUERDO CON EL HTML

    //EJE Y
    ctx.moveTo(50,canvas.height-50);
    ctx.lineTo(50,50);

    //DIBUJAR
    ctx.stroke();

    //ETIQUETAS EN EJE X
    for (let i=0; i < labels.length; i++){ //SE RECOGE EL ARREGLO DE ETIQUETAS
        const x = (i/(labels.length - 1)) * (canvas.width - 100) + 50; //LA ETIQUETA ESTAR EN LA MISMA POSICION EN EL PUNTO GRAFICADO
        ctx.fillText(labels[i],x,canvas.height - 30); //MOSTRAR EL TEXTO DEL ARREGLO "labels" EN LA POSICION CALCULADA EN X PERO 20px SUPERIOR
    }
    //0,0 EN CANVA ES LA PARTE SUPERIOR IZQUIERDA

    //ETIQUETAS EN EJE Y
    for(let i=20; i<=40; i += 5){ //EN EL EJE Y SE MOSTRARAN RANGOS DESDE LOS 20°C HASTA LOS 40° CON SALTOS DE 5° C
        const y = canvas.height - 50 - (i-20) * 10; //POSICION DE CADA GRADO CENTIGRADO IRA DECREMENTANDO
        ctx.fillText(i+"°C",20, y+5); //DIBUJAR
    }
}

drawAxes(); // DIBUJAR LOS EJES X e Y
drawLineWithLabels(sanSalvador, 'red'); // LINEA DE COLOR ROJO PARA LA GRAFICA DE SAN SALVADOR
drawLineWithLabels(santaTecla, 'blue'); //LINEA DE COLOR AZUL PARA LA GRAFICA DE SANTA TECLA

//LEYENDA DE LA GRAFICA
ctx.fillStyle = 'red';
ctx.fillRect(70,20,10,10); //DIBUJA UN RECTANGULO DE 70 PX DE ANCHO, 20PX DE ALTO, POSICION X=10, POSICION Y =10
ctx.fillStyle = 'black';
ctx.fillText("San Salvador", 85,30); //COLOCAR EL TEXTO: "SAN SALVADOR" EN LA POSICION EJE X = 85 EJE Y = 30

ctx.fillStyle = 'blue';
ctx.fillRect(170,20,10,10); //DIBUJA UN RECTANGULO DE 170 PX DE ANCHO, 20PX DE ALTO, POSICION X=10, POSICION Y =10
ctx.fillStyle = 'black';
ctx.fillText("Santa Tecla", 185,30); //COLOCAR EL TEXTO: "SANTA TECLA" EN LA POSICION EJE X = 185 EJE Y = 30

