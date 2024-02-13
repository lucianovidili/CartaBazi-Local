let btnCalcular = document.getElementById('btnCalcular');
btnCalcular.addEventListener('click', btnCalcularHandler);
let btnR = document.getElementById('btnR');
btnR.addEventListener('click', btnRHandler);
let imgFacebook = document.getElementById('imgFacebook');
imgFacebook.addEventListener('click', imgFacebookHandler);
let imgInstagram = document.getElementById('imgInstagram');
imgInstagram.addEventListener('click', imgInstagramHandler);
let imgBiodiseño = document.getElementById('imgBiodiseño');
imgBiodiseño.addEventListener('click', btnRHandler);

//Variables globales para guardar el estados de las listas desplegables (Celebridades, Pilares, Animales), desplegada o no.
let celebridadesDesplegada = false;
let pilaresDesplegada = false;
let animalesDesplegada = false;

document.querySelector('html').addEventListener('click', htmlClickHandler);
function htmlClickHandler(showMarkerPA) {
    //Ante cualquier click fuera de los pDesList (Celebridades, Animales o Pilares), hace visible nuevamente los navigation bar.
    document.getElementById('markerCelebridades').style.visibility = 'visible';
    if (showMarkerPA) {
        document.getElementById('markerPilaresAnimales').style.visibility = 'visible';
    }

    //Oculta la lista de Celebridades, Pilares y Animales.
    document.getElementById('dropCelebridades').style.visibility = 'hidden';
    document.getElementById('dropPilares').style.visibility = 'hidden';
    document.getElementById('dropAnimales').style.visibility = 'hidden';
    celebridadesDesplegada = false;
    pilaresDesplegada = false;
    animalesDesplegada = false;
}

const requestConstURL = 'http://localhost:8080/cartabazi/';
//const requestConstURL = 'https://adnenergetico.appspot.com/cartabazi/';

const imgPath = 'images/animales/';

let ihoraNac = document.getElementById('horaNac');
let iminutosNac = document.getElementById('minutosNac');
let fechaNac;
const exampleDate = 'dd/mm/aaaa';
const exampleDateColor = 'grey'
const inputColor = 'black';

let despListDia = document.getElementById('despDiaNac');
let despListMes = document.getElementById('despMesNac');
let despListAno = document.getElementById('despAnoNac');
let despListHour = document.getElementById('despHoraNac');
let despListMinutes = document.getElementById('despMinutosNac');

let dateCelebritiesArray = new Array();
let fullHourCelebritiesArray = new Array();

//Obtengo el día de hoy.
const today = new Date();
const actualYear = today.getFullYear();

//Seteo los clickHandlers a los links de los animales, que al clickearse, vayan al pagina "animals-explanation". Previo a guardar el ANIMAL CLICKEADO.
setAnimalesClickHandlers();

//Seteo los clickHandlers a los links de los pilares, que al clickearse, vayan al pagina "pilares-explanation". Previo a guardar el PILAR CLICKEADO.
setPilaresClickHandlers();

//Completo las Desplay Lists
populateDespLists();

//Setear los handlers para las listas de Celebridades, Pilares y Animales
setDespListHandlers();

//Crear los Arrays de Fecha y Hora de las Celebridades.
createCelebritiesArrays();

//Seteo a Celebridades, Pilares y Animales para que solo se muestren si se "hoverea" sobre dicha palabra y no el área de abajo.
setDespListNoDownHovering();

//Seteo de los Display Lists (dia, mes, año, hora, minutos) para que borren la celebridad al ocurrir un cambio en ellos.
setDespListDeleteCelebrity();

function setDespListDeleteCelebrity() {
    //Seteo de los Display Lists (dia, mes, año, hora, minutos) para que borren la celebridad al ocurrir un cambio en ellos.

    let pCelebridad = document.getElementById('pCelebridad');
    let despLists = document.querySelectorAll('.despList');
    for (let i = 0; i < despLists.length; i++) {
        despLists[i].addEventListener('change', function (){pCelebridad.style.visibility = 'hidden'});
    }
}

