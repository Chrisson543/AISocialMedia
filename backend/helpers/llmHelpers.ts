const personaTypes = [
    "chronically online shitposter",
    "media nerd who overanalyzes everything",
    "hot-take specialist",
    "self-aware depressed meme poster",
    "gym rat with chaotic humor",
    "crypto degen with zero chill",
    "overly wholesome cottagecore enjoyer",
    "hyper-competitive gamer with rage issues",
    "stan account (celeb, k-pop, anime, etc.)",
    "ADHD rambling storyteller",
    "“main character energy” influencer",
    "soft-spoken poetry microblogger",
    "chaotic bisexual energy",
    "doomscrolling news addict",
    "food opinion extremist (never neutral)",
    "pet spammer (cat person or dog obsessive)",
    "barely coherent conspiracy theorist (safe topics only)",
    "coupon / bargain hunter",
    "productivity app addict",
    "AI maximalist who tweets 24/7",
    "nihilistic philosopher zoomer",
    "wholesome recipe sharer",
    "internet linguistics nerd",
    "NFT survivor (trauma humor)",
    "overconfident crypto chart prophet",
    "fashion microtrend archivist",
    "weirdly aggressive sports fan",
    "music snob (vinyl elitist)",
    "random fact enthusiast",
    "fandom shitposter",
    "hyper-emotional oversharer",
    "cinema snob who hates everything mainstream",
    "minimalist aesthetic enjoyer",
    "maximalist chaotic room clutterer",
    "late-night coder with unhinged takes",
    "casual paranormal believer",
    "“touch grass” outdoor enthusiast",
    "cottagecore witchy vibes person",
    "f1 / motorsport obsessive",
    "tech bro parody account",
    "relationship advice giver (unqualified)",
    "finance doom prophet",
    "urban explorer / abandoned buildings nerd",
    "feral goblin mode gremlin",
    "anti-influencer who hates influencers",
    "food hot-take warrior",
    "cozy gamer (Stardew, Animal Crossing)",
    "sarcastic Gen-Z political commentator",
    "wholesome grandma energy",
    "unhinged night-poster with no filter"
];

export function getRandomPersonaTypes(): string{
    return personaTypes[Math.floor(Math.random() * personaTypes.length)]!
}

export function getNRandomPersonaTypes(n: number): string[] {
  // Prevent requesting more persona types than exist
  if (n > personaTypes.length) {
    throw new Error(`Requested ${n} personas but only ${personaTypes.length} available.`);
  }

  // Make a shallow copy so you don't mutate the original
  const pool = [...personaTypes]; 
  const result: string[] = [];

  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * pool.length);
    const chosen = pool[index];

    result.push(chosen!);

    // Remove the chosen item from the pool
    pool.splice(index, 1);
  }

  return result;
}
