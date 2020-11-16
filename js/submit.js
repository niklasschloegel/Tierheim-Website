(function () {

    var failedOnce = false;
    //Kommentar von meiner Katze: püßed

    //Save Form as XML
    let formSubmitButton = document.getElementById('formSubmit');
    formSubmitButton.addEventListener('click', (e) => {
        e.preventDefault();

        let error = false;
        let vName = document.getElementById('vname');
        let zName = document.getElementById('zname');
        let nummer = document.getElementById('nummer');
        let email = document.getElementById('email');
        let genders = document.getElementsByName('geschlecht');
        let gender = (genders[0].checked) ? "männlich" : ((genders[1].checked) ? "weiblich" : undefined);
        let alter = document.getElementById('alter');
        let tiere = document.getElementById('wtier');
        let tier = tiere.options[tiere.selectedIndex].value;
        let comment = document.getElementById('comment');

        //Validation
        if (!(/[A-Za-z]/.test(vName.value))) {
            error = true;
            vName.classList.add('error');
            console.log("Vorname fehlerhaft");

            vName.addEventListener('blur', () => {
                if ((/[A-Za-z]/.test(vName.value))) {
                    vName.classList.remove('error');
                    vName.classList.add('ok');
                }
            });
        }

        if (!(/[A-Za-z]/.test(zName.value))) {
            error = true;
            zName.classList.add('error');
            console.log("Nachname fehlerhaft");

            zName.addEventListener('blur', () => {
                if ((/[A-Za-z]/.test(zName.value))) {
                    zName.classList.remove('error');
                    zName.classList.add('ok');
                }
            });
        }

        if (nummer.value == "" || nummer.value == " ") {
            //alles gut
        } else if (!(/^[0-9]{9,15}$/.test(nummer.value))) {
            error = true;
            nummer.classList.add('error');

            nummer.addEventListener('blur', () => {
                if ((/^[0-9]{9,15}$/.test(nummer.value))) {
                    nummer.classList.remove('error');
                    nummer.classList.add('ok');
                }
            });
            console.log("Telefonnummer fehlerhaft");
        }

        if (!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email.value))) {
            error = true;
            email.classList.add('error');
            console.log("Email fehlerhaft");

            email.addEventListener('blur', () => {
                if ((/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email.value))) {
                    email.classList.remove('error');
                    email.classList.add('ok');
                }
            });
            console.log("Email fehlerhaft");
        }

        if (alter.checked == false) {
            error = true;
            let alterBox = document.getElementById('alterDiv');
            alterBox.classList.add('checkBoxError');
            console.log("Alter muss angegeben werden.");

            alter.addEventListener('click', () => {
                alterBox.classList.remove('checkBoxError');

            });


        }

        
        var message = document.getElementById('formError');

        if (error) {
            message.style.display = "block";
            failedOnce = true;
            
        } else {
            let anfrage = new Anfrage(vName.value, zName.value, nummer.value, email.value, gender, tier, comment.value);
            let xmlString = anfrage.toXMLString();


            if (localStorage.getItem("anzahl") === null) {
                localStorage.setItem('anzahl', "1");
            } else {
                let t = parseInt(localStorage.getItem("anzahl"));
                t++;
                localStorage.setItem("anzahl", t);
            }

            let anzahlAnfragen = localStorage.getItem("anzahl");
            localStorage.setItem('anfrage'+anzahlAnfragen, xmlString);

            if (!failedOnce) {
                message.style.display = "block";
            }
            message.classList.remove("alert-danger");
            message.classList.add("alert-success");
            message.innerHTML = "Erfolgreich verschickt!";

            setTimeout(()=>{
                document.getElementsByTagName("form")[0].reset();
                message.style.display = "none";
            },2000);
        }


    });

}());

