function setDespListNoDownHovering() {
    //Seteo a Celebridades, Pilares y Animales para que solo se muestren si se "hoverea" sobre dicha palabra y no el área de abajo.

    let celebridadesDespList = document.getElementById('celebridadesDespList');
    let dropDownListCelebridades = document.getElementById('dropCelebridades');
    celebridadesDespList.addEventListener('mouseover', function() {dropDownListCelebridades.style.visibility = 'visible';});
    celebridadesDespList.addEventListener('mouseleave', function() {dropDownListCelebridades.style.visibility = 'hidden'; document.getElementById('markerCelebridades').style.visibility = 'visible';});
    
    let pilaresDespList = document.getElementById('pilaresDespList');
    let dropDownListPilares = document.getElementById('dropPilares');
    pilaresDespList.addEventListener('mouseover', function() {dropDownListPilares.style.visibility = 'visible';});
    pilaresDespList.addEventListener('mouseleave', function() {dropDownListPilares.style.visibility = 'hidden'; document.getElementById('markerPilaresAnimales').style.visibility = 'visible';});

    let animalesDespList = document.getElementById('animalesDespList');
    let dropDownListAnimales = document.getElementById('dropAnimales');
    animalesDespList.addEventListener('mouseover', function() {dropDownListAnimales.style.visibility = 'visible';});
    animalesDespList.addEventListener('mouseleave', function() {dropDownListAnimales.style.visibility = 'hidden'; document.getElementById('markerPilaresAnimales').style.visibility = 'visible';});

    //Para CELULARES-TABLETS
    let markerCelebridades = document.getElementById('markerCelebridades');
    let markerPilaresAnimales = document.getElementById('markerPilaresAnimales');
    celebridadesDespList.addEventListener('click', celebridadesSmartphoneDespListHandler);
    pilaresDespList.addEventListener('click', pilaresSmartphoneDespListHandler);
    animalesDespList.addEventListener('click', animalesSmartphoneDespListHandler);

    function celebridadesSmartphoneDespListHandler(e) {
        if (!celebridadesDesplegada) {
            markerCelebridades.style.visibility = 'hidden'; 
            dropDownListCelebridades.style.visibility = 'visible';
            celebridadesDesplegada = true;
            e.stopPropagation();
        }
        pilaresDesplegada = false;
        animalesDesplegada = false;
    }

    function pilaresSmartphoneDespListHandler(e) {
        if (!pilaresDesplegada) {
            markerPilaresAnimales.style.visibility = 'hidden'; 
            dropDownListPilares.style.visibility = 'visible';
            pilaresDesplegada = true;
            e.stopPropagation();
        }
        celebridadesDesplegada = false;
        animalesDesplegada = false;
    }

    function animalesSmartphoneDespListHandler(e) {
        if (!animalesDesplegada) {
            markerPilaresAnimales.style.visibility = 'hidden'; 
            dropDownListAnimales.style.visibility = 'visible';
            animalesDesplegada = true;
            e.stopPropagation();
        } else {
            e.stopPropagation();
            htmlClickHandler(false);
        }
        pilaresDesplegada = false;
        celebridadesDesplegada = false;
    }
}

//Seteo el día de hoy en la fecha de nacimiento.
despListDia.value = today.getDate();
despListMes.value = convertMonth(today.getMonth()+1);       //January is 0!
if (actualYear > 2043) {
    despListAno.value = 2043;  
} else {
    despListAno.value = actualYear;
}

//Seteo el handler del link "Carta Bazi" del título para que borre lo que esté guardaro en "pilarPressed" en el SESSION STORAGE 
//(así no scrollea hasta ese pilar en "pilares-explanation").
document.getElementById('aTitle').addEventListener('click', aTitleClickHandler);
function aTitleClickHandler() {
    if (sessionStorage.getItem('pressedPilar')) {
        sessionStorage.removeItem('pressedPilar');
    }
}

//Manejo la imagen de fondo, en caso que sea muy chico el display (como un celular) se pone otra imagen de fondo.
handleBackgroundImage();

function handleBackgroundImage() {
    //Manejo la imagen de fondo, en caso que sea muy chico el display (como un celular) se pone otra imagen de fondo.

    let imgDeFondo = document.getElementById('imgDeFondo');
    const minWidth = 1300;        //El ancho del contenedor de todo.
    
    if (screen.width <= minWidth) {
        imgDeFondo.setAttribute('src', 'images/papel-tapiz/hojas-verdes-celulares.jpg');
    }
}

function imgFacebookHandler() {
    //Al clickear en la imagen de Facebook se redirecciona a la página de Facebook de mi Biodiseño.

    window.open("https://www.facebook.com/Biodise%C3%B1o-por-Susy-Vidili-2229887407244837",'_blank');
}

function imgInstagramHandler() {
    //Al clickear en la imagen de Instagram se redirecciona a la página de Instagram de mi Biodiseño.

    window.open("https://www.instagram.com/adn.energetico/",'_blank');
}

