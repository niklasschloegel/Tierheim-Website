class Anfrage {
    constructor(vorname, nachname, tel, email, gender, wunschtier, comment = "") {
        this._vorname = vorname;
        this._nachname = nachname;
        this._tel = tel;
        this._email = email;
        this._gender = gender;
        this._wunschtier = wunschtier;
        this._comment = comment;
    }

    get vorname(){
        return this._vorname;
    }
    get nachname(){
        return this._nachname;
    }
    get tel (){
        return this._tel;
    }
    get email(){
        return this._email;
    }
    get gender(){
        return this._gender;
    }
    get wunschtier(){
        return this._wunschtier;
    }
    get comment(){
        return this._comment;
    }
    set vorname(val) {
        this._vorname = val;
    }
    set nachname(val){
        this._nachname = val;
    }
    set tel(val){
        this._tel = val;
    }
    set email(val) {
        this._email = val;
    }
    set gender(val){
        this._gender = val;
    }
    set wunschtier(val) {
        this._wunschtier = val;
    }
    set comment(val) {
        this._comment = val;
    }

    toXMLString(){

        let xml = '<?xml version="1.0" encoding="UTF-8"?>'
        + '<?xml-stylesheet type="text/css" href="../style/xml.css"?>'
        + '<!DOCTYPE anfrage['
        + '<!ELEMENT anfrage (vorname, nachname, geschlecht?, telefon?, email, wunschtier?, comment?)>'
        + '<!ELEMENT vorname (#PCDATA)>'
        + '<!ELEMENT nachname (#PCDATA)>'
        + '<!ELEMENT geschlecht EMPTY>'
        + '<!ATTLIST geschlecht '
        + '   value (m|w) #REQUIRED>'
        + '<!ELEMENT telefon (#PCDATA)>'
        + '<!ELEMENT email (#PCDATA)>'
        + '<!ELEMENT wunschtier (#PCDATA)>'
        + '<!ELEMENT comment (#PCDATA)>'
        + ']>'
        + '<anfrage>'
        + '<vorname>'+ this._vorname + '</vorname>'
        + '<nachname>' + this._nachname + '</nachname>'
        + '<geschlecht value="' + this._gender + '"/>'
        + '<telefon>' + this._tel + '</telefon>'
        + '<email>' + this._email + '</email>'
        + '<wunschtier>' + this._wunschtier + '</wunschtier>'
        + '<comment>'+ this._comment +'</comment>'
        + '</anfrage>';

        return xml;
    }

   


}




