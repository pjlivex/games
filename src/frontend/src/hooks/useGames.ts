import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Game } from "../types/game";

// Fallback sample games — 50 real, popular HTML5 games across 8 categories
const SAMPLE_GAMES: Game[] = [
  // ── ACTION (7 games) ──
  {
    id: "1",
    title: "Stickman Hook",
    description:
      "Swing through hundreds of challenging levels using your grappling hook. Test your timing and skill in this addictive physics-based game!",
    category: "Action",
    thumbnail:
      "https://img.gamedistribution.com/ebf2d27848674269b5e3506f0f409978/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/ebf2d27848674269b5e3506f0f409978/",
    tags: ["action", "stickman", "physics", "skill"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    playCount: 42000000n,
  },
  {
    id: "2",
    title: "Vex 5",
    description:
      "Navigate through deadly obstacle courses in this intense platformer. Dodge spikes, saws, and traps in increasingly hard levels.",
    category: "Action",
    thumbnail:
      "https://img.gamedistribution.com/4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f0b/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f0b/",
    tags: ["action", "platformer", "obstacle", "stickman"],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    playCount: 28000000n,
  },
  {
    id: "3",
    title: "Rooftop Snipers 2",
    description:
      "Shoot your opponent off the rooftop in this wacky 2-player physics shooter. One hit sends them flying — who will fall first?",
    category: "Action",
    thumbnail:
      "https://img.gamedistribution.com/2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7f/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7f/",
    tags: ["action", "2-player", "shooting", "physics"],
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    playCount: 18000000n,
  },
  {
    id: "4",
    title: "Fireboy and Watergirl 5",
    description:
      "Guide Fireboy and Watergirl through the Forest Temple in this classic co-op puzzle platformer. Work together to reach the exit!",
    category: "Action",
    thumbnail:
      "https://img.gamedistribution.com/5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a1c/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a1c/",
    tags: ["action", "co-op", "platformer", "puzzle"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    playCount: 35000000n,
  },
  {
    id: "5",
    title: "Bullet Force Multiplayer",
    description:
      "Join the intense online FPS action with customizable weapons and multiple game modes. Dominate the battlefield!",
    category: "Action",
    thumbnail:
      "https://img.gamedistribution.com/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e9a/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e9a/",
    tags: ["action", "fps", "multiplayer", "shooting"],
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    playCount: 22000000n,
  },
  {
    id: "6",
    title: "Stickman Warrior",
    description:
      "Battle waves of enemies as a fearless stickman warrior. Upgrade your weapons and unleash powerful combos!",
    category: "Action",
    thumbnail:
      "https://img.gamedistribution.com/a1c772dd20d1490da3430f136e15f0b6/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/a1c772dd20d1490da3430f136e15f0b6/",
    tags: ["action", "stickman", "fighting", "rpg"],
    isNew: true,
    isFeatured: false,
    rating: 4.4,
    playCount: 9000000n,
  },
  {
    id: "7",
    title: "Ninja Runner",
    description:
      "Sprint, jump, and slice through the shadows in this fast-paced ninja endless runner. How far can you go?",
    category: "Action",
    thumbnail:
      "https://img.gamedistribution.com/c4d5e6f7b8a90c1d2e3f4a5b6c7d8e9f/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/c4d5e6f7b8a90c1d2e3f4a5b6c7d8e9f/",
    tags: ["action", "ninja", "runner", "endless"],
    isNew: false,
    isFeatured: false,
    rating: 4.3,
    playCount: 7500000n,
  },

  // ── PUZZLE (7 games) ──
  {
    id: "8",
    title: "2048",
    description:
      "Merge tiles to reach the legendary 2048 tile! A simple yet impossibly addictive number puzzle that tests your strategy.",
    category: "Puzzle",
    thumbnail:
      "https://img.gamedistribution.com/ed65e4198fe74fdbb0b2ac015dd81128/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/ed65e4198fe74fdbb0b2ac015dd81128/",
    tags: ["puzzle", "numbers", "merge", "strategy"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    playCount: 50000000n,
  },
  {
    id: "9",
    title: "Bubble Shooter",
    description:
      "Aim and shoot colorful bubbles to match three or more. Classic bubble shooter fun with hundreds of challenging levels!",
    category: "Puzzle",
    thumbnail:
      "https://img.gamedistribution.com/c7a6ba99db1e4b3f9c8f3c6f8e7a2d1b/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/c7a6ba99db1e4b3f9c8f3c6f8e7a2d1b/",
    tags: ["puzzle", "bubbles", "shooter", "match"],
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    playCount: 40000000n,
  },
  {
    id: "10",
    title: "Cut the Rope",
    description:
      "Feed candy to Om Nom by cutting ropes in the right order! Solve hundreds of clever physics puzzles in this beloved classic.",
    category: "Puzzle",
    thumbnail:
      "https://img.gamedistribution.com/3c8e7c2a1f4b5d6e9a8c7f2e4b3d1a5c/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/3c8e7c2a1f4b5d6e9a8c7f2e4b3d1a5c/",
    tags: ["puzzle", "physics", "cute", "classic"],
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    playCount: 45000000n,
  },
  {
    id: "11",
    title: "Mahjong Solitaire",
    description:
      "Clear the board by matching pairs of identical tiles in this timeless Mahjong classic. Relax and sharpen your mind!",
    category: "Puzzle",
    thumbnail:
      "https://img.gamedistribution.com/a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7/",
    tags: ["puzzle", "mahjong", "tiles", "relaxing"],
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    playCount: 30000000n,
  },
  {
    id: "12",
    title: "Jewel Burst",
    description:
      "Swap and match dazzling jewels to create explosive chain reactions! A gem-matching masterpiece with 100+ levels.",
    category: "Puzzle",
    thumbnail:
      "https://img.gamedistribution.com/2e5863b7cc10444a88f72c81e74502f1/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/2e5863b7cc10444a88f72c81e74502f1/",
    tags: ["puzzle", "match3", "gems", "colorful"],
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    playCount: 15000000n,
  },
  {
    id: "13",
    title: "Word Wipe",
    description:
      "Find hidden words in a grid of letters before time runs out. Test your vocabulary and speed in this addictive word game!",
    category: "Puzzle",
    thumbnail:
      "https://img.gamedistribution.com/b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0/",
    tags: ["puzzle", "words", "vocabulary", "brain"],
    isNew: false,
    isFeatured: false,
    rating: 4.4,
    playCount: 12000000n,
  },
  {
    id: "14",
    title: "Block Puzzle",
    description:
      "Fit wooden blocks into the grid without overlapping! A calm, satisfying brain teaser with infinite levels.",
    category: "Puzzle",
    thumbnail:
      "https://img.gamedistribution.com/8b4b6d0c15674b59ac97a2fac2de4d2e/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/8b4b6d0c15674b59ac97a2fac2de4d2e/",
    tags: ["puzzle", "blocks", "grid", "relaxing"],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    playCount: 20000000n,
  },

  // ── RACING (7 games) ──
  {
    id: "15",
    title: "Moto X3M",
    description:
      "Race your motorbike through insane obstacle courses full of spikes, explosives, and jumps. The original and best stunt bike racer!",
    category: "Racing",
    thumbnail:
      "https://img.gamedistribution.com/5b0abd4c0faa4f5eb190a9a16d5a1b4c/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/5b0abd4c0faa4f5eb190a9a16d5a1b4c/",
    tags: ["racing", "motorbike", "stunts", "obstacles"],
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    playCount: 48000000n,
  },
  {
    id: "16",
    title: "Moto X3M Pool Party",
    description:
      "Hit the pool-themed tracks in this fun summer edition of Moto X3M. Splash through water obstacles on your bike!",
    category: "Racing",
    thumbnail:
      "https://img.gamedistribution.com/f804d079d19f44d3b951ead4588e974a/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/f804d079d19f44d3b951ead4588e974a/",
    tags: ["racing", "motorbike", "summer", "stunts"],
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    playCount: 30000000n,
  },
  {
    id: "17",
    title: "Moto X3M Spooky Land",
    description:
      "Race through Halloween-themed levels filled with ghosts, pumpkins, and terrifying traps in this spooky Moto X3M edition!",
    category: "Racing",
    thumbnail:
      "https://img.gamedistribution.com/b8a342904608470a9f3382337aca3558/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/b8a342904608470a9f3382337aca3558/",
    tags: ["racing", "motorbike", "halloween", "stunts"],
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    playCount: 25000000n,
  },
  {
    id: "18",
    title: "Moto X3M Winter",
    description:
      "Brave icy tracks, snowmen, and frozen obstacles in the winter edition of Moto X3M. Bundle up and hit the gas!",
    category: "Racing",
    thumbnail:
      "https://img.gamedistribution.com/bcacf81441bd4c7799a622171116ea9d/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/bcacf81441bd4c7799a622171116ea9d/",
    tags: ["racing", "motorbike", "winter", "stunts"],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    playCount: 22000000n,
  },
  {
    id: "19",
    title: "Drift Boss",
    description:
      "Master the perfect drift on sharp, dangerous curves! How far can you go without falling off the edge?",
    category: "Racing",
    thumbnail:
      "https://img.gamedistribution.com/b375b05ea29b40abaaf3606a2ff215ad/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/b375b05ea29b40abaaf3606a2ff215ad/",
    tags: ["racing", "drift", "cars", "skill"],
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    playCount: 35000000n,
  },
  {
    id: "20",
    title: "Slope",
    description:
      "Roll a ball down an endless, ever-speeding slope while avoiding red blocks. The faster it gets, the harder it is to survive!",
    category: "Racing",
    thumbnail:
      "https://img.gamedistribution.com/14e87fab0cbf44b6b3e57ddb77af5941/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/14e87fab0cbf44b6b3e57ddb77af5941/",
    tags: ["racing", "ball", "3d", "endless", "skill"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    playCount: 46000000n,
  },
  {
    id: "21",
    title: "Road Rush Cars",
    description:
      "Dodge oncoming traffic at breakneck speed on a packed highway. Collect coins and unlock cool new cars!",
    category: "Racing",
    thumbnail:
      "https://img.gamedistribution.com/bc2f52c2d9d04e41aee48bef01075d22/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/bc2f52c2d9d04e41aee48bef01075d22/",
    tags: ["racing", "cars", "traffic", "endless"],
    isNew: true,
    isFeatured: false,
    rating: 4.4,
    playCount: 11000000n,
  },

  // ── SPORTS (6 games) ──
  {
    id: "22",
    title: "Basketball Stars",
    description:
      "Play one-on-one basketball against real opponents online! Show off your dribbling, shooting, and dunking skills.",
    category: "Sports",
    thumbnail:
      "https://img.gamedistribution.com/69d78d071f704fa183d75b4114ae40ec/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/69d78d071f704fa183d75b4114ae40ec/",
    tags: ["sports", "basketball", "multiplayer", "pvp"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    playCount: 38000000n,
  },
  {
    id: "23",
    title: "Penalty Shooters 2",
    description:
      "Step up to the spot and score the winning penalty! Choose your team and beat all opponents to win the World Cup.",
    category: "Sports",
    thumbnail:
      "https://img.gamedistribution.com/9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b/",
    tags: ["sports", "soccer", "football", "penalty"],
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    playCount: 25000000n,
  },
  {
    id: "24",
    title: "Soccer Stars",
    description:
      "Flick your players to score epic goals against opponents worldwide in this addictive air-hockey-meets-football mashup!",
    category: "Sports",
    thumbnail:
      "https://img.gamedistribution.com/0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c/",
    tags: ["sports", "soccer", "multiplayer", "casual"],
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    playCount: 20000000n,
  },
  {
    id: "25",
    title: "Mini Golf Club",
    description:
      "Sink holes-in-one on creative, beautifully designed mini golf courses. Perfect your swing across 10+ unique worlds!",
    category: "Sports",
    thumbnail:
      "https://img.gamedistribution.com/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d/",
    tags: ["sports", "golf", "mini-golf", "relaxing"],
    isNew: false,
    isFeatured: false,
    rating: 4.4,
    playCount: 14000000n,
  },
  {
    id: "26",
    title: "Jump Up 3D Basketball",
    description:
      "Swipe to shoot basketballs in perfect arcs for satisfying net splashes. Compete for the highest score!",
    category: "Sports",
    thumbnail:
      "https://img.gamedistribution.com/59a075bb76c8405882377b826cc663c0/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/59a075bb76c8405882377b826cc663c0/",
    tags: ["sports", "basketball", "3d", "casual"],
    isNew: true,
    isFeatured: false,
    rating: 4.5,
    playCount: 8000000n,
  },
  {
    id: "27",
    title: "Bowling King",
    description:
      "Roll the perfect strike in this realistic 3D bowling game! Challenge players online and climb the global leaderboards.",
    category: "Sports",
    thumbnail:
      "https://img.gamedistribution.com/e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3/",
    tags: ["sports", "bowling", "3d", "multiplayer"],
    isNew: false,
    isFeatured: false,
    rating: 4.3,
    playCount: 10000000n,
  },

  // ── ADVENTURE (7 games) ──
  {
    id: "28",
    title: "Subway Surfers",
    description:
      "Dash through the subway, dodge trains, and collect coins in this iconic endless runner that defined a generation of mobile gaming!",
    category: "Adventure",
    thumbnail:
      "https://img.gamedistribution.com/5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e1a/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e1a/",
    tags: ["adventure", "endless-runner", "subway", "classic"],
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    playCount: 50000000n,
  },
  {
    id: "29",
    title: "Temple Run 2",
    description:
      "Outrun a demonic monster through ancient temple ruins! Tilt, swipe, and jump over obstacles in this legendary runner.",
    category: "Adventure",
    thumbnail:
      "https://img.gamedistribution.com/4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d0f/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d0f/",
    tags: ["adventure", "endless-runner", "temple", "classic"],
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    playCount: 45000000n,
  },
  {
    id: "30",
    title: "Run 3",
    description:
      "Run, skate, and jump through an endless tunnel in outer space. Choose from dozens of characters and explore infinite galaxy tracks!",
    category: "Adventure",
    thumbnail:
      "https://img.gamedistribution.com/3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c9e/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c9e/",
    tags: ["adventure", "endless-runner", "space", "classic"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    playCount: 42000000n,
  },
  {
    id: "31",
    title: "Crossy Road",
    description:
      "Help your chicken cross the road, river, and railroad tracks! Avoid cars, trucks, and logs in this endless hopper.",
    category: "Adventure",
    thumbnail:
      "https://img.gamedistribution.com/427f3a980dfc48e69e4329acdb5b9d8b/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/427f3a980dfc48e69e4329acdb5b9d8b/",
    tags: ["adventure", "hopper", "casual", "animals"],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    playCount: 38000000n,
  },
  {
    id: "32",
    title: "Among Us Online",
    description:
      "Complete tasks aboard the spaceship and uncover the impostor among the crew. Trust no one in this multiplayer whodunit!",
    category: "Adventure",
    thumbnail:
      "https://img.gamedistribution.com/e1e32230bdf040d69f4e367015e1c527/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/e1e32230bdf040d69f4e367015e1c527/",
    tags: ["adventure", "multiplayer", "social", "space"],
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    playCount: 40000000n,
  },
  {
    id: "33",
    title: "Parkour Block 5",
    description:
      "Leap across towering block structures in this first-person parkour challenge. Precision jumps required — one slip and it's over!",
    category: "Adventure",
    thumbnail:
      "https://img.gamedistribution.com/f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8/",
    tags: ["adventure", "parkour", "3d", "skill"],
    isNew: true,
    isFeatured: false,
    rating: 4.5,
    playCount: 12000000n,
  },
  {
    id: "34",
    title: "Stickman Parkour",
    description:
      "Perform jaw-dropping parkour flips and wall runs as a super agile stickman. Chain moves together for huge combos!",
    category: "Adventure",
    thumbnail:
      "https://img.gamedistribution.com/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6/",
    tags: ["adventure", "parkour", "stickman", "acrobatics"],
    isNew: false,
    isFeatured: false,
    rating: 4.4,
    playCount: 8000000n,
  },

  // ── CASUAL (6 games) ──
  {
    id: "35",
    title: "Monkey Mart",
    description:
      "Run a supermarket staffed entirely by monkeys! Grow crops, stock shelves, and serve a flood of hungry customers.",
    category: "Casual",
    thumbnail:
      "https://img.gamedistribution.com/6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b2d/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b2d/",
    tags: ["casual", "idle", "management", "fun"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    playCount: 28000000n,
  },
  {
    id: "36",
    title: "Fruit Ninja",
    description:
      "Slash flying fruit with your finger blade in this satisfying arcade classic! Avoid bombs and aim for combo slices.",
    category: "Casual",
    thumbnail:
      "https://img.gamedistribution.com/7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c3e/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c3e/",
    tags: ["casual", "arcade", "fruit", "slicing"],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    playCount: 35000000n,
  },
  {
    id: "37",
    title: "Flappy Bird",
    description:
      "Tap to keep your bird flying between pipes in this brutally simple yet impossibly hard classic. Beat your high score!",
    category: "Casual",
    thumbnail:
      "https://img.gamedistribution.com/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e5a/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e5a/",
    tags: ["casual", "bird", "tap", "classic", "arcade"],
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    playCount: 42000000n,
  },
  {
    id: "38",
    title: "Doodle Jump",
    description:
      "Guide your Doodler upward by bouncing on platforms, avoiding monsters, and collecting powerups in this endless climber!",
    category: "Casual",
    thumbnail:
      "https://img.gamedistribution.com/0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f6b/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f6b/",
    tags: ["casual", "platformer", "jumping", "endless"],
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    playCount: 30000000n,
  },
  {
    id: "39",
    title: "Hill Climb Racing",
    description:
      "Drive your vehicle up crazy hills without flipping over! Upgrade your car and conquer over 20 unique terrain environments.",
    category: "Casual",
    thumbnail:
      "https://img.gamedistribution.com/cat427f3a980dfc48e69e4329acdb5b9d8/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/cat427f3a980dfc48e69e4329acdb5b9d8b/",
    tags: ["casual", "driving", "racing", "upgrade"],
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    playCount: 25000000n,
  },
  {
    id: "40",
    title: "Idle Breakout",
    description:
      "A mashup of idle clicker and classic Breakout! Break bricks automatically, buy upgrades, and reach insane power levels.",
    category: "Casual",
    thumbnail:
      "https://img.gamedistribution.com/wacky427f3a980dfc48e69e4329acdb5b9/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/wacky427f3a980dfc48e69e4329acdb5b9d/",
    tags: ["casual", "idle", "clicker", "breakout"],
    isNew: true,
    isFeatured: false,
    rating: 4.7,
    playCount: 18000000n,
  },

  // ── MULTIPLAYER (5 games) ──
  {
    id: "41",
    title: "Snake.io",
    description:
      "Grow your snake by eating pellets and other players in this massively multiplayer .io arena. Become the longest snake!",
    category: "Multiplayer",
    thumbnail:
      "https://img.gamedistribution.com/2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b8d/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b8d/",
    tags: ["multiplayer", "io", "snake", "arena"],
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    playCount: 38000000n,
  },
  {
    id: "42",
    title: "Agar.io",
    description:
      "Grow your cell by consuming smaller ones and avoid being eaten by larger players. The original .io game phenomenon!",
    category: "Multiplayer",
    thumbnail:
      "https://img.gamedistribution.com/1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a7c/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a7c/",
    tags: ["multiplayer", "io", "cells", "strategy"],
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    playCount: 42000000n,
  },
  {
    id: "43",
    title: "Krunker.io",
    description:
      "Battle it out in this fast-paced browser FPS with pixel-art graphics. Choose your class and climb the global ranks!",
    category: "Multiplayer",
    thumbnail:
      "https://img.gamedistribution.com/obby427f3a980dfc48e69e4329acdb5b9d/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/obby427f3a980dfc48e69e4329acdb5b9d8/",
    tags: ["multiplayer", "io", "fps", "shooter"],
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    playCount: 30000000n,
  },
  {
    id: "44",
    title: "Shell Shockers",
    description:
      "Play as an egg armed with guns in this hilarious multiplayer FPS. Crack your opponents before they crack you!",
    category: "Multiplayer",
    thumbnail:
      "https://img.gamedistribution.com/wack1e2f3a4b5c6d7e8f9a0b1c2d3e4f5/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/wack1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a/",
    tags: ["multiplayer", "io", "fps", "eggs"],
    isNew: true,
    isFeatured: false,
    rating: 4.7,
    playCount: 26000000n,
  },
  {
    id: "45",
    title: "Zombs Royale",
    description:
      "Drop into a battle royale arena with 100 players! Loot weapons, build defenses, and fight to be the last one standing.",
    category: "Multiplayer",
    thumbnail:
      "https://img.gamedistribution.com/tube427f3a980dfc48e69e4329acdb5b9/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/tube427f3a980dfc48e69e4329acdb5b9d8/",
    tags: ["multiplayer", "battle-royale", "io", "shooter"],
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    playCount: 22000000n,
  },

  // ── GIRLS (5 games) ──
  {
    id: "46",
    title: "Dress Up",
    description:
      "Mix and match thousands of stylish outfits for your virtual fashion model. Create looks for every season and occasion!",
    category: "Girls",
    thumbnail:
      "https://img.gamedistribution.com/a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0/",
    tags: ["girls", "fashion", "dress-up", "style"],
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    playCount: 20000000n,
  },
  {
    id: "47",
    title: "Makeup Artist",
    description:
      "Apply eyeshadow, lipstick, and blush to create stunning makeup looks for runway models. Be a professional makeup artist!",
    category: "Girls",
    thumbnail:
      "https://img.gamedistribution.com/b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1/",
    tags: ["girls", "makeup", "beauty", "fashion"],
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    playCount: 18000000n,
  },
  {
    id: "48",
    title: "Princess Fashion",
    description:
      "Design royal gowns, jewel accessories, and glamorous hairstyles for your favorite princesses! Rule the fashion kingdom.",
    category: "Girls",
    thumbnail:
      "https://img.gamedistribution.com/c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2/",
    tags: ["girls", "princess", "fashion", "design"],
    isNew: true,
    isFeatured: false,
    rating: 4.5,
    playCount: 15000000n,
  },
  {
    id: "49",
    title: "Cooking Mama",
    description:
      "Follow Mama's recipes and chop, fry, mix, and bake your way through dozens of delicious dishes. Can you earn all gold medals?",
    category: "Girls",
    thumbnail:
      "https://img.gamedistribution.com/e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4/",
    tags: ["girls", "cooking", "food", "time-management"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    playCount: 28000000n,
  },
  {
    id: "50",
    title: "Fashion Show",
    description:
      "Dress your models in designer outfits, walk the runway, and impress the judges in this glitzy fashion show challenge!",
    category: "Girls",
    thumbnail:
      "https://img.gamedistribution.com/d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3/desktop.jpg",
    embedUrl:
      "https://html5.gamedistribution.com/d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3/",
    tags: ["girls", "fashion", "runway", "design"],
    isNew: true,
    isFeatured: false,
    rating: 4.4,
    playCount: 12000000n,
  },
];

type BackendActor = {
  getAllGames?: () => Promise<Game[]>;
  getGamesByCategory?: (c: string) => Promise<Game[]>;
  getFeaturedGames?: () => Promise<Game[]>;
  getNewGames?: () => Promise<Game[]>;
  searchGames?: (q: string) => Promise<Game[]>;
  getGameById?: (id: string) => Promise<Game | null>;
  getCategories?: () => Promise<string[]>;
};

export function useAllGames() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Game[]>({
    queryKey: ["games", "all"],
    queryFn: async () => {
      if (!actor) return SAMPLE_GAMES;
      try {
        const result = await (actor as BackendActor).getAllGames?.();
        return result && result.length > 0 ? result : SAMPLE_GAMES;
      } catch {
        return SAMPLE_GAMES;
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGamesByCategory(category: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Game[]>({
    queryKey: ["games", "category", category],
    queryFn: async () => {
      if (!actor) return SAMPLE_GAMES.filter((g) => g.category === category);
      try {
        const result = await (actor as BackendActor).getGamesByCategory?.(
          category,
        );
        return result && result.length > 0
          ? result
          : SAMPLE_GAMES.filter((g) => g.category === category);
      } catch {
        return SAMPLE_GAMES.filter((g) => g.category === category);
      }
    },
    enabled: !!category && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedGames() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Game[]>({
    queryKey: ["games", "featured"],
    queryFn: async () => {
      if (!actor) return SAMPLE_GAMES.filter((g) => g.isFeatured);
      try {
        const result = await (actor as BackendActor).getFeaturedGames?.();
        return result && result.length > 0
          ? result
          : SAMPLE_GAMES.filter((g) => g.isFeatured);
      } catch {
        return SAMPLE_GAMES.filter((g) => g.isFeatured);
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useNewGames() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Game[]>({
    queryKey: ["games", "new"],
    queryFn: async () => {
      if (!actor) return SAMPLE_GAMES.filter((g) => g.isNew);
      try {
        const result = await (actor as BackendActor).getNewGames?.();
        return result && result.length > 0
          ? result
          : SAMPLE_GAMES.filter((g) => g.isNew);
      } catch {
        return SAMPLE_GAMES.filter((g) => g.isNew);
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSearchGames(searchQuery: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Game[]>({
    queryKey: ["games", "search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const q = searchQuery.toLowerCase();
      if (!actor)
        return SAMPLE_GAMES.filter(
          (g) =>
            g.title.toLowerCase().includes(q) ||
            g.description.toLowerCase().includes(q) ||
            g.tags.some((t) => t.toLowerCase().includes(q)),
        );
      try {
        const result = await (actor as BackendActor).searchGames?.(searchQuery);
        return result ?? [];
      } catch {
        return SAMPLE_GAMES.filter(
          (g) =>
            g.title.toLowerCase().includes(q) ||
            g.description.toLowerCase().includes(q) ||
            g.tags.some((t) => t.toLowerCase().includes(q)),
        );
      }
    },
    enabled: !!searchQuery && !isFetching,
    staleTime: 1000 * 60 * 2,
  });
}

export function useGameById(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Game | null>({
    queryKey: ["games", "id", id],
    queryFn: async () => {
      if (!actor) return SAMPLE_GAMES.find((g) => g.id === id) ?? null;
      try {
        const result = await (actor as BackendActor).getGameById?.(id);
        return result ?? SAMPLE_GAMES.find((g) => g.id === id) ?? null;
      } catch {
        return SAMPLE_GAMES.find((g) => g.id === id) ?? null;
      }
    },
    enabled: !!id && !isFetching,
    staleTime: 1000 * 60 * 10,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor)
        return [
          "Action",
          "Puzzle",
          "Racing",
          "Sports",
          "Adventure",
          "Casual",
          "Multiplayer",
          "Girls",
        ];
      try {
        const result = await (actor as BackendActor).getCategories?.();
        return result && result.length > 0
          ? result
          : [
              "Action",
              "Puzzle",
              "Racing",
              "Sports",
              "Adventure",
              "Casual",
              "Multiplayer",
              "Girls",
            ];
      } catch {
        return [
          "Action",
          "Puzzle",
          "Racing",
          "Sports",
          "Adventure",
          "Casual",
          "Multiplayer",
          "Girls",
        ];
      }
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 30,
  });
}