function setAnimalesClickHandlers() {
    //Seteo los clickHandlers a los links de los cuatro animales, que al clickearse, vayan al pagina "animals-explanation".}

    let pEnvoltura = document.getElementById('pEnvoltura');
    let pTronco = document.getElementById('pTronco');
    let pDefensa = document.getElementById('pDefensa');
    let pPoder = document.getElementById('pPoder');
    
    pEnvoltura.addEventListener('click', aAnimalsExplanationHandler);
    pTronco.addEventListener('click', aAnimalsExplanationHandler);
    pDefensa.addEventListener('click', aAnimalsExplanationHandler);
    pPoder.addEventListener('click', aAnimalsExplanationHandler);
}

function setPilaresClickHandlers() {
    //Seteo los clickHandlers a los links de los cuatro pilares, que al clickearse, vayan al pagina "pilares-explanation".

    let aEnvoltura = document.getElementById('aEnvoltura');
    let aTronco = document.getElementById('aTronco');
    let aDefensa = document.getElementById('aDefensa');
    let aPoder = document.getElementById('aPoder');
    
    aEnvoltura.addEventListener('click', aPilaresExplanationHandler);
    aTronco.addEventListener('click', aPilaresExplanationHandler);
    aDefensa.addEventListener('click', aPilaresExplanationHandler);
    aPoder.addEventListener('click', aPilaresExplanationHandler);
}

function aAnimalsExplanationHandler(e) {
    //Handler para los 4 links de los Animales (a ser clickeado uno de ellos), para que guarden cual se clikeo y vayan a la pag "animals-explanation"
    
    //Primero guardo la imagen clickeada para mostrar bien (scrollear en "animals-explanations").
    let pilarId = e.target.id                                   //pEnvoltura, pTronco, pDefensa, pPoder
    let para = removeDragonAccent(document.getElementById(pilarId).textContent);    //Rata o Perro o Gallo, etc.
    sessionStorage.setItem('pressedAnimal', para);

    //No hace falta cambiar de página porque se clickeo un link (a), por ende va ir al link descritpto en el HTML ("animals/explanation.html")
}

function aPilaresExplanationHandler(e) {
    //Handler para los 4 links de los Pilares (a ser clickeado uno de ellos: Envoltura, Tronco, Defensa, Poder), para que guarden cual se clikeo y vayan a la pag "pilares-explanation"
    
    //Primero guardo el pilar clickeado para mostrar bien (scrollear en "pilares-explanation").
    let pilarId = e.target.id                                   //aEnvoltura o aTronco o aDefensa o aPoder
    let para = document.getElementById(pilarId).textContent;    //Envoltura o Troco o Defensa o Poder.
    sessionStorage.setItem('pressedPilar', para);

    //No hace falta cambiar de página porque se clickeo un link (a), por ende va ir al link descritpto en el HTML ("pilares-explanation.html")
}

//Variable global booleana que se setea en true si el año ingresado está fuera del rango (1901 <= year <= 2043) 
//que maneja la API Rest hecha en Golang.
let yearOutGolangApi;

//Seteo los clickHandlers a la imagenes de los animales para, que al clickearse, vayan al pagina "animals-explanation".
setImgAnimalsClickHandlers();

function setImgAnimalsClickHandlers() {
    //Seteo los clickHandlers a la imagenes de los animales para, que al clickearse, vayan al pagina "animals-explanation".

    let imgEnvoltura = document.getElementById('imgEnvoltura');
    let imgTronco = document.getElementById('imgTronco');
    let imgDefensa = document.getElementById('imgDefensa');
    let imgPoder = document.getElementById('imgPoder');

    imgEnvoltura.addEventListener('click', imgAnimalClickHandler);
    imgTronco.addEventListener('click', imgAnimalClickHandler);
    imgDefensa.addEventListener('click', imgAnimalClickHandler);
    imgPoder.addEventListener('click', imgAnimalClickHandler);
}

function imgAnimalClickHandler(e) {
    //Handler al clickearse la imagen del animal, los dervia a la pagina de explicación de "animals-explanation"

    //Primero guardo la imagen clickeada para mostrar bien (scrollear en "animals-explanations").
    let imgId = e.target.id         //imgEnvoltura, imgTronco, imgDefensa, imgPoder
    pId = imgId.slice(3);           //Envolura, Tronco, Defensa, Poder
    pId = 'p' + pId                 //pEnvoltura, pTronco, pDefensa, pPoder
    let para = removeDragonAccent(document.getElementById(pId).textContent);
    sessionStorage.setItem('pressedAnimal', para);

    //Cambio de página a "animals-explanation"
    window.location = "links/animales/animales.html";
}

