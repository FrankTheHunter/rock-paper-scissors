// Gestion de l'événement du clic sur le bouton "Règles"
document.querySelector('.rules-btn').addEventListener('click', (e) =>{
    e.preventDefault();
// Ajout de la classe "rules-popup--active" à la classe "rules-popup"
    document.querySelector('.rules-popup').classList.toggle('rules-popup--active');
    document.querySelector('.overlay').classList.toggle('overlay--active');
});
// Gestion de l'événement du clic sur le bouton "Fermer"
document.querySelector('.close-icon').addEventListener('click', () =>{
    document.querySelector('.rules-popup').classList.remove('rules-popup--active');
    document.querySelector('.overlay').classList.toggle('overlay--active');
});
// Sélection de tous les conteneurs de cercles de jeu
let gameItemsCont = Array.from(document.querySelectorAll("div[class^='game-body__circle-container'"));
let tempoV;
let tempoArr = [];
let stateFlag = false;
let score = document.querySelector('.header__value');

// Initialisation du score
setScore(state = 'init', tar = score);
// Écoute d'événement au clic sur chaque élément
gameItemsCont.forEach((e) =>{
     // Stocke l'élément cliqué dans une variable
    e.addEventListener('click', function(){
        // Stocke l'élément cliqué dans une variable
        tempoV = e;
        // Déclenche la fonction de jeu
        swipe(flag = stateFlag, arr = gameItemsCont, slim = tempoV, tmpArr = tempoArr);
        // Met à jour le drapeau d'état du jeu
        stateFlag = true;
        
    });
});
// Fonction de transition de l'étape 1 à l'étape 2
function swipe(flag, arr, slim, tmpArr){
    // Si l'étape 2 est vraie
    if (flag === true){
    // Logique de l'étape 2 ici (non fournie dans le code)
    }
    // Si l'étape 1 est fausse. Et passe à l'étape 2
    else{
        // Si l'étape 1 est fausse. Et passe à l'étape 2
        document.querySelector('.bg-triangle').classList.add('bg-triangle--s2');
        document.querySelector('.choosed-item--com__bg-circle').classList.add('choosed-item--com__bg-circle--s2');
        
        // Filtrer les éléments non cliqués dans un tableau temporaire
        arr.filter((e)=>{
            // Assurez-vous de l'élément cliqué
            if(slim !== arr[arr.indexOf(e)]){
        // Ajoute les éléments non cliqués au tableau temporaire
                tmpArr.push(e);
            }
        });
        // Choix d'un élément au hasard dans le tableau temporaire
        let comItem = tmpArr[Math.floor(Math.random() * 2)];
        // Ajout des classes pour l'élément choisi par l'utilisateur
        slim.classList.add('choosed-item--user');
        tmpArr.forEach((e) =>{
            e.classList.add('unchoosed-item');
        });
        // Affiche le choix de l'ordinateur après un délai
        setTimeout(()=>{
            comItem.classList.remove('unchoosed-item');
            comItem.classList.add('choosed-item--com');
        }, 1000)
        // Supprime les classes de l'étape 2 après un délai
        setTimeout(()=>{
            document.querySelector('.choosed-item--com__bg-circle').classList.remove('choosed-item--com__bg-circle--s2');
        }, 1000)
        // Crée des en-têtes pour indiquer les choix du joueur et de l'ordinateur
        let headingUser = document.createElement('h3');
        let headingUserContent = document.createTextNode('Your hand');
        headingUser.classList.add('you-picked');
        headingUser.append(headingUserContent);
        slim.append(headingUser);
        let headingCom = document.createElement('h3');
        let headingComContent = document.createTextNode('The hand of the house');
        headingCom.append(headingComContent);
        headingCom.classList.add('you-picked');
        comItem.append(headingCom);
         // Logique de vérification du gagnant (non fournie dans le code)
        
        /* Régles du jeu
            Le papier bat la pierre bat les ciseaux bat le papier
        */
        if(slim.className.includes('paper')){
            // Fonction pour ajouter un effet de surbrillance aux éléments choisis
            if(comItem.className.includes('rock')){
                // WIN
                gameOver(state = 'win', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'win', tar = score);}, 1500)
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(slim=slim);}, 1250);
            }else{
                //LOSE
                gameOver(state = 'lose', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'lose', tar = score);}, 1500)
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(slim=comItem);}, 1250);
            }
        }else if(slim.className.includes('rock')){

            if(comItem.className.includes('scissors')){
                // WIN
                gameOver(state = 'win', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'win', tar = score);}, 1500);
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(slim=slim);}, 1250);
            }else{
                //LOSE
                gameOver(state = 'lose', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'lose', tar = score);}, 1500);
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(slim=comItem);}, 1250);
            }
        }else if(slim.className.includes('scissors')){
            if(comItem.className.includes('rock')){
                //LOSE
                gameOver(state = 'lose', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'lose', tar = score);}, 1500);
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(slim=comItem);}, 1250);
            }else{
                // WIN
                gameOver(state = 'win', hUser1=headingUser, hCom1=headingCom);
                setTimeout(()=>{setScore(state = 'win', tar = score);}, 1500);
                // Add Highlight Effect For Choosed Item
                setTimeout(()=>{highlightEffect(slim=slim);}, 1250);
            }
        }
    }
}

