import Types "../types/common";
import GamesLib "../lib/games";
import Map "mo:core/Map";

mixin (games : Map.Map<Types.GameId, Types.Game>) {

  public query func getAllGames() : async [Types.Game] {
    GamesLib.getAllGames(games);
  };

  public query func getGamesByCategory(category : Text) : async [Types.Game] {
    GamesLib.getGamesByCategory(games, category);
  };

  public query func getFeaturedGames() : async [Types.Game] {
    GamesLib.getFeaturedGames(games);
  };

  public query func getNewGames() : async [Types.Game] {
    GamesLib.getNewGames(games);
  };

  public query func searchGames(searchTerm : Text) : async [Types.Game] {
    GamesLib.searchGames(games, searchTerm);
  };

  public query func getGameById(id : Text) : async ?Types.Game {
    GamesLib.getGameById(games, id);
  };

  public query func getCategories() : async [Text] {
    GamesLib.getCategories();
  };
};
