import Types "types/common";
import GamesLib "lib/games";
import GamesApi "mixins/games-api";
import Map "mo:core/Map";

actor {
  let games : Map.Map<Types.GameId, Types.Game> = GamesLib.buildGameMap();

  include GamesApi(games);
};
