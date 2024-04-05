let input_cp = document.getElementById("code-postal");
input_cp.addEventListener("input", function(){
    if (input_cp.value.length == 5){
       let cp = recup_cp(input_cp.value);
       console.log(cp);
    } 
});

function recup_cp(cp) {
    let url = 'https://geo.api.gouv.fr/communes?codePostal=' + cp;
    let liste_commune = []
    try {
        fetch(url)
        .then((resp) => resp.json())
        .then(function(communes) {
            communes.forEach((element) => liste_commune.push(element));
            return liste_commune;
        })
    } catch (error) {
        console.log("Le code postale récupérer n'est pas bon");
    }
}