

export type PlayerSetup = {
  //This is an array of an array of factions for each player
  //eg. faction 1 - ["Russia", "Turkey"]
  //  faction 2 - ["Germany", "Austria"]
  //  players array: [["Russia", "Turkey"], ["Germany", "Austria"]]
  readonly players: ReadonlyArray<ReadonlyArray<string>>;

  //Same as players but for the auto characters that just hold every round
  readonly auto: ReadonlyArray<ReadonlyArray<string>>;
}