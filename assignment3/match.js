// 2.1: Du skall använda en klass för att representera en match mellan två deltagare.
export class Match {
    #a;
    #b;
    #winner = null;
    #el = null; //dom sparare


    //2.1 Klassen ska ha följande struktur: En konstruktor som tar två deltagare som argument + Privata fält (#) för de två deltagarna och vinnaren — de ska inte kunna ändras utifrån.
    constructor(a, b) { // Konstruktor som tar deltagrna i ett argument
        this.#a = a; // Sätter in deltagare 1 internt och privat
        this.#b = b;// Sätter in deltagare 1 internt och privat
    }


    // 2.1 Getters för att läsa deltagarna, vinnaren, och om matchen är spelad (isPlayed).

    get a() {
        return this.#a;
    } //getter för a


    get b() { return this.#b; } //getter för b
    get winner() { return this.#winner; } //getter för winne
    get isPlayed() { return this.#winner !== null; } // !== null skrivs här pga okänt värde som inte är lika med och inte är samma typ. isPlayed är getter för att kolla om det är spelat


    //2.1  vinnaren ska väljas manuellt
    setWinner(player) {
        if (this.isPlayed) return;
        if (player === this.#a || player === this.#b) {
            this.#winner = player;
            this.updateUI();
        }
    }

    //En metod för att skapa och returnera ett html-element som representerar matchen och kan användas för att rendera den i DOM:en.
    //HTML

    createElement() {                  // Skapar + returnerar HTML-element 

        if (this.#el) return this.#el;   // Återanvänd om redan skapat 

        const el = document.createElement("div"); // Container 
        el.className = "match";          // Klass för CSS 

        el.innerHTML = `                <!-- Enkel HTML för matchen  -->
      <button class="p1">${this.#a.name ?? "Okänd"}</button>
      <button class="p2">${this.#b.name ?? "Okänd"}</button>
    `;

        el.querySelector(".p1").addEventListener("click", () => this.setWinner(this.#a)); // Klick A 
        el.querySelector(".p2").addEventListener("click", () => this.setWinner(this.#b)); // Klick B 

        this.#el = el;                   // Spara DOM-elementet (tips i uppgift) 
        this.updateUI();                 // Synka UI 
        return el;                       // Returnerar
    }


    updateUI() {                       // Uppdaterar UI efter vinst 
        if (!this.#el) return;           // Om inget element finns 

        const b1 = this.#el.querySelector(".p1"); // Hämta knapp A 
        const b2 = this.#el.querySelector(".p2"); // Hämta knapp B 

        if (!this.isPlayed) return;      // Om ej spelad, inget mer 

        const aWins = this.#winner === this.#a; // Vann A? 
        b1.classList.toggle("winner", aWins);   // Markera vinnare 
        b1.classList.toggle("loser", !aWins);   // Markera förlorare 
        b2.classList.toggle("winner", !aWins);  // Markera vinnare 
        b2.classList.toggle("loser", aWins);    // Markera förlorare 

        b1.disabled = true;              // Lås knappar 
        b2.disabled = true;              // Lås knappar 
    }
}