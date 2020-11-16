(function(){ 

    let delButton = document.getElementById('deleteList');

    if (localStorage.length == 0) {
        delButton.style.display = "none";
        document.getElementsByTagName("table")[0].style.display="none";
        document.getElementById("sort").style.display = "none";
        document.getElementById("filter").style.display = "none";
        document.getElementsByTagName("p")[0].innerHTML = "Keine Einträge vorhanden";
    }

    delButton.addEventListener('click', () => {
        localStorage.clear(); 
        location.reload()
    });

    let anzahl = localStorage.getItem('anzahl');
    console.log(anzahl);
    let anfragen = []; //Anfrage Objekte 

    //Objektarray befüllen
    for (let i=1; i<=anzahl; i++) {
        let xmlString = localStorage.getItem('anfrage'+i);
        let p = new DOMParser();
        let xmlDoc = p.parseFromString(xmlString, "text/xml");

        //Pflichtfelder, kann nicht undefined
        let vname = xmlDoc.getElementsByTagName("vorname")[0].childNodes[0].nodeValue;
        let nname = xmlDoc.getElementsByTagName("nachname")[0].childNodes[0].nodeValue;
        let email = xmlDoc.getElementsByTagName("email")[0].childNodes[0].nodeValue;


        if (xmlDoc.getElementsByTagName("geschlecht")[0].getAttribute('value').value !== undefined) {
            let geschlecht = xmlDoc.getElementsByTagName("geschlecht")[0].getAttribute('value').value;
        } else {
            geschlecht = "undefined";
        }

        let tel =" ";
        if (xmlDoc.getElementsByTagName("telefon")[0].childNodes[0] !== undefined) {
            tel = xmlDoc.getElementsByTagName("telefon")[0].childNodes[0].nodeValue;
        } 

        let wunschtier = xmlDoc.getElementsByTagName("wunschtier")[0].childNodes[0].nodeValue;

        let c = xmlDoc.getElementsByTagName("comment")[0].childNodes[0];
        let comment = (c == undefined) ? " " : c.nodeValue;

        let anfrage = new Anfrage(vname, nname, tel, email, geschlecht, wunschtier, comment);

        anfragen.push(anfrage);
    }

    //Tabelle befüllen
    fillTable(anfragen);

    //sort
    let desc = document.getElementById("desc");
    let asc = document.getElementById("asc");
    let reihenfolge = true;

    asc.addEventListener("click", () => {
        asc.classList.add("rfActive");
        desc.classList.remove("rfActive");
        reihenfolge = true;
    });

    desc.addEventListener("click", () => {
        desc.classList.add("rfActive");
        asc.classList.remove("rfActive");
        reihenfolge = false;
    });

    document.getElementById("vnameSort").addEventListener('click', () =>{
        let sorted = sortAnfragen(anfragen, "vorname", reihenfolge);
        clearTable();
        fillTable(sorted);
    });

    document.getElementById("nnameSort").addEventListener('click', () =>{
        let sorted = sortAnfragen(anfragen, "nachname", reihenfolge);
        clearTable();
        fillTable(sorted);
    });

    document.getElementById("tierSort").addEventListener('click', () =>{
        let sorted = sortAnfragen(anfragen, "wunschtier", reihenfolge);
        clearTable();
        fillTable(sorted);
    });

    document.getElementById("gotTel").addEventListener('click', () =>{
        let filtered = filterAnfragen(anfragen, "tel", " ");
        clearTable();
        fillTable(filtered);
    });

    document.getElementById("filterHund").addEventListener('click', () =>{
        let filtered = filterAnfragen(anfragen, "tier", "Hund");
        clearTable();
        fillTable(filtered);
    });

    document.getElementById("filterKatze").addEventListener('click', () =>{
        let filtered = filterAnfragen(anfragen, "tier", "Katze");
        clearTable();
        fillTable(filtered);
    });

    document.getElementById("filterVogel").addEventListener('click', () =>{
        let filtered = filterAnfragen(anfragen, "tier", "Vogel");
        clearTable();
        fillTable(filtered);
    });


}());



