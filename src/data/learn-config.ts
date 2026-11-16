// Values for wopee.io/learn that change without a redesign.

export const learnConfig = {
  /** Self-hosted series intro: static/video/<base>.mp4, -720.mp4, .vtt, -poster.webp/.jpg. Empty = the intro block is hidden. */
  introVideo: "learn-intro",
  /** YouTube id of the evergreen series intro (not used on the page yet). */
  introVideoId: "",
  /** Thumbnail shown before the intro video plays; empty = YouTube's own. */
  introPoster: "/img/learn/intro-poster.png",
  /** HubSpot "Learn – notify (wopee.io/learn)" form behind every "Email me at launch": email + hidden learn_source. */
  notifyFormId: "da95bc31-1663-4409-a08a-430b438c88b5",
  /**
   * HubSpot form for /learn/teams with the contact properties learn_source, learn_team_size and learn_goal.
   */
  teamsFormId: "4eb5eff0-9b5c-4b6b-9bfd-d538d61d06ac",
  hub: {
    /**
     * Launch flag for the hub (/learn, /learn/teams, coming-soon pages), independent of T1:
     * shows the navbar "Learn" item (desktop from 1200 px and the mobile drawer) and the
     * homepage band. Flip to true at launch; the T1 flag below implies it.
     */
    live: false,
  },
  t1: {
    /**
     * Launch flag, the one switch for T1 going live: marks T1 live on /learn.
     * Also turns on everything hub.live does.
     */
    launched: false,
  },
};

/** True once the hub is public: navbar "Learn" item and homepage band. */
export const learnHubLive = learnConfig.hub.live || learnConfig.t1.launched;
