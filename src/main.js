const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRALIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRALIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result = "" ;

    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CONFRONTO";
            break;
        default:
            result = "CONFRONTO";
            break;
    }

    return result;
}

async function logResult(characterName, block, diceResult, attribute) {
    console.log(` ${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playerRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        // Sortear bloco 
        let block  = await getRandomBlock();
        console.log(`Bloco: ${block}`);
        
        // rolar os dados 
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade 
        let totalTesteSkil1 = 0;
        let totalTesteSkil2 = 0;

        if (block === "RETA"){
            totalTesteSkil1 = diceResult1 + character1.VELOCIDADE;
            totalTesteSkil2 = diceResult2 + character2.VELOCIDADE;

            await logResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logResult(character2.NOME, "velocidade", diceResult1, character2.VELOCIDADE);
        }

        if (block === "CURVA"){
            totalTesteSkil1 = diceResult1 + character1.MANOBRALIDADE;
            totalTesteSkil2 = diceResult2 + character1.MANOBRALIDADE;

            await logResult(character1.NOME, "manobralidade", diceResult1, character1.MANOBRALIDADE);
            await logResult(character2.NOME, "manobralidade", diceResult1, character2.MANOBRALIDADE);
        }

        if (block === "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            let arma = Math.floor(Math.random() * 2); 

            console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`);

            await logResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logResult(character2.NOME, "poder", diceResult2, character2.PODER);   

            if(powerResult1 > powerResult2 && character2.PONTOS > 0){ 
                
                const item = Math.floor(Math.random() * 2);
                // Jogador 1 venceu
                if (item === 0) {
                    console.log("\n🐢  Duelo de CASCO!");

                    console.log(
                        `${character1.NOME} venceu o confronto!`
                    );

                    console.log(
                        `${character2.NOME} perdeu 1 ponto! 🐢`
                    );

                    character2.PONTOS--;

                } else {
                    console.log("\n 💣 Duelo de BOMBA!");
                    console.log(
                        `${character1.NOME} venceu o confronto!`
                    );

                    console.log(
                        `${character2.NOME} perdeu 2 pontos! 💣`
                    );

                    character2.PONTOS -= 2;
                }

                // Chance de ganhar TURBO
                const turbo = Math.floor(Math.random() * 2);

                if (turbo === 1) {
                    character1.PONTOS++;

                    console.log(
                        `🚀 TURBO! ${character1.NOME} ganhou +1 ponto!`
                    );
                } else {
                    console.log(
                        `❌ ${character1.NOME} não conseguiu o turbo.`
                    );
                }

                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu ${turbo} ponto! 🐢`);
                character2.PONTOS--;
            }

            if(powerResult2 > powerResult1 && character1.PONTOS > 0){

                const item = Math.floor(Math.random() * 2);
                // Jogador 1 venceu
                if (item === 0) {
                    console.log("\n🐢  Duelo de CASCO!");

                    console.log(
                        `${character2.NOME} venceu o confronto!`
                    );

                    console.log(
                        `${character1.NOME} perdeu 1 ponto! 🐢`
                    );

                    character1.PONTOS--;

                } else {
                    console.log("\n 💣 Duelo de BOMBA!");

                    console.log(
                        `${character2.NOME} venceu o confronto!`
                    );

                    console.log(
                        `${character1.NOME} perdeu 2 pontos! 💣`
                    );

                    character1.PONTOS -= 2;
                }

                // Chance de ganhar TURBO
                const turbo = Math.floor(Math.random() * 2);

                if (turbo === 1) {
                    character2.PONTOS++;

                    console.log(
                        `🚀 TURBO! ${character2.NOME} ganhou +1 ponto!`
                    );
                } else {
                    console.log(
                        `❌ ${character1.NOME} não conseguiu o turbo.`
                    );
                }

                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu ${turbo} ponto! 🐢`);
                character1.PONTOS--;
            }

           console.log(
                powerResult2 === powerResult1
                ? "Confronto empatado! Nenhum ponto foi perdido"
                : ""
            );
        }

        // verificando o Vencedor
        if( totalTesteSkil1 > totalTesteSkil2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }else if(totalTesteSkil2 > totalTesteSkil1){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("---------------------------");
    }

}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS}`);
    console.log(`${character2.NOME}: ${character2.PONTOS}`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a Corrida! Parabéns! 🏆`);
    }else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} venceu a Corrida! Parabéns! 🏆`);
    }else{
        console.log("A corrida terminou em empate");
    }
}

(async function main() {
   console.log(
    `🏁🚨 ${player1.NOME} e ${player2.NOME} estão inciando uma corrida!\n`
   ); 

   await playerRaceEngine(player1, player2);
   await declareWinner(player1, player2);
})()