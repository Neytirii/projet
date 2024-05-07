const input_cp = document.getElementById("code-postal");
const menu_commune = document.getElementById("menu-deroulant")
const bouton = document.getElementById("envoyer")
const meteo = document.getElementById("meteo")
menu_commune.style.display = "none"
bouton.style.display = "none"

input_cp.value = ""
input_cp.addEventListener("input", async () => {
    let code_postal = input_cp.value;
    if (/^\d{5}$/.test(code_postal)){
        try {
            let donnee_commune = await recup_communes(code_postal);
            affiche_commune(donnee_commune)
            bouton.addEventListener("click", () => {
                let ville = menu_commune.options[menu_commune.selectedIndex].text;
                donnee_commune.forEach(async (commune) => {
                    if (Object.values(commune)[0] == ville) {
                        let donnee_meteo = await recup_meteo(Object.values(commune)[1])
                        console.table(donnee_meteo)
                        affiche_meteo(donnee_meteo)
                    }
                });
            })
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
    menu_commune.style.display = "initial";
    bouton.style.display = "initial";
}

async function recup_meteo(cp) {
    try {
        let reponse = await fetch(`https://api.meteo-concept.com/api/forecast/daily?token=4cfe199cf47ef5bbf0473b2e30e9d48fd90561cf03ef5a2532c69799f32410e8&insee=${cp}`)
        let donnee_meteo = await reponse.json()
        return Object.values(donnee_meteo)[2][0]
    } catch (error) {
        console.log("Une erreur est survenu", error)
        throw error
    }
}

function affiche_meteo(donnee) {
    meteo.innerHTML = ""
    meteo.innerHTML += `<p>Température minimum : ${Object.values(donnee)[13]}°C</p>`
    meteo.innerHTML += `<p>Température maximum : ${Object.values(donnee)[14]}°C</p>`
    meteo.innerHTML += `<p>Probabilité de pluie : ${Object.values(donnee)[11]}%</p>`
    meteo.innerHTML += `<p>Nombre d'heures d'ensoleillement : ${Object.values(donnee)[15]} heures</p>`
}