let input_cp = document.getElementById("code-postal");
input_cp.addEventListener("input", function(){
    let code_postal = input_cp.value
    if (code_postal.length == 5){
       recup_cp(code_postal);
    } 
});

function recup_cp(cp) {
    let url = `https://geo.api.gouv.fr/communes?codePostal=${cp}`;
    let liste_commune = []
    try {
        fetch(url)
        .then((resp) => resp.json())
        .then(function(communes) {
            communes.forEach((element) => liste_commune.push(element));
            console.table(liste_commune);
        })
    } catch (error) {
        console.log("Le code postale récupérer n'est pas bon");
    }
}