function highlightEffect(slim){
    let c1 = document.createElement('div');
    let c2 = document.createElement('div');
    let c3 = document.createElement('div');
    slim.append(c1);
    slim.append(c2);
    slim.append(c3);
    c1.classList.add('circle');
    c1.classList.add('circle--1');
    c2.classList.add('circle');
    c2.classList.add('circle--2');
    c3.classList.add('circle');
    c3.classList.add('circle--3');
}
function gameOver(state, hUser1, hCom1){
    let heading = document.createElement('h2');
    let playAgain = document.createElement('button');
    let gameOverCont  = document.createElement('div');
    let playAgainSen = document.createTextNode('Play Again');
    let winSen = document.createTextNode('You Win');
    let loseSen = document.createTextNode('You Lose');
    heading.classList.add('gameoversen');
    playAgain.classList.add('btn');
    gameOverCont.classList.add('game-over-container')
    playAgain.append(playAgainSen);
    if(state == 'win'){
        heading.append(winSen);
    }else if(state == 'lose'){
        heading.append(loseSen);
    }
    gameOverCont.append(heading);
    gameOverCont.append(playAgain);
    setTimeout(()=>{
        document.querySelector('main').insertBefore(gameOverCont, document.querySelector('.rules-btn'));
        // document.querySelector('main').insertBefore(playAgain, document.querySelector('.rules-btn'));
        document.querySelector('.choosed-item--user').classList.add('choosed-item--user--s4');
        document.querySelector('.choosed-item--com').classList.add('choosed-item--com--s4');
        // document.querySelector('.game-body__big-circle').classList.add('game-body__big-circle--s4');
        // document.querySelector('.game-body__tiny-circle').classList.add('game-body__tiny-circle--s4');
        Array.from(document.querySelectorAll('.game-body__big-circle')).forEach((e)=>{
            e.classList.add('game-body__big-circle--s4');
        });
        Array.from(document.querySelectorAll('.game-body__tiny-circle')).forEach((e)=>{
            e.classList.add('game-body__tiny-circle--s4');
        });

    }, 1500)
    playAgain.addEventListener('click', ()=>{initGame(btn=playAgain, heading=heading, hUser=hUser1, hCom=hCom1, gmovCon=gameOverCont)});
}
function initGame(btn,heading,hUser,hCom,gmovCon){
    document.querySelector('.bg-triangle').classList.remove('bg-triangle--s2');
    document.querySelector('.choosed-item--com__bg-circle').classList.remove('choosed-item--com__bg-circle--s2');
    document.querySelector('.choosed-item--user').classList.remove('choosed-item--user--s4');
    document.querySelector('.choosed-item--com').classList.remove('choosed-item--com--s4');
    Array.from(document.querySelectorAll('.game-body__big-circle')).forEach((e)=>{
        e.classList.remove('game-body__big-circle--s4');
    });
    Array.from(document.querySelectorAll('.game-body__tiny-circle')).forEach((e)=>{
        e.classList.remove('game-body__tiny-circle--s4');
    });
    // Supprime les éléments ajoutés à la fin de la partie
    gameItemsCont.forEach((e)=>{
        if(e.className.includes('choosed-item--user')){
            for(let i = 1; i <= 3; i++){
                document.querySelector(`.circle--${i}`).remove();
            }
            e.classList.remove('choosed-item--user');
        }else if(e.className.includes('choosed-item--com')){
            e.classList.remove('choosed-item--com');
        }else{
            e.classList.remove('unchoosed-item');
        }
    });
    // Supprime les éléments de fin de partie
    btn.remove();
    heading.remove();
    gmovCon.remove();
    hUser.remove();
    hCom.remove();
     // Réinitialise le drapeau d'état du jeu
    stateFlag = false;
    tempoArr = [];
}
// Fonction pour mettre à jour le score
function setScore(state, tar){
    if(state == 'win'){
        tar.textContent++;
    }else if(state == 'lose'){
        if(tar.textContent > 0){
            tar.textContent--;
        }
    }else if(state == 'init'){
        tar.textContent = 0;
    }
}
