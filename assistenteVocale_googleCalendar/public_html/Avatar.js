function Avatar()
{
    this.svg= new SVG({"width":400, "height":400}, "white", "avatar");
    
    var corpo= this.svg.creaGruppo(
        "corpo",
        new Array(this.svg.poligono("collo", "170,280 230,280 240,335 160,335", "#ffcccd"),
                  this.svg.poligonoContorno("colletto", "160,335 240,335 235,310 200,325 165,310", "white", 1),
                  this.svg.poligono("busto", "120,335 280,335 290,400 110,400", "black"),
                  this.svg.poligono("cravattaAfarfalla", "180,320 180,340 200,330 220,320 220,340 200,330 180,320", "gray"),
                  this.svg.cerchioContorno("bottoneCravatta", 5, {x:200, y:330}, "white", 1, "gray"),
                  this.svg.cerchioContorno("bottoneCamicia1", 5, {x:200, y:350}, "gray", 1, "white"),
                  this.svg.cerchioContorno("bottoneCamicia2", 5, {x:200, y:375}, "gray", 1, "white"),
                  this.svg.cerchioContorno("bottoneCamicia3", 5, {x:200, y:400},  "gray", 1, "white")        
        )
    );
    
    var faccia= this.svg.cerchio("faccia", 100, {x:200, y:200}, "#ffcccc");
    faccia.setAttribute("stroke", "pink");
    faccia.setAttribute("stroke-widht", 2);
    
    this.svg.poligono("capelli", "140,120 150,130 160,120 170,130 180,120 190,130 200,120 210,130 220,120 230,130 240,120, 250,130 260,120 250,100 200,95 150,100", "black");
    
    var occhioSx= this.svg.creaGruppo(
        "occhioSx", 
        new Array(this.svg.cerchio("occhioSx", 20, {x:160, y:175}, "white"), 
                  this.svg.cerchio("occhioSxIride", 10, {x:160, y:175}, "#9fdf9f"),
                  this.svg.cerchio("occhioSxPupilla", 5, {x:160, y:175}, "black")
        )
    );
    
    var occhioDx= this.svg.creaGruppo(
        "occhioSx", 
        new Array(this.svg.cerchio("occhioDx", 20, {x:240, y:175}, "white"),
                  this.svg.cerchio("occhioDxIride", 10, {x:240, y:175}, "#9fdf9f"),
                  this.svg.cerchio("occhioDxPupilla", 5, {x:240, y:175}, "black")
        )
    );
    
    this.occhiAperti= this.svg.creaGruppo(
        "occhiAperti",
        new Array(occhioSx, occhioDx)
    );
    
    
    this.occhiChiusi= this.svg.creaGruppo(
            "occhiChiusi",
            new Array(
                this.svg.linea("occhioSxChiuso", {x:140, y:175}, {x:180, y:175}, "black", 2),
                this.svg.linea("occhioSxChiuso", {x:220, y:175}, {x:260, y:175}, "black", 2)
            )
    );
    this.occhiChiusi.setAttribute("display", "none");
    
    var occhiali= this.svg.creaGruppo(
        "occhiali",
        new Array(this.svg.cerchioContorno("lenteSx", 30, {x:160, y:175}, "black", 2),
                  this.svg.cerchioContorno("lenteDx", 30, {x:240, y:175}, "black", 2),
                  this.svg.linea("collegamentoLenti", {x:190, y:175}, {x:210, y:175},"black", 2),
                  this.svg.linea("stanghettaSx", {x:130, y:175}, {x:106, y:165},"black", 2),
                  this.svg.linea("stanghettaDx", {x:270, y:175}, {x:294, y:165},"black", 2)           
        )
    );
    
    var orecchie= this.svg.creaGruppo(
        "orecchie",
        new Array(this.svg.cerchio("orecchioSx", 10, {x:106, y:170}, "#ffcccc"),
                  this.svg.cerchio("orecchioSx", 10, {x:294, y:170}, "#ffcccc")  
        )
    );
    
    this.boccaChiusa= this.svg.creaGruppo(
            "boccaChiusa",
            new Array(
                this.svg.linea(undefined, {x:170, y:230}, {x:230, y:230}, "black", 4)  
            )
    );
    this.boccaChiusa.setAttribute("display", "block");
    
    var bocca= this.svg.poligono(undefined, "170,230 230,230 220,250 180,250 170,230", "red");
    bocca.setAttribute("stroke", "black");
    bocca.setAttribute("stroke-widht", "2");   
    
    this.boccaAperta= this.svg.creaGruppo(
            "bocca chiusa",
            new Array(
                bocca,
                this.svg.poligono(undefined, "171,231 229,231 226,235 173,235", "white")
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
        setTimeout(window.avatar.smettiDiParlare, (messaggio.length*100));
    }
};

Avatar.prototype.smettiDiParlare= function()
{   
    if(window.avatar.movimentoBocca!==undefined)
    {
        console.log("smetto di parlare");
        
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