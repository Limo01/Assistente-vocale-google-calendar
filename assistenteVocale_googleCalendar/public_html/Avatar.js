function Avatar()
{
    this.svg= new SVG({"width":300, "height":400}, "white");
    
    var corpo= this.svg.creaGruppo(
        "corpo",
        new Array(this.svg.poligono("collo", "120,280 180,280 190,335 110,335", "#ffcccd"),
                  this.svg.poligonoContorno("colletto", "110,335 190,335 185,310 150,325 115,310", "white", 1),
                  this.svg.poligono("busto", "70,335 230,335 240,400 60,400", "black"),
                  this.svg.poligono("cravattaAfarfalla", "130,320 130,340 150,330 170,320 170,340 150,330 130,320", "gray"),
                  this.svg.cerchioContorno("bottoneCravatta", 5, {x:150, y:330}, "white", 1, "gray"),
                  this.svg.cerchioContorno("bottoneCamicia1", 5, {x:150, y:350}, "gray", 1, "white"),
                  this.svg.cerchioContorno("bottoneCamicia2", 5, {x:150, y:375}, "gray", 1, "white"),
                  this.svg.cerchioContorno("bottoneCamicia3", 5, {x:150, y:400},  "gray", 1, "white")        
        )
    );
    
    var faccia= this.svg.cerchio("faccia", 100, {x:150, y:200}, "#ffcccc");
    faccia.setAttribute("stroke", "pink");
    faccia.setAttribute("stroke-widht", 2);
    
    this.svg.poligono("capelli", "90,120 100,130 110,120 120,130 130,120 140,130 150,120 160,130 170,120 180,130 190,120, 200,130 210,120 200,100 150,95 100,100", "black");
    
    var occhioSx= this.svg.creaGruppo(
        "occhioSx", 
        new Array(this.svg.cerchio("occhioSx", 20, {x:110, y:175}, "white"), 
                  this.svg.cerchio("occhioSxIride", 10, {x:110, y:175}, "#9fdf9f"),
                  this.svg.cerchio("occhioSxPupilla", 5, {x:110, y:175}, "black")
        )
    );
    
    var occhioDx= this.svg.creaGruppo(
        "occhioSx", 
        new Array(this.svg.cerchio("occhioDx", 20, {x:190, y:175}, "white"),
                  this.svg.cerchio("occhioDxIride", 10, {x:190, y:175}, "#9fdf9f"),
                  this.svg.cerchio("occhioDxPupilla", 5, {x:190, y:175}, "black")
        )
    );
    
    this.occhiAperti= this.svg.creaGruppo(
        "occhiAperti",
        new Array(occhioSx, occhioDx)
    );
    
    
    this.occhiChiusi= this.svg.creaGruppo(
            "occhiChiusi",
            new Array(
                this.svg.linea("occhioSxChiuso", {x:90, y:175}, {x:130, y:175}, "black", 2),
                this.svg.linea("occhioSxChiuso", {x:170, y:175}, {x:210, y:175}, "black", 2)
            )
    );
    this.occhiChiusi.setAttribute("display", "none");
    
    var occhiali= this.svg.creaGruppo(
        "occhiali",
        new Array(this.svg.cerchioContorno("lenteSx", 30, {x:110, y:175}, "black", 2),
                  this.svg.cerchioContorno("lenteDx", 30, {x:190, y:175}, "black", 2),
                  this.svg.linea("collegamentoLenti", {x:140, y:175}, {x:160, y:175},"black", 2),
                  this.svg.linea("stanghettaSx", {x:80, y:175}, {x:56, y:165},"black", 2),
                  this.svg.linea("stanghettaDx", {x:220, y:175}, {x:244, y:165},"black", 2)           
        )
    );
    
    var orecchie= this.svg.creaGruppo(
        "orecchie",
        new Array(this.svg.cerchio("orecchioSx", 10, {x:56, y:170}, "#ffcccc"),
                  this.svg.cerchio("orecchioSx", 10, {x:244, y:170}, "#ffcccc")  
        )
    );
    
    this.boccaChiusa= this.svg.creaGruppo(
            "boccaChiusa",
            new Array(
                this.svg.linea(undefined, {x:120, y:230}, {x:180, y:230}, "black", 4)  
            )
    );
    this.boccaChiusa.setAttribute("display", "block");
    
    var bocca= this.svg.poligono(undefined, "120,230 180,230 170,250 130,250 120,230", "red");
    bocca.setAttribute("stroke", "black");
    bocca.setAttribute("stroke-widht", "2");   
    
    this.boccaAperta= this.svg.creaGruppo(
            "bocca chiusa",
            new Array(
                bocca,
                this.svg.poligono(undefined, "121,231 179,231 176,235 123,235", "white")
            )
    );
    this.boccaAperta.setAttribute("display", "none");
    
    this.movimentoBocca= undefined;
    
    setInterval(this.chiudiOcchi, 5000);   

    this.stoParlando= false;
    
    var divResponse= document.createElement("div");
    divResponse.setAttribute("id", "response");
    
    var responseButton= document.createElement("button");
    responseButton.innerHTML="Vai all'evento";
    responseButton.setAttribute("id", "responseButton");
    
    var responseSpan= document.createElement("span");
    responseSpan.innerHTML="";
    responseSpan.setAttribute("id", "responseSpan");
    
    divResponse.appendChild(responseButton);
    divResponse.appendChild(responseSpan);
    document.getElementById("pagina").appendChild(divResponse);
};

Avatar.prototype.muoviBocca= function()
{
    if(window.avatar.boccaAperta.attributes.display.nodeValue==="block")
    {
        window.avatar.boccaAperta.setAttribute("display", "none");
        window.avatar.boccaChiusa.setAttribute("display", "block");
    }
    else
    {
        window.avatar.boccaChiusa.setAttribute("display", "none");
        window.avatar.boccaAperta.setAttribute("display", "block");
    }
};

Avatar.prototype.say= function(messaggio)
{
    if(window.avatar.movimentoBocca===undefined && messaggio!=="")
    {
        window.avatar.movimentoBocca= setInterval(this.muoviBocca, 200);
        readOutLoud(messaggio);
        setTimeout(window.avatar.smettiDiParlare, (messaggio.length*80));
    }
};

Avatar.prototype.smettiDiParlare= function()
{   
    if(window.avatar.movimentoBocca!==undefined)
    {
        clearInterval(window.avatar.movimentoBocca);
        window.avatar.movimentoBocca= undefined;
        
        if(window.avatar.boccaAperta.attributes.display.nodeValue==="block")
        {
            window.avatar.boccaAperta.setAttribute("display", "none");
            window.avatar.boccaChiusa.setAttribute("display", "block");
        }
    }
};

Avatar.prototype.chiudiOcchi= function()
{
    window.avatar.occhiAperti.setAttribute("display", "none");
    window.avatar.occhiChiusi.setAttribute("display", "block");
    setTimeout(window.avatar.apriOcchi, 50);
    
};

Avatar.prototype.apriOcchi= function()
{
    window.avatar.occhiChiusi.setAttribute("display", "none");
    window.avatar.occhiAperti.setAttribute("display", "block");
};