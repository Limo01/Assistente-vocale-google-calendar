/*
 * classe utilizzata come libreria grafica per disegnare l'avatar
 */
function SVG(dimensioni, colore)
{
    this.svgNS = "http://www.w3.org/2000/svg";
    this.finestraSVG = document.getElementById("avatar");
    this.finestraSVG.setAttribute("width", dimensioni.width);
    this.finestraSVG.setAttribute("height", dimensioni.height);
    this.finestraSVG.style.background = colore;
}
;

SVG.prototype.creaShape = function (tipo, attributi)
{
    var elemento = document.createElementNS(this.svgNS, tipo);
    for (var att in attributi)
    {
        elemento.setAttribute(att, attributi[att]);
    }
    this.finestraSVG.appendChild(elemento);
    return elemento;
};

SVG.prototype.creaShapeSA = function (tipo, attributi)
{
    var elemento = document.createElementNS(this.svgNS, tipo);
    for (var att in attributi)
    {
        elemento.setAttribute(att, attributi[att]);
    }
    return elemento;
};

SVG.prototype.creaGruppo = function (id, elementi)
{
    var gruppo = document.createElementNS(this.svgNS, "g");
    gruppo.setAttribute("id", id);

    for (var i = 0; i < elementi.length; i++)
    {
        gruppo.appendChild(elementi[i]);
    }
    this.finestraSVG.appendChild(gruppo);
    return gruppo;
};

SVG.prototype.linea = function (id, pInizio, pFine, colore, larghezza)
{
    return this.creaShape("line", {"id": id, "x1": pInizio.x, "y1": pInizio.y, "x2": pFine.x, "y2": pFine.y, "stroke": colore, "stroke-width": larghezza});
};

SVG.prototype.lineaTratteggiata = function (id, pInizio, pFine, colore, larghezza, tratteggio)
{
    if (tratteggio === undefined)
        tratteggio = 5;
    return this.creaShape("line", {"id": id, "x1": pInizio.x, "y1": pInizio.y, "x2": pFine.x, "y2": pFine.y, "stroke": colore, "stroke-width": larghezza, "stroke-dasharray": tratteggio});

};

SVG.prototype.rettangolo = function (id, dimensioni, coordinate, colore)
{
    return this.creaShape("rect", {"id": id, "width": dimensioni.width, "height": dimensioni.height, "x": coordinate.x, "y": coordinate.y, "fill": colore});
};

SVG.prototype.cerchio = function (id, raggio, coordinate, colore)
{
    return this.creaShape("circle", {"id": id, "r": raggio, "cx": coordinate.x, "cy": coordinate.y, "fill": colore});
};

SVG.prototype.cerchioContorno = function (id, raggio, coordinate, colore, larghezzaBordo, coloreFill)
{
    return this.creaShape("circle", {"id": id, "r": raggio, "cx": coordinate.x, "cy": coordinate.y, "fill": coloreFill || "none", "stroke": colore, "stroke-width": larghezzaBordo});
};

SVG.prototype.addTitle = function (elemento, testo)
{
    this.rimuoviElemento(elemento);
    var title = this.creaShapeSA("title", {});
    title.innerHTML = testo;
    elemento.appendChild(title);
    this.finestraSVG.appendChild(elemento);
};

SVG.prototype.addTooltip = function (elemento, coordinate, testo)
{
    this.rimuoviElemento(elemento);
    var g = this.creaShapeSA("g", {"class": "component"});
    var gInterno = this.creaShapeSA("g", {"class": "tooltip", "transform": "transalte(" + coordinate.x + "," + coordinate.y + ")", "opacity": "0.9"});
    var rect = this.creaShapeSA("rect", {"x": coordinate.x, "y": coordinate.y, "rx": 5, "width": testo.length * 8, "height": 25});
    var text = this.creaShapeSA("text", {"x": coordinate.x + 7, "y": coordinate.y + 15});
    text.innerHTML = testo;

    gInterno.appendChild(rect);
    gInterno.appendChild(text);
    g.appendChild(elemento);
    g.appendChild(gInterno);
    this.finestraSVG.appendChild(g);
};

SVG.prototype.animazioneMovimento = function (cerchio, percorso, fine, durata, timeout)
{
    var animazione = this.creaShapeSA("animateMotion", {"path": percorso, "begin": timeout + "s", "dur": durata + "s", "fill": "freeze"});

    animazione.addEventListener("end", function () {
        cerchio.removeChild(animazione);
        cerchio.setAttribute("cx", fine.x);
        cerchio.setAttribute("cy", fine.y);
    });

    cerchio.appendChild(animazione);
    return {"animazione": animazione, "cerchio": cerchio};
};

SVG.prototype.rimuoviElemento = function (elemento)
{
    this.finestraSVG.removeChild(elemento);
};

SVG.prototype.testo = function (id, testo, coordinate, colore)
{
    var text = document.createElementNS(this.svgNS, "text");
    text.setAttribute("id", id);
    text.setAttribute("x", coordinate.x);
    text.setAttribute("y", coordinate.y);
    text.setAttribute("fill", colore);
    text.innerHTML = testo;
    this.finestraSVG.appendChild(text);
    return testo;
};

SVG.prototype.poligono = function (id, punti, colore)
{
    return this.creaShape("polygon", {"id": id, "points": punti, "fill": colore});
};

SVG.prototype.poligonoContorno = function (id, punti, colore, larghezzaBordo, coloreBordo)
{
    var poligono = this.poligono(id, punti, colore);
    if (coloreBordo === undefined) {
        poligono.setAttribute("stroke", "black");
    } else {
        poligono.setAttribute("stroke", coloreBordo);
    }
    poligono.setAttribute("stroke-width", larghezzaBordo);
    return poligono;
};

SVG.prototype.esempiUso = function ()
{
    this.linea("line1", {"x": 0, "y": 250}, {"x": 500, "y": 250}, "black", 2);
    this.lineaTratteggiata("line2", {"x": 120, "y": 120}, {"x": 290, "y": 50}, "gray", 1);
    this.rettangolo("rect1", {"width": 50, "height": 50}, {"x": 0, "y": 0}, "red");
    this.cerchio("circle1", 20, {"x": 480, "y": 480}, "blue");
    this.testo("text1", "prova", {"x": 300, "y": 300}, "black");
    this.poligono("polygon1", "300,480 250,490 250,470", "green");
};

//Animazione per muovere un cerchio da punto a punto
/*<circle id="TextElement" cx="0" cy="0" r="10px">
 <animateMotion path="M 0 0 L 100 100" dur="2s" fill="freeze" />
 </circle>*/