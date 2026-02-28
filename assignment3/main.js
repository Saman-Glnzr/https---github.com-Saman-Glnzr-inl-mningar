// 2.1: Du skall använda en klass för att representera en match mellan två deltagare.
class Match {
    #a;
    #b;
    #winner = null; 
    #el = null; //dom sparare


//2.1 Klassen ska ha följande struktur: En konstruktor som tar två deltagare som argument + Privata fält (#) för de två deltagarna och vinnaren — de ska inte kunna ändras utifrån.
    constructor(a, b) { // Konstruktor som tar deltagrna i ett argument
        this.#a = a; // Sätter in deltagare 1 internt och privat
        this.#b = b;// Sätter in deltagare 1 internt och privat
    }
}

// 2.1 Getters för att läsa deltagarna, vinnaren, och om matchen är spelad (isPlayed).
get a() { return this.#a; } //getter för a
get b() { return this.#b; } //getter för b
get winner() { return this.#winner; } //getter för winne
get isPlayed () {return this.#winner !== null;} // !== null skrivs här pga okänt värde som inte är lika med och inte är samma typ. isPlayed är getter för att kolla om det är spelat


