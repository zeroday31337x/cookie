export type Quest = {
  id: string;
  title: string;
  tagline: string;
  clue: string;
  hint: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  image: string;
};

export const quests: Quest[] = [
  {
    id: "bakers-note",
    title: "The Baker's Note",
    tagline: "A napkin, a cipher, a five-letter leftover.",
    clue: "A napkin by the oven had this scrawled in Base64: Y3J1bWI=. Decode it. Five letters. It is the leftover we count as score.",
    hint: "Base64 decodes to a baking leftover. Starts with c.",
    difficulty: "Easy",
    category: "Demo",
    image: "/quest-art/napkin.jpg",
  },
  {
    id: "oven-bits",
    title: "Oven Bits",
    tagline: "The thermostat only speaks in eights.",
    clue: "01000011 01001111 01001111 01001011 — each group is one ASCII byte. Enter Cookie Chain's native fee ticker.",
    hint: "Binary to ASCII. Four letters. You pay fees with it.",
    difficulty: "Medium",
    category: "Cipher",
    image: "/quest-art/oven.jpg",
  },
  {
    id: "genesis-fork",
    title: "Genesis Fork",
    tagline: "A community snapshot. A lost chain. Eight letters.",
    clue: "Cookie Chain is a community hard fork of a memetic SVM that halted under its original operator. Identify the lost chain.",
    hint: "Oscar the Grouch lives in a trash can on Sesame Street.",
    difficulty: "Hard",
    category: "Community",
    image: "/quest-art/fork.jpg",
  },
];

export function getQuest(id: string) {
  return quests.find((quest) => quest.id === id);
}