function setDespListHandlers() {
    //Setea los handlers para las listas de Celebridades, Pilares y Animales

    let celebridades = document.querySelectorAll('.cDespList');
    for (let i = 0; i < celebridades.length; i++) {
        celebridades[i].addEventListener('click', cDespListClickHandler);
    }

    let pilares = document.querySelectorAll('.pDespList');
    for (let i = 0; i < pilares.length; i++) {
        pilares[i].addEventListener('click', pDespListClickHandler);
    }

    let animales = document.querySelectorAll('.aDespList');
    for (let i = 0; i < animales.length; i++) {
        animales[i].addEventListener('click', aDespListClickHandler);
    }
}

function cDespListClickHandler(e) {
    //Handler del clickeo de la celebridad del menú desplegable.

    e.stopPropagation();
    document.getElementById('dropCelebridades').style.visibility = 'hidden';
    document.getElementById('markerCelebridades').style.visibility = 'visible';
    document.querySelector('html').click();
    
    let pilarId = e.target.id;                                       //dlMessi o dlMaradona o dlCristina o dlMacri
    let celebrity = document.getElementById(pilarId).textContent;    //Lionel Messi o Diego Maradona o Cristina Kirchner o Mauricio Macri.
    let pCelebridad = document.getElementById('pCelebridad');
    pCelebridad.textContent = celebrity;
    pCelebridad.style.visibility = 'visible';
    
    //***************MODIFICAR (guardar los animales también de las celebridades) PARA QUE NO LO TENGA QUE CALCULAR***************//
    let date = dateCelebritiesArray[celebrity];             //19081980
    let fullHour = fullHourCelebritiesArray[celebrity];     //1500

    despListDia.value = parseInt(date.slice(0,2),10);
    despListMes.value = convertMonth(parseInt(date.slice(2,4),10));
    despListAno.value = parseInt(date.slice(4),10);
    despListHour.value = parseInt(fullHour.slice(0,2),10);
    despListMinutes.value = parseInt(fullHour.slice(2),10);

    btnCalcular.click();
}

function pDespListClickHandler(e) {
    //Handler del clickeo del pilar del menú desplegable.

    let pilarId = e.target.id;                                  //dlEnvoltura o dlTronco o dlDefensa o dlPoder
    let para = document.getElementById(pilarId).textContent;    //Envoltura o Troco o Defensa o Poder.
    sessionStorage.setItem('pressedPilar', para);
    
    //Cambio de página a "animals-explanation"
    window.location = "links/pilares/pilares.html";
}

function aDespListClickHandler(e) {
    //Handler del clickeo del animal del menú desplegable.

    let animalId = e.target.id;                                  //dlEnvoltura o dlTronco o dlDefensa o dlPoder
    let para = removeDragonAccent(document.getElementById(animalId).textContent);    //Envoltura o Troco o Defensa o Poder.
    sessionStorage.setItem('pressedAnimal', para);
    
    //Cambio de página a "animals-explanation"
    window.location = "links/animales/animales.html";
}

function createCelebritiesArrays() {
    //Crea los Arrays de Fecha y Hora de las Celebridades.

    dateCelebritiesArray["Lionel Messi"] = '24061987';
    dateCelebritiesArray["Diego Maradona"] = '30101960';
    dateCelebritiesArray["Zlatan Ibrahimovic"] = '03101981';
    dateCelebritiesArray["Emanuel Ginóbili"] = '28071977';
    dateCelebritiesArray["Cristina Kirchner"] = '19021953';
    dateCelebritiesArray["Mauricio Macri"] = '08021959';
    dateCelebritiesArray["El Papa Francisco"] = '17121936';
    dateCelebritiesArray["Barack Obama"] = '04081961';
    dateCelebritiesArray["Donald Trump"] = '14061946';
    dateCelebritiesArray["Martin Luther King"] = '15011929';
    dateCelebritiesArray["Nelson Mandela"] = '18071918';
    dateCelebritiesArray["Malala"] = '12071997';
    dateCelebritiesArray["René Favaloro"] = '12071923';
    dateCelebritiesArray["Frida Kahlo"] = '06071907';
    dateCelebritiesArray["John Lennon"] = '09101940';
    dateCelebritiesArray["Freddie Mercury"] = '05091946';
    dateCelebritiesArray["Juan Pablo Segundo"] = '18051920';
    dateCelebritiesArray["La Madre Teresa"] = '26081910';
    dateCelebritiesArray["Jorge Kurteff"] = '01061916';
    dateCelebritiesArray["Meryl Streep"] = '22061949';
    dateCelebritiesArray["Brad Pitt"] = '18121963';
    dateCelebritiesArray["Will Smith"] = '25091968';
    dateCelebritiesArray["Emma Watson"] = '15041990';
    dateCelebritiesArray["Gustavo Cerati"] = '11081959';
    dateCelebritiesArray["Luis Alberto Spinetta"] = '23011950';
            
    fullHourCelebritiesArray["Lionel Messi"] = '0600';
    fullHourCelebritiesArray["Diego Maradona"] = '0705';
    fullHourCelebritiesArray["Zlatan Ibrahimovic"] = '2030';
    fullHourCelebritiesArray["Emanuel Ginóbili"] = '0700';
    fullHourCelebritiesArray["Cristina Kirchner"] = '1215';
    fullHourCelebritiesArray["Mauricio Macri"] = '1108';
    fullHourCelebritiesArray["El Papa Francisco"] = '2100';
    fullHourCelebritiesArray["Barack Obama"] = '1924';
    fullHourCelebritiesArray["Donald Trump"] = '1054';
    fullHourCelebritiesArray["Martin Luther King"] = '1200';
    fullHourCelebritiesArray["Nelson Mandela"] = '1454';
    fullHourCelebritiesArray["Malala"] = '0500';
    fullHourCelebritiesArray["René Favaloro"] = '0330';
    fullHourCelebritiesArray["Frida Kahlo"] = '0830';
    fullHourCelebritiesArray["John Lennon"] = '1824';
    fullHourCelebritiesArray["Freddie Mercury"] = '0630';
    fullHourCelebritiesArray["Juan Pablo Segundo"] = '1730';
    fullHourCelebritiesArray["La Madre Teresa"] = '1425';
    fullHourCelebritiesArray["Jorge Kurteff"] = '0730';
    fullHourCelebritiesArray["Meryl Streep"] = '0805';
    fullHourCelebritiesArray["Brad Pitt"] = '0631';
    fullHourCelebritiesArray["Will Smith"] = '0146';
    fullHourCelebritiesArray["Emma Watson"] = '1600';
    fullHourCelebritiesArray["Gustavo Cerati"] = '0630';
    fullHourCelebritiesArray["Luis Alberto Spinetta"] = '1635';
}