function fillTable(array) {
    let tabelle = document.getElementById("anfragenTable");

    for (let i=0; i<array.length; i++) {

        let tr = document.createElement("tr");

        let name = document.createElement("td");
        let nameString = document.createTextNode(array[i]._vorname + " " + array[i]._nachname);
        name.appendChild(nameString);
        
        let mail = document.createElement("td");
        let mailString = document.createTextNode(array[i]._email);
        mail.appendChild(mailString);
        
        let wunschtier = document.createElement("td");
        let wunschtierString = document.createTextNode(array[i]._wunschtier);   
        wunschtier.appendChild(wunschtierString);

        let details = document.createElement("td");
        let inhalt = document.createElement("i");
        inhalt.classList.add("material-icons");
        let pfeil = document.createTextNode("arrow_right_alt");
        inhalt.appendChild(pfeil);
        details.appendChild(inhalt);


        tr.appendChild(name);
        tr.appendChild(mail);
        tr.appendChild(wunschtier);
        tr.appendChild(details);

        tabelle.appendChild(tr);

        
        
    }
}

function sortAnfragen(anfragenArray, param, asc) {

    let c = asc ? 1 : -1;

    if (typeof param === 'string' || param instanceof String) {
        switch (param) {
            case "vorname": anfragenArray.sort((a,b) => c * ((a.vorname < b.vorname) ? -1 : ((a.vorname > b.vorname) ? 1 : 0))); break;
            case "nachname": anfragenArray.sort((a,b) => c * ((a.nachname < b.nachname) ? -1 : ((a.nachname > b.nachname) ? 1 : 0))); break;
            case "wunschtier": anfragenArray.sort((a,b) => c * ((a.wunschtier < b.wunschtier) ? -1 : ((a.wunschtier > b.wunschtier) ? 1 : 0))); break;
            default: throw new Error ('Die Eingabe muss eine der folgenden Strings sein:\n\t"vorname"\n\t"nachname"\n\t"wunschtier"');
        }
    } else {
        throw new TypeError ("Der Parameter muss als Sting übergeben werden");
    }

    return anfragenArray;


}

function filterAnfragen (anfragenArray, param="", value) {
    let filtered = [];

    if (typeof param === 'string' || param instanceof String) {
        switch (param) {
            case "tel":
                filtered = anfragenArray.filter(function(item, index, array){
                    return item.tel != " ";
                });
                break;
            case "tier": 
                if (typeof value === 'string' || value instanceof String) {
                    switch (value) {
                        case "Hund": 
                            filtered = anfragenArray.filter(function(item,index,array) {
                                return item.wunschtier == "Thor"|| item.wunschtier == "Captain America" || item.wunschtier == "Black Widow" || item.wunschtier == "Captain Marvel" || item.wunschtier == "Doctor Strange" || item.wunschtier == "Spider-Man";
                            });
                            break;
                        case "Katze":
                            filtered = anfragenArray.filter(function(item,index,array) {
                                return item.wunschtier == "Goose" || item.wunschtier == "Ant-Man" || item.wunschtier == "Hawkeye" || item.wunschtier == "Black Panther" || item.wunschtier == "Winter Soldier" || item.wunschtier == "Loki";
                            });
                            break;
                        case "Vogel":
                            filtered = anfragenArray.filter(function(item,index,array) {
                                return item.wunschtier == "Quicksilver" || item.wunschtier == "Starlord" || item.wunschtier == "Falcon" || item.wunschtier == "Vision" || item.wunschtier == "Hulk" || item.wunschtier == "Nick Fury";
                            });
                            break;
                        default: throw new Error("Wir haben nur Hunde, Katzen und Vögel");
                    }
                } else {
                    throw new TypeError("Der Name für Tier muss als String übergeben werden");
                }
                break;

            default: throw new Error('Der Parameter muss eine der folgenden Strings sein:\n\t"tel"\n\t"tier"');
        }


    } else {
        throw new TypeError ("Der Parameter muss als String übergeben werden");
    }

    return filtered;
}

function clearTable(){
    let tabelle = document.getElementById("anfragenTable");    
    while(tabelle.firstChild) {
        tabelle.removeChild(tabelle.firstChild);
    }
}

