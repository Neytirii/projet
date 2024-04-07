const input_cp = document.getElementById("code-postal");
const menu_commune = document.getElementById("menu-deroulant")
menu_commune.style.display = "none"

input_cp.addEventListener("input", async () => {
    let code_postal = input_cp.value;
    if (/^\d{5}$/.test(code_postal)){
        try {
            let donnee_commune = await recup_communes(code_postal);
            affiche_commune(donnee_commune)
        } catch (error) {
            console.log("Erreur lors de la récupération des données de communes", error);
            throw error;
        }
       
    } 
});

async function recup_communes(cp) {
    let url = `https://geo.api.gouv.fr/communes?codePostal=${cp}`;
    try {
        let reponse = await fetch(url);
        let donnee_commune = await reponse.json();
        console.table(donnee_commune);
        return donnee_commune;
    } catch (error) {
        console.log("Erreur lors de la récupération des données de communes", error);
        throw error;
    }
}

function affiche_commune(donnee) {
    menu_commune.innerHTML = ""
    donnee.forEach(commune => {
        menu_commune.innerHTML += `<option>${Object.values(commune)[0]}</option>`
    });
    menu_commune.style.display = "initial"
}