function populateAll(animales, alsoFullDate) {
    //Se muestra todo por pantalla (al recibir la respuesta del servidor o un roll-back a la pagina actual)
    //Si el parametro recibido alsoFullDate está en True, también muestro la fecha y hora ingresada, además de todo lo demás.
    //En caso contrario (alsoFullDate = False), solo muestro los títulos de los pilares, las fotos de los animales y el nombre de cada animal.
    //Esto se da cuando se presiona el Botón Calcular. Mientras que el primer caso se da cuando se hace un Load State de toda la página.

    if (alsoFullDate) {
        //Roll-back de otra página a la principal.
        populateFullDate(animales);
        populatePCelebridad();
    }

    setVisiblePilaresTitles();
    populateImgs(animales);
    populateParas(animales);
    
    //Guardo el estado de lo que se trajo del servidor.
    saveState();

    function populateFullDate(animales) {
        //Completo el input con la fecha, el display list con la hora y el display list con los minutos.

        despListDia.value = animales["diaNac"];
        despListMes.value = animales["mesNac"];
        despListAno.value = animales["anoNac"];
        despListHour.value = animales["horaNac"];
        despListMinutes.value = animales["minutosNac"];
    }

    function populatePCelebridad() {
        //Muestro la celebridad que se eligió previamente, si es que fue el caso, si no, no muestro nada.

        let pCelebridad = document.getElementById('pCelebridad');
        
        if ((sessionStorage.getItem('celebridad')) && (sessionStorage.getItem('celebridadEstado'))) {
            pCelebridad.textContent = sessionStorage.getItem('celebridad');
            pCelebridad.style.visibility = sessionStorage.getItem('celebridadEstado');       
            //pCelebridad.style.visibility = 'visible';       
        } 
    }

    function setVisiblePilaresTitles() {
        //Hago visible los textos con los pilares (Envoltura, Tronco, Defensa, Poder)

        let aPilares = document.querySelectorAll('.aPilares');
        for (let i = 0; i < aPilares.length; i++) {
            aPilares[i].style.visibility = 'visible';
        }
    }

    function populateImgs(animales) {
        //Cargo las imagenes con los animales y las hago visibles.

        let imgEnvoltura = document.getElementById('imgEnvoltura');
        let imgTronco = document.getElementById('imgTronco');
        let imgDefensa = document.getElementById('imgDefensa');
        let imgPoder = document.getElementById('imgPoder');
        imgEnvoltura.setAttribute ('src', imgPath + animales["envoltura"] + ".jpg");
        imgTronco.setAttribute ('src', imgPath + animales["tronco"] + ".jpg");
        imgDefensa.setAttribute ('src', imgPath + animales["defensa"] + ".jpg");
        imgPoder.setAttribute ('src', imgPath + animales["poder"] + ".jpg");
        imgEnvoltura.style.visibility = 'visible';
        imgTronco.style.visibility = 'visible';
        imgDefensa.style.visibility = 'visible';
        imgPoder.style.visibility = 'visible';
    }

    function populateParas(animales) {
        //Completo los nombres de los animales debajo.

        let pEnvoltura = document.getElementById('pEnvoltura');
        let pTronco = document.getElementById('pTronco');
        let pDefensa = document.getElementById('pDefensa');
        let pPoder = document.getElementById('pPoder');
        pEnvoltura.textContent = setDragonAccent(animales["envoltura"]);
        pTronco.textContent = setDragonAccent(animales["tronco"]);
        pDefensa.textContent = setDragonAccent(animales["defensa"]);
        pPoder.textContent = setDragonAccent(animales["poder"]);
    }
}

