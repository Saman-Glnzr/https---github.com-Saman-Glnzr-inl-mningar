import { Match } from "./match.js";

function createTournament(players, rootEl) {

  const ROUND_NAMES = ["Kvartsfinal", "Semifinal", "Final"];

  let rounds = [];
  let roundIndex = 0;

  function makeRound(list) {

    const matches = [];

    for (let i = 0; i < list.length; i += 2) {
      matches.push(new Match(list[i], list[i + 1]));
    }

    return matches;
  }