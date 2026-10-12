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
   * Empty = the newsletter form, with those values in the submission's page URL.
   */
  teamsFormId: "",
  t1: {
    /**
     * Launch flag, the one switch for T1 going live: marks T1 live on /learn,
     * shows the navbar "Learn" item (docusaurus.config.js) and the homepage band.
     */
    launched: false,
  },
};