function setDragonAccent(animalStr) {
    //Devuelve el string recibido (animalStr) CON el tilde en la ó en el caso que animalStr sea Dragon. Si no, devuelve el string animalStr.

    if (animalStr === 'Dragon') {
        return 'Dragón';
    } else {
        return animalStr;
    }
}

function removeDragonAccent(animalStr) {
    //Devuelve el string recibido (animalStr) SIN el tilde en la ó en el caso que animalStr sea Dragón. Si no, devuelve el string animalStr.

    if (animalStr === 'Dragón') {
        return 'Dragon';
    } else {
        return animalStr;
    }
}

function saveState() {
    //Guarda el estado de la pantalla.

    sessionStorage.setItem('diaNac', despListDia.value);
    sessionStorage.setItem('mesNac', despListMes.value);
    sessionStorage.setItem('anoNac', despListAno.value);
    sessionStorage.setItem('horaNac', despListHour.value);
    sessionStorage.setItem('minutosNac', despListMinutes.value);
    
    let pEnvoltura = document.getElementById('pEnvoltura');
    let pTronco = document.getElementById('pTronco');
    let pDefensa = document.getElementById('pDefensa');
    let pPoder = document.getElementById('pPoder');
    sessionStorage.setItem('envoltura', removeDragonAccent(pEnvoltura.textContent));
    sessionStorage.setItem('tronco', removeDragonAccent(pTronco.textContent));
    sessionStorage.setItem('defensa', removeDragonAccent(pDefensa.textContent));
    sessionStorage.setItem('poder', removeDragonAccent(pPoder.textContent));

    let pCelebridad = document.getElementById('pCelebridad');
    sessionStorage.setItem('celebridad', pCelebridad.textContent);
    sessionStorage.setItem('celebridadEstado', pCelebridad.style.visibility);
}

function loadState() {
    //Carga el estado de la pantalla.
    
    //Inicializo clickTheButton en true, para "clickearlo" en caso que todas los valores fueron recuperados de sessionStorage.
    //(es decir para "populate" todo).
    let clickTheButton = true;
    let animales = new Array(7);
    
    if (sessionStorage.getItem('diaNac')) {
        animales["diaNac"] = sessionStorage.getItem('diaNac');

    } else {
        clickTheButton = false;
    }

    if (sessionStorage.getItem('mesNac')) {
        animales["mesNac"] = sessionStorage.getItem('mesNac');

    } else {
        clickTheButton = false;
    }

    if (sessionStorage.getItem('anoNac')) {
        animales["anoNac"] = sessionStorage.getItem('anoNac');

    } else {
        clickTheButton = false;
    }

    if (sessionStorage.getItem('horaNac')) {
        animales["horaNac"] = sessionStorage.getItem('horaNac');

    } else {
        clickTheButton = false;
    }
    
    if (sessionStorage.getItem('minutosNac')) {
        animales["minutosNac"] = sessionStorage.getItem('minutosNac');

    } else {
        clickTheButton = false;
    }

    if (sessionStorage.getItem('envoltura')) {
        animales["envoltura"] = sessionStorage.getItem('envoltura')
    } else {
        clickTheButton = false;
    }

    if (sessionStorage.getItem('tronco')) {
        animales["tronco"] = sessionStorage.getItem('tronco')
    } else {
        clickTheButton = false;
    }

    if (sessionStorage.getItem('defensa')) {
        animales["defensa"] = sessionStorage.getItem('defensa')
    } else {
        clickTheButton = false;
    }

    if (sessionStorage.getItem('poder')) {
        animales["poder"] = sessionStorage.getItem('poder')
    } else {
        clickTheButton = false;
    }
    
    if (clickTheButton) {
        //Muestro por pantalla el titulo de los cuatro pilares, las cuatro imagenes de los animales y sus respectivos nombres.
        populateAll(animales, true);
    }

}

