function decomposition_facteurs_premiers(n) {
    var i = 2;
    var facteurs = [];
    while (i * i <= n) {
        if (n % i) {
            i += 1;
        } else {
            n = Math.floor(n / i);
            facteurs.push(i);
        }
    }
    if (n > 1) {
        facteurs.push(n);
    }
    console.log("bli", facteurs)
    return facteurs;
}

function produitFacteursPremiers(n) {
    let produit = 1;
    while (n % 2 === 0) {
      n = n / 2;
    }
    while (n % 5 === 0) {
      n = n / 5;
    }
    for (let i = 3; i <= Math.sqrt(n); i = i + 2) {
      while (n % i === 0) {
        if (i !== 2 && i !== 5) {
          produit = produit * i;
        }
        n = n / i;
      }
    }
    if (n > 1 && n !== 2 && n !== 5) {
      produit = produit * n;
    }
    return produit;
  }
  
  
function contient_seulement_2_et_5(n) {
    var facteurs_premiers = decomposition_facteurs_premiers(n);
    for (var i = 0; i < facteurs_premiers.length; i++) {
        if (facteurs_premiers[i] != 2 && facteurs_premiers[i] != 5) {
            return false;
        }
    }
    return true;
}


function recuperer_exposants_deux_et_cinq(n) {
    
    var facteurs_premiers = decomposition_facteurs_premiers(n);
    var exposant_deux = 0;
    var exposant_cinq = 0;
    for (var i = 0; i < facteurs_premiers.length; i++) {
        if (facteurs_premiers[i] == 2) {
            console.log("exposant deux")
            exposant_deux += 1;
        } 
        if (facteurs_premiers[i] == 5) {
            console.log("exposant cinq")
            exposant_cinq += 1;
        }
    }
    return [exposant_deux, exposant_cinq];
}


function pgcd(a, b) {
    if (b == 0) {
        return a;
    } else {
        return pgcd(b, a % b);
    }
}


function indicatrice_euler(n) {
    if (n <= 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }
    var phi = n;
    for (var p = 2; p * p <= n; p++) {
      if (n % p === 0) {
        while (n % p === 0) {
          n /= p;
        }
        phi -= phi / p;
      }
    }
    if (n > 1) {
      phi -= phi / n;
    }
    console.log("gh", phi)
    return phi;
  }
  

function validateForm() {
    const champ = document.querySelector('#nombre'); // sélectionne le champ d'entrée avec l'id "nom"
    if (champ.value === '') { // vérifie si le champ est vide
      alert('Il faut entrer une valeur !'); // affiche une alerte si le champ est vide
      return false; // empêche la soumission du formulaire
    }
    else {
        var nombre = champ.value;
        console.log(nombre)
        
        calculer_k(nombre);
    } // autorise la soumission du formulaire
}

  
function calculer_k(nombre) {
    var exposants = recuperer_exposants_deux_et_cinq(nombre);
    var k, kn, kp;
    console.log("zylophone", contient_seulement_2_et_5(nombre))
    console.log("nannanan", exposants)

    if (contient_seulement_2_et_5(nombre)) {
        k = ((9 * (Math.pow(10, exposants[0] + exposants[1]))) / nombre);
        kn = bigInt(k);
        kp = kn.toLocaleString();
    } else {
        console.log(produitFacteursPremiers(nombre))
        var phi = indicatrice_euler(produitFacteursPremiers(nombre));
        if (phi === Infinity) {
            document.getElementById("resultat").innerHTML = "Le coefficient est trop grand.";
            return;
        }
        
        else {
            console.log('bib')
            try {
                var m = Math.pow(10, phi);
                console.log(m)
                console.log("preimère partie :", bigInt(m-1));
                console.log("deuxième partie :", Math.pow(10, exposants[0] + exposants[1]));
                ki = bigInt((Math.pow(10, phi)-1)*Math.pow(10, exposants[0] + exposants[1]) / nombre);
                k = (((new Big(Math.pow(10, phi))).minus(1)).times(new Big(Math.pow(10, exposants[0] + exposants[1])))).div( new Big(nombre));
                kp = k.toLocaleString();
                ki = k.toLocaleString();
                console.log("ki", ki)
                console.log("kp", kp); 
            }
            catch(error) {
                console.log(error)
                kp = "Le coefficient est trop grand.";
            }
        }
    
    
        
    }
    if (kp.length > 10) {
        document.getElementById("resultat").style.fontSize = "1em";
    }
    if (kp.length > 20) {
        document.getElementById("resultat").style.fontSize = "0.9em";
    }
    if (kp.length > 30) {
        document.getElementById("resultat").style.fontSize = "0.5em";
    }
    else {
        document.getElementById("resultat").style.fontSize = "1.5em";
    }
    var b = (kp*nombre)
    console.log("Resultat :", b)
    document.getElementById("resultat").innerHTML = kp;
}


var za = ((( new Big(Math.pow(10, 82))).minus(1)).times(new Big(1))).div( new Big(83));

console.log(za.toLocaleString())