import Types "../types/common";
import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  public type Game = Types.Game;
  public type GameId = Types.GameId;

  let CATEGORIES : [Text] = [
    "Action",
    "Puzzle",
    "Racing",
    "Sports",
    "Adventure",
    "Casual",
    "Multiplayer",
    "Girls",
  ];

  let SEED_GAMES : [Game] = [
    // ── Action ────────────────────────────────────────────────────────────────
    {
      id = "subway-surfers";
      title = "Subway Surfers";
      description = "Run, dodge trains and collect coins in this endless runner!";
      category = "Action";
      thumbnail = "https://picsum.photos/seed/subway-surfers/300/200";
      embedUrl = "https://html5.gamedistribution.com/aaad6d45a27046a99de1e4e55cc5e73e/";
      tags = ["runner", "endless", "dodge"];
      isNew = false;
      isFeatured = true;
      rating = 4.8;
      playCount = 1200000;
    },
    {
      id = "gun-mayhem";
      title = "Gun Mayhem Redux";
      description = "Fast-paced arena shooter with crazy weapons and power-ups!";
      category = "Action";
      thumbnail = "https://picsum.photos/seed/gun-mayhem/300/200";
      embedUrl = "https://html5.gamedistribution.com/3d5025a79bac4c5ba60f3875d34c2c26/";
      tags = ["shooter", "arena", "multiplayer"];
      isNew = false;
      isFeatured = true;
      rating = 4.6;
      playCount = 850000;
    },
    {
      id = "stickman-archer";
      title = "Stickman Archer";
      description = "Draw your bowstring and take down stickman enemies!";
      category = "Action";
      thumbnail = "https://picsum.photos/seed/stickman-archer/300/200";
      embedUrl = "https://www.silvergames.com/en/embed/stickman-archer";
      tags = ["stickman", "archer", "skill"];
      isNew = true;
      isFeatured = false;
      rating = 4.3;
      playCount = 430000;
    },
    {
      id = "bullet-force";
      title = "Bullet Force";
      description = "Intense first-person multiplayer shooter with real-time battles!";
      category = "Action";
      thumbnail = "https://picsum.photos/seed/bullet-force/300/200";
      embedUrl = "https://www.crazygames.com/embed/bullet-force-multiplayer";
      tags = ["fps", "shooter", "multiplayer"];
      isNew = false;
      isFeatured = true;
      rating = 4.7;
      playCount = 980000;
    },
    {
      id = "zombie-shooter";
      title = "Zombie Shooter";
      description = "Survive endless waves of the undead in this top-down shooter!";
      category = "Action";
      thumbnail = "https://picsum.photos/seed/zombie-shooter/300/200";
      embedUrl = "https://html5.gamedistribution.com/5d91fc50e5f5470ca46b5d34dfbda9de/";
      tags = ["zombie", "survival", "shooter"];
      isNew = true;
      isFeatured = false;
      rating = 4.4;
      playCount = 560000;
    },
    {
      id = "ninja-run";
      title = "Ninja Runner";
      description = "Sprint, jump and slash through obstacles as a speedy ninja!";
      category = "Action";
      thumbnail = "https://picsum.photos/seed/ninja-runner/300/200";
      embedUrl = "https://html5.gamedistribution.com/a72e04c1fd24433ab80e9c3d3a2c24dd/";
      tags = ["ninja", "runner", "platform"];
      isNew = true;
      isFeatured = false;
      rating = 4.2;
      playCount = 310000;
    },
    // ── Puzzle ────────────────────────────────────────────────────────────────
    {
      id = "2048";
      title = "2048";
      description = "Slide tiles and merge numbers to reach the legendary 2048 tile!";
      category = "Puzzle";
      thumbnail = "https://picsum.photos/seed/2048-puzzle/300/200";
      embedUrl = "https://html5.gamedistribution.com/1e6c25c6a7a54b9f8261ef4e54a24b39/";
      tags = ["number", "merge", "strategy"];
      isNew = false;
      isFeatured = true;
      rating = 4.9;
      playCount = 2100000;
    },
    {
      id = "mahjong-solitaire";
      title = "Mahjong Solitaire";
      description = "Match and clear tiles in this classic Chinese tile puzzle!";
      category = "Puzzle";
      thumbnail = "https://picsum.photos/seed/mahjong/300/200";
      embedUrl = "https://html5.gamedistribution.com/b8a22a66c2064ac48f5b8cfe7e17c22f/";
      tags = ["mahjong", "classic", "match"];
      isNew = false;
      isFeatured = false;
      rating = 4.5;
      playCount = 750000;
    },
    {
      id = "bubble-shooter";
      title = "Bubble Shooter";
      description = "Aim and pop colourful bubbles to clear the board!";
      category = "Puzzle";
      thumbnail = "https://picsum.photos/seed/bubble-shooter/300/200";
      embedUrl = "https://html5.gamedistribution.com/1ba5e6439ef94e4c9e6d5e649c8a3c3e/";
      tags = ["bubble", "color", "pop"];
      isNew = false;
      isFeatured = true;
      rating = 4.6;
      playCount = 1400000;
    },
    {
      id = "tetris-classic";
      title = "Tetris Classic";
      description = "Rotate and stack falling blocks in the original puzzle legend!";
      category = "Puzzle";
      thumbnail = "https://picsum.photos/seed/tetris/300/200";
      embedUrl = "https://html5.gamedistribution.com/6e4f2c3d7a1b4e89b12c3d4e5f6a7b8c/";
      tags = ["tetris", "classic", "blocks"];
      isNew = false;
      isFeatured = true;
      rating = 4.8;
      playCount = 3000000;
    },
    {
      id = "word-search";
      title = "Word Search";
      description = "Find hidden words in a grid before time runs out!";
      category = "Puzzle";
      thumbnail = "https://picsum.photos/seed/word-search/300/200";
      embedUrl = "https://html5.gamedistribution.com/c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6/";
      tags = ["words", "search", "brain"];
      isNew = true;
      isFeatured = false;
      rating = 4.1;
      playCount = 280000;
    },
    {
      id = "jigsaw-classic";
      title = "Jigsaw Puzzles";
      description = "Assemble beautiful jigsaw puzzles across many themes!";
      category = "Puzzle";
      thumbnail = "https://picsum.photos/seed/jigsaw/300/200";
      embedUrl = "https://html5.gamedistribution.com/f1e2d3c4b5a6978867564534221100ff/";
      tags = ["jigsaw", "relax", "picture"];
      isNew = false;
      isFeatured = false;
      rating = 4.3;
      playCount = 390000;
    },
    // ── Racing ────────────────────────────────────────────────────────────────
    {
      id = "moto-x3m";
      title = "Moto X3M";
      description = "Race a stunt bike through wild obstacle courses!";
      category = "Racing";
      thumbnail = "https://picsum.photos/seed/moto-x3m/300/200";
      embedUrl = "https://html5.gamedistribution.com/7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d/";
      tags = ["bike", "stunt", "race"];
      isNew = false;
      isFeatured = true;
      rating = 4.7;
      playCount = 1100000;
    },
    {
      id = "road-fury";
      title = "Road Fury";
      description = "Dodge traffic and destroy enemy cars in this highway racer!";
      category = "Racing";
      thumbnail = "https://picsum.photos/seed/road-fury/300/200";
      embedUrl = "https://html5.gamedistribution.com/2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e/";
      tags = ["car", "highway", "dodge"];
      isNew = true;
      isFeatured = false;
      rating = 4.4;
      playCount = 460000;
    },
    {
      id = "drift-boss";
      title = "Drift Boss";
      description = "Master the art of drifting around endless island corners!";
      category = "Racing";
      thumbnail = "https://picsum.photos/seed/drift-boss/300/200";
      embedUrl = "https://html5.gamedistribution.com/3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f/";
      tags = ["drift", "car", "endless"];
      isNew = true;
      isFeatured = true;
      rating = 4.5;
      playCount = 670000;
    },
    {
      id = "formula-rush";
      title = "Formula Rush";
      description = "High-speed F1-inspired racing with tight corners and boost zones!";
      category = "Racing";
      thumbnail = "https://picsum.photos/seed/formula-rush/300/200";
      embedUrl = "https://html5.gamedistribution.com/4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a/";
      tags = ["formula", "speed", "race"];
      isNew = false;
      isFeatured = false;
      rating = 4.2;
      playCount = 320000;
    },
    {
      id = "truck-simulator";
      title = "Truck Simulator";
      description = "Haul massive loads across challenging mountain roads!";
      category = "Racing";
      thumbnail = "https://picsum.photos/seed/truck-simulator/300/200";
      embedUrl = "https://html5.gamedistribution.com/5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b/";
      tags = ["truck", "simulator", "cargo"];
      isNew = false;
      isFeatured = false;
      rating = 4.0;
      playCount = 210000;
    },
    // ── Sports ────────────────────────────────────────────────────────────────
    {
      id = "basketball-stars";
      title = "Basketball Stars";
      description = "Challenge real players in 1v1 basketball showdowns!";
      category = "Sports";
      thumbnail = "https://picsum.photos/seed/basketball-stars/300/200";
      embedUrl = "https://html5.gamedistribution.com/6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c/";
      tags = ["basketball", "1v1", "sports"];
      isNew = false;
      isFeatured = true;
      rating = 4.6;
      playCount = 890000;
    },
    {
      id = "soccer-skills";
      title = "Soccer Skills Champion";
      description = "Dribble, shoot and score in this addictive football game!";
      category = "Sports";
      thumbnail = "https://picsum.photos/seed/soccer-skills/300/200";
      embedUrl = "https://html5.gamedistribution.com/7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d/";
      tags = ["soccer", "football", "kick"];
      isNew = true;
      isFeatured = false;
      rating = 4.4;
      playCount = 540000;
    },
    {
      id = "tennis-open";
      title = "Tennis Open";
      description = "Compete in grand-slam style tennis with precise swing controls!";
      category = "Sports";
      thumbnail = "https://picsum.photos/seed/tennis-open/300/200";
      embedUrl = "https://html5.gamedistribution.com/8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e/";
      tags = ["tennis", "serve", "rally"];
      isNew = false;
      isFeatured = false;
      rating = 4.1;
      playCount = 270000;
    },
    {
      id = "bowling-king";
      title = "Bowling King";
      description = "Roll perfect strikes in this ultra-realistic 3D bowling game!";
      category = "Sports";
      thumbnail = "https://picsum.photos/seed/bowling-king/300/200";
      embedUrl = "https://html5.gamedistribution.com/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f/";
      tags = ["bowling", "strike", "spin"];
      isNew = false;
      isFeatured = true;
      rating = 4.5;
      playCount = 620000;
    },
    {
      id = "golf-masters";
      title = "Golf Masters";
      description = "Sink hole-in-ones on stunning resort courses worldwide!";
      category = "Sports";
      thumbnail = "https://picsum.photos/seed/golf-masters/300/200";
      embedUrl = "https://html5.gamedistribution.com/0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a/";
      tags = ["golf", "putt", "course"];
      isNew = true;
      isFeatured = false;
      rating = 4.3;
      playCount = 350000;
    },
    // ── Adventure ─────────────────────────────────────────────────────────────
    {
      id = "adventure-land";
      title = "Adventure Land";
      description = "Explore vast dungeons, craft gear and battle fierce monsters!";
      category = "Adventure";
      thumbnail = "https://picsum.photos/seed/adventure-land/300/200";
      embedUrl = "https://html5.gamedistribution.com/1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b/";
      tags = ["rpg", "explore", "crafting"];
      isNew = false;
      isFeatured = true;
      rating = 4.7;
      playCount = 760000;
    },
    {
      id = "dragon-quest";
      title = "Dragon Quest";
      description = "Embark on an epic quest to slay dragons and save the kingdom!";
      category = "Adventure";
      thumbnail = "https://picsum.photos/seed/dragon-quest/300/200";
      embedUrl = "https://html5.gamedistribution.com/2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c/";
      tags = ["dragon", "quest", "fantasy"];
      isNew = true;
      isFeatured = false;
      rating = 4.5;
      playCount = 490000;
    },
    {
      id = "pirate-seas";
      title = "Pirate Seas";
      description = "Sail the seven seas, loot treasure and battle rival pirates!";
      category = "Adventure";
      thumbnail = "https://picsum.photos/seed/pirate-seas/300/200";
      embedUrl = "https://html5.gamedistribution.com/3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d/";
      tags = ["pirate", "sea", "treasure"];
      isNew = false;
      isFeatured = true;
      rating = 4.6;
      playCount = 580000;
    },
    {
      id = "jungle-escape";
      title = "Jungle Escape";
      description = "Swing through vines and outsmart traps in a treacherous jungle!";
      category = "Adventure";
      thumbnail = "https://picsum.photos/seed/jungle-escape/300/200";
      embedUrl = "https://html5.gamedistribution.com/4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e/";
      tags = ["jungle", "platform", "escape"];
      isNew = true;
      isFeatured = false;
      rating = 4.2;
      playCount = 290000;
    },
    {
      id = "space-explorer";
      title = "Space Explorer";
      description = "Navigate asteroid fields and discover alien worlds in deep space!";
      category = "Adventure";
      thumbnail = "https://picsum.photos/seed/space-explorer/300/200";
      embedUrl = "https://html5.gamedistribution.com/5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f/";
      tags = ["space", "sci-fi", "explore"];
      isNew = false;
      isFeatured = false;
      rating = 4.3;
      playCount = 370000;
    },
    // ── Casual ────────────────────────────────────────────────────────────────
    {
      id = "snake-classic";
      title = "Snake Classic";
      description = "Guide your growing snake and eat pellets without hitting yourself!";
      category = "Casual";
      thumbnail = "https://picsum.photos/seed/snake-classic/300/200";
      embedUrl = "https://html5.gamedistribution.com/d93f6cfb2b7a4e04893a6c90d4f7a1bc/";
      tags = ["snake", "classic", "retro"];
      isNew = false;
      isFeatured = false;
      rating = 4.4;
      playCount = 1800000;
    },
    {
      id = "solitaire";
      title = "Solitaire";
      description = "Classic Klondike solitaire — stack cards and clear the tableau!";
      category = "Casual";
      thumbnail = "https://picsum.photos/seed/solitaire-cards/300/200";
      embedUrl = "https://html5.gamedistribution.com/8b88d89ca7284bec9e76e81dc1f48cba/";
      tags = ["cards", "classic", "solitaire"];
      isNew = false;
      isFeatured = true;
      rating = 4.5;
      playCount = 2500000;
    },
    {
      id = "stack-builder";
      title = "Stack Builder";
      description = "Tap to stack blocks perfectly and build the highest tower!";
      category = "Casual";
      thumbnail = "https://picsum.photos/seed/stack-builder/300/200";
      embedUrl = "https://html5.gamedistribution.com/a72e04c1fd24433ab80e9c3d3a2c24dd/";
      tags = ["stack", "tap", "tower"];
      isNew = true;
      isFeatured = false;
      rating = 4.3;
      playCount = 680000;
    },
    {
      id = "flappy-bird";
      title = "Flappy Bird";
      description = "Tap to flap and squeeze through gaps between pipes — how far can you go?";
      category = "Casual";
      thumbnail = "https://picsum.photos/seed/flappy-bird/300/200";
      embedUrl = "https://html5.gamedistribution.com/6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a/";
      tags = ["flappy", "bird", "one-tap"];
      isNew = false;
      isFeatured = false;
      rating = 4.2;
      playCount = 3200000;
    },
    {
      id = "candy-crush-style";
      title = "Candy Blast";
      description = "Match 3 or more candies to blast them off the board!";
      category = "Casual";
      thumbnail = "https://picsum.photos/seed/candy-blast/300/200";
      embedUrl = "https://html5.gamedistribution.com/7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b/";
      tags = ["match3", "candy", "colorful"];
      isNew = true;
      isFeatured = true;
      rating = 4.6;
      playCount = 1500000;
    },
    {
      id = "fruit-ninja";
      title = "Fruit Slash";
      description = "Swipe and slice flying fruit while dodging deadly bombs!";
      category = "Casual";
      thumbnail = "https://picsum.photos/seed/fruit-slash/300/200";
      embedUrl = "https://html5.gamedistribution.com/8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c/";
      tags = ["fruit", "slice", "swipe"];
      isNew = false;
      isFeatured = false;
      rating = 4.4;
      playCount = 920000;
    },
    // ── Multiplayer ───────────────────────────────────────────────────────────
    {
      id = "agar-io-style";
      title = "Blob Arena";
      description = "Eat smaller blobs to grow and dominate the arena!";
      category = "Multiplayer";
      thumbnail = "https://picsum.photos/seed/blob-arena/300/200";
      embedUrl = "https://html5.gamedistribution.com/9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d/";
      tags = ["io", "blob", "grow"];
      isNew = false;
      isFeatured = true;
      rating = 4.7;
      playCount = 2200000;
    },
    {
      id = "slither-style";
      title = "Snake Rivals";
      description = "Trap opponents with your snake body to eliminate them!";
      category = "Multiplayer";
      thumbnail = "https://picsum.photos/seed/snake-rivals/300/200";
      embedUrl = "https://html5.gamedistribution.com/0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e/";
      tags = ["snake", "io", "rival"];
      isNew = true;
      isFeatured = false;
      rating = 4.5;
      playCount = 1700000;
    },
    {
      id = "battle-royale-io";
      title = "Battle Royale.io";
      description = "Last survivor wins — loot weapons and shrink the zone!";
      category = "Multiplayer";
      thumbnail = "https://picsum.photos/seed/battle-royale-io/300/200";
      embedUrl = "https://html5.gamedistribution.com/1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f/";
      tags = ["battle royale", "io", "survival"];
      isNew = true;
      isFeatured = true;
      rating = 4.6;
      playCount = 1300000;
    },
    {
      id = "tank-trouble";
      title = "Tank Trouble";
      description = "Navigate maze-like arenas and blast opponent tanks!";
      category = "Multiplayer";
      thumbnail = "https://picsum.photos/seed/tank-trouble/300/200";
      embedUrl = "https://html5.gamedistribution.com/2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a/";
      tags = ["tank", "maze", "local"];
      isNew = false;
      isFeatured = false;
      rating = 4.3;
      playCount = 840000;
    },
    {
      id = "krunker-io";
      title = "Krunker.io";
      description = "Pixelated multiplayer FPS with fast-paced online matches!";
      category = "Multiplayer";
      thumbnail = "https://picsum.photos/seed/krunker-io/300/200";
      embedUrl = "https://html5.gamedistribution.com/3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b/";
      tags = ["fps", "io", "pixel"];
      isNew = false;
      isFeatured = true;
      rating = 4.8;
      playCount = 3100000;
    },
    // ── Girls ─────────────────────────────────────────────────────────────────
    {
      id = "princess-dress-up";
      title = "Princess Dress Up";
      description = "Design stunning outfits for your favourite princess!";
      category = "Girls";
      thumbnail = "https://picsum.photos/seed/princess-dress-up/300/200";
      embedUrl = "https://html5.gamedistribution.com/4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c/";
      tags = ["dress-up", "princess", "fashion"];
      isNew = false;
      isFeatured = false;
      rating = 4.4;
      playCount = 960000;
    },
    {
      id = "makeup-artist";
      title = "Makeup Artist";
      description = "Create gorgeous looks with hundreds of makeup tools and styles!";
      category = "Girls";
      thumbnail = "https://picsum.photos/seed/makeup-artist/300/200";
      embedUrl = "https://html5.gamedistribution.com/5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d/";
      tags = ["makeup", "beauty", "creative"];
      isNew = true;
      isFeatured = true;
      rating = 4.5;
      playCount = 1050000;
    },
    {
      id = "cooking-mama";
      title = "Cooking Fever";
      description = "Cook and serve delicious meals before your customers lose patience!";
      category = "Girls";
      thumbnail = "https://picsum.photos/seed/cooking-fever/300/200";
      embedUrl = "https://html5.gamedistribution.com/6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e/";
      tags = ["cooking", "time-management", "food"];
      isNew = false;
      isFeatured = true;
      rating = 4.6;
      playCount = 1200000;
    },
    {
      id = "pet-vet";
      title = "Pet Vet Hospital";
      description = "Heal adorable animals and run your very own pet clinic!";
      category = "Girls";
      thumbnail = "https://picsum.photos/seed/pet-vet/300/200";
      embedUrl = "https://html5.gamedistribution.com/7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f/";
      tags = ["pet", "vet", "cute"];
      isNew = true;
      isFeatured = false;
      rating = 4.3;
      playCount = 480000;
    },
    {
      id = "barbie-fashion";
      title = "Fashion Nova";
      description = "Mix and match the latest fashion trends to create stunning outfits!";
      category = "Girls";
      thumbnail = "https://picsum.photos/seed/fashion-nova/300/200";
      embedUrl = "https://html5.gamedistribution.com/8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a/";
      tags = ["fashion", "style", "dress-up"];
      isNew = false;
      isFeatured = false;
      rating = 4.2;
      playCount = 690000;
    },
    {
      id = "ice-cream-shop";
      title = "Ice Cream Shop";
      description = "Scoop, decorate and serve ice cream to a queue of hungry customers!";
      category = "Girls";
      thumbnail = "https://picsum.photos/seed/ice-cream-shop/300/200";
      embedUrl = "https://html5.gamedistribution.com/9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b/";
      tags = ["ice cream", "cooking", "kids"];
      isNew = true;
      isFeatured = false;
      rating = 4.4;
      playCount = 520000;
    },
  ];

  // Build a map from the seed array for fast ID lookups
  public func buildGameMap() : Map.Map<GameId, Game> {
    let m = Map.empty<GameId, Game>();
    for (game in SEED_GAMES.vals()) {
      m.add(game.id, game);
    };
    m;
  };

  public func getAllGames(games : Map.Map<GameId, Game>) : [Game] {
    games.values().toArray();
  };

  public func getGamesByCategory(games : Map.Map<GameId, Game>, category : Text) : [Game] {
    let lower = category.toLower();
    games.values().filter(func(g) { g.category.toLower() == lower }).toArray();
  };

  public func getFeaturedGames(games : Map.Map<GameId, Game>) : [Game] {
    games.values().filter(func(g) { g.isFeatured }).toArray();
  };

  public func getNewGames(games : Map.Map<GameId, Game>) : [Game] {
    games.values().filter(func(g) { g.isNew }).toArray();
  };

  func tagsContain(tags : [Text], lower : Text) : Bool {
    for (tag in tags.vals()) {
      if (tag.toLower().contains(#text lower)) return true;
    };
    false;
  };

  public func searchGames(games : Map.Map<GameId, Game>, searchTerm : Text) : [Game] {
    let lower = searchTerm.toLower();
    games.values().filter(
      func(g) {
        g.title.toLower().contains(#text lower) or
        g.description.toLower().contains(#text lower) or
        g.category.toLower().contains(#text lower) or
        tagsContain(g.tags, lower)
      }
    ).toArray();
  };

  public func getGameById(games : Map.Map<GameId, Game>, id : GameId) : ?Game {
    games.get(id);
  };

  public func getCategories() : [Text] { CATEGORIES };
};