//Cargo el estado de toda la pantalla.
loadState();


function populateDespLists() {
    //Completa las 31, 12, 1901-2043, 24 y las 60 opciones de las listas desplegables del DIA, MES, AÑO, HORA y MINUTOS respectivamente.

    //Populating Dias (DesplayList)
    for (let i = 1; i <= 31; i++) {
        let newItem = document.createElement('option');
        newItem.textContent = i.toString();
        despListDia.appendChild(newItem);
    }

    //Populating Meses (DesplayList)
    for (let i = 1; i <= 12; i++) {
        let newItem = document.createElement('option');
        newItem.textContent = convertMonth(i);
        despListMes.appendChild(newItem);
    }

    //Populating Años (DesplayList)
    let maxYear;
    if (actualYear > 2043) {
        maxYear = 2043;
    } else {
        maxYear = actualYear;
    }
    for (let i = 1901; i <= maxYear; i++) {
        let newItem = document.createElement('option');
        newItem.textContent = i.toString();
        despListAno.appendChild(newItem);
    }

    //Populating Horas (DesplayList)
    for (let i = 0; i < 24; i++) {
        let newItem = document.createElement('option');
        newItem.textContent = i.toString();
        despListHour.appendChild(newItem);
    }

    //Populating Minutos (DesplayList)
    for (let i = 0; i < 60; i++) {
        let newItem = document.createElement('option');
        newItem.textContent = i.toString();
        despListMinutes.appendChild(newItem);
    }
}

function convertMonth(month) {
    //Convierte un entero, que es el mes, a un string correspondiente a ese MES.
    
    let salida;
    switch (month) {
        case 1: salida = 'Enero'; break;
        case 2: salida = 'Febrero'; break;
        case 3: salida = 'Marzo'; break;
        case 4: salida = 'Abril'; break;
        case 5: salida = 'Mayo'; break;
        case 6: salida = 'Junio'; break;
        case 7: salida = 'Julio'; break;
        case 8: salida = 'Agosto'; break;
        case 9: salida = 'Septiembre'; break;
        case 10: salida = 'Octubre'; break;
        case 11: salida = 'Noviembre'; break;
        case 12: salida = 'Diciembre'; break;
        default: salida = 'Enero'; break;
    }
    return salida;
}

