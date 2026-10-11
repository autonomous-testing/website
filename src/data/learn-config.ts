// Values for wopee.io/learn that change without a redesign.

export const learnConfig = {
  /** YouTube id of the evergreen series intro. Empty = the intro block is hidden. */
  introVideoId: "",
  /** Thumbnail shown before the intro video plays; empty = YouTube's own. */
  introPoster: "/img/learn/intro-poster.png",
  /** HubSpot form behind "Notify me". Today the site newsletter form; swap for a learners form. */
  notifyFormId: "307c72af-1a09-45b0-90d0-21e73ec2cbc3",
  /**
   * HubSpot form for /learn/teams with the contact properties learn_source, learn_team_size and learn_goal.
   */
  teamsFormId: "4eb5eff0-9b5c-4b6b-9bfd-d538d61d06ac",
  t1: {
    /**
     * Launch flag, the one switch for T1 going live: marks T1 live on /learn,
     * shows the navbar "Learn" item (docusaurus.config.js) and the homepage band.
     */
    launched: false,
    /** YouTube id of T1 part 1 ("Green is not correct", about 3 min). */
    videoId: "",
    /** HubSpot form for the certificate email gate. Empty = "opens at launch" note. */
    certFormId: "",
  },
};
