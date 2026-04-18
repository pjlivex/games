module {
  public type GameId = Text;

  public type Game = {
    id : GameId;
    title : Text;
    description : Text;
    category : Text;
    thumbnail : Text;
    embedUrl : Text;
    tags : [Text];
    isNew : Bool;
    isFeatured : Bool;
    rating : Float;
    playCount : Nat;
  };
};