function btnCalcularHandler() {
    //Handler que maneja el click en el botón "Calcular".

    let pDateInvalid = document.getElementById('pDateInvalid');
    let validFullData = true;
    let validHour = true;
    let validMinutes = true;
    pDateInvalid.style.visibility = 'hidden';
        
    yearOutGolangApi = false;
    if (!isValidDate(despListDia.value, convertStrMonthToInt(String(despListMes.value)), despListAno.value)) {
        validFullData = false;
        if (yearOutGolangApi) {
            pDateInvalid.textContent = 'El año debe estar dentro del rango: 1901 - 2043.'
        } else {
            pDateInvalid.textContent = 'La fecha ingresada no es válida.';
        }

        //Hace visible el paragraph con date invalid.
        pDateInvalid.style.visibility = 'visible';
    }

    if (!isValidHour(String(despListHour.value))) {
        validFullData = false;
        validHour = false;
    }

    if (!isValidMinutes(String(despListMinutes.value))) {
        validFullData = false;
        validMinutes = false;
    }

    if (validFullData) {
        //Aquí  son válidos todos los datos ingresados. Se procede a hacer el pedido.

        //Creo el pedido que le haré al servidor.
        let requestURL = requestConstURL + getFullDate();
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';

        //Cambio el cursor al "wait", que está esperando la respuesta del servidor.
        btnCalcular.style.cursor = 'wait';
        document.body.style.cursor = 'wait';

        //Envio el pedido al servidor.
        request.send();
        
        //Seteo el handler para cuando reciba respuesta del servidor.
        request.onload = function() {
            
            //RECIBI RESPUESTA DEL SERVIDOR

            //Vuelvo a poner el cursor al "poninter" (manito) al botón y "default" al resto dado que ya recibí la respuesta del servidor.
            btnCalcular.style.cursor = 'pointer';
            document.body.style.cursor = 'default';

            //"Muestro" todos los elementos hasta el momento ocultos:
            //los 4 titulos de los pilares, las cuatro imágenes de los animales y los cuatro nombres de los animales.
            populateAll(request.response, false);

            //Pongo de color verde "original" al botón "Calcular" (necesario cuando se usa en celulares/tablets dado que no se ve el cursor de "wait")
            const maxWidthTablet = 1099;
            if (screen.width <= maxWidthTablet) {
                btnCalcular.style.background = '#93c01f';
            }
        }
    }
    
    function convertStrMonthToInt(strMonth) {
        //Convierte un mes recibido como string, a un número entero, que representa el mes.

        let salida;

        switch (strMonth) {
            case 'Enero': salida = 1; break;
            case 'Febrero': salida = 2; break;
            case 'Marzo': salida = 3; break;
            case 'Abril': salida = 4; break;
            case 'Mayo': salida = 5; break;
            case 'Junio': salida = 6; break;
            case 'Julio': salida = 7; break;
            case 'Agosto': salida = 8; break;
            case 'Septiembre': salida = 9; break;
            case 'Octubre': salida = 10; break;
            case 'Noviembre': salida = 11; break;
            case 'Diciembre': salida = 12; break;
            default: salida = 1; break;
        }
        return salida;
    }

    function isValidDate(day, month, year) {
        //Recibe tres enteros (day, month, year). Retorna si se trata de una fecha válida.

        yearOutGolangApi = false;
        
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return false;
        }
        
        if (day < 1 || year < 1) {
            return false;
        }
            
        if (month > 12 || month < 1) {
            return false;
        }
                
        if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) {
            return false;
        }
            
        if ((month == 4 || month == 6 || month == 9 || month == 11 ) && day > 30) {
            return false;
        }

        if (month == 2) {
            if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
                if (day > 29)
                    return false;
            } else {
                if (day > 28)
                    return false;
            }      
        }
                
        //RESTRICCION POR LA API de GOLANG que usa una tabla en estos rangos de año.
        if (year < 1901 || year > 2043) {
            yearOutGolangApi = true;
            return false;
        }
        
        //Si superó todas las condiciones anteriores --> ES UN FECHA VALIDA!!.
        return true;
    }

    function isValidHour(hour) {
        //Retorna si el string recibido (hour) representa a una hora valida (0 .. 23)

        let salida = false;
        if (hour.length <= 2) {
           if (isNaturalNumber(hour)) {
                let hourInt = parseInt(hour, 10);
                salida = ((hourInt >= 0) && (hourInt <= 23));
            }
        }
        
        return salida;
    }

    function isValidMinutes(minutes) {
        //Retorna si el string recibido (minutes) representa a un valor de minutos válidos (0 .. 59)

        let salida = false;
        if (minutes.length <= 2) {
            if (isNaturalNumber(minutes)) {
                let minutesInt = parseInt(minutes, 10);
                salida = ((minutesInt >= 0) && (minutesInt <= 59));
            }
        }
        
        return salida;
    }

    function isDigit(c) {
        //Retorna si el string recibido (c) representa un dígito válido (0 .. 9).

        let salida;
        switch (c) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                salida = true;
                break;
            default:
                salida = false;
                break;
        }
        return salida;
    }

    function isNaturalNumber(s) {
        //Retorna si el string recibido (s) representa un número natural válido.

        let ok = true;
        let i = 0;
        while (ok && (i < s.length)) {
            ok = isDigit(s[i]);
            i++;
        }
        return ok;
    }

    function getFullDate() {
        //Es llamada cuando ya está verificado que todo lo ingresado es valido.
        //Devuelve una fecha completa válida para utilizarla en el llamado al server. (xEj: 28-09-1981 08:15).

        strDay = despListDia.value.toString();
        strMonth = String(despListMes.value);
        strYear = despListAno.value.toString();
        
        if (despListDia.value <= 9) {
            strDay = '0' + strDay;
        }

        intMonth = convertStrMonthToInt(strMonth);
        strMonth = intMonth.toString();
        if (intMonth <= 9) {
            strMonth = '0' + strMonth;
        }

        fechaNac = strDay + '-' + strMonth + '-' + strYear;

        let hourInt = parseInt(String(despListHour.value), 10);
        let minutesInt = parseInt(String(despListMinutes.value), 10);
        let horaNac;
        let minutosNac;

        //Se pone un cero adelante ('0x') para la hora y minutos, en caso que haya ingresdo un solo dígito (x).
        if (hourInt <= 9) {
            horaNac = '0' + hourInt.toString();
        } else {
            horaNac = despListHour.value;
        }
        if (minutesInt <= 9) {
            minutosNac = '0' + minutesInt.toString();
        } else {
            minutosNac = despListMinutes.value;
        }

        //Se devuelve, xej: 28-09-1981 08:15
        return(fechaNac + ' ' + horaNac + ':' + minutosNac);
    }
}

function btnRHandler() {
    //Handler cuando se aprieta el boton R para "resetear/reiniciar" todo (Es como si hubieran ingresado a la pagina por primera vez).

    sessionStorage.clear();
    location.reload();
}