let input_cp = document.getElementById("code-postal");
input_cp.addEventListener("input", function(){recup_cp(input_cp.value)});

function recup_cp(cp) {
    if (cp.length == 5) {
        console.log(cp);
        let url = 'https://geo.api.gouv.fr/communes?codePostal=' + cp;
        let liste_commune = []
        console.log(url);
        try {
            fetch(url)
            .then((resp) => resp.json())
            .then(function(communes) {
                communes.forEach((element) => liste_commune.push(element));
            })
        } catch (error) {
            console.log("ça ne marche pas");
        }
    }
}