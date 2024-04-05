let input_cp = document.getElementById("code-postal");
input_cp.addEventListener("input", function(){recup_cp(input_cp.value)});

function recup_cp(cp) {
    if (cp.length == 5) {
        console.log(cp);
        let url = 'https://geo.api.gouv.fr/communes?codePostal=${cp}';
        try {
            fetch(url)
            
        } catch (error) {
            console.log("ça ne marche pas");
        }
    }
}