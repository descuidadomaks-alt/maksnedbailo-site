/**
 * /score, per-question answer reactions.
 *
 * One short, in-voice line per option (32 total, 8 questions x 4 options).
 * Shown for ~850ms after a choice is made, in the slot where the "← Back"
 * link normally sits (see QuestionScreen.tsx), before auto-advancing.
 */
export const ANSWER_REACTIONS: string[][] = [
  // Q1, 9pm lead response
  [
    "That's the bar. Most founders aren't there yet.",
    "Solid, most leads will wait that long.",
    "That's a 12-hour head start for whoever answers first.",
    "That's not a gap. That's an open door.",
  ],
  // Q2, deals waiting on you
  [
    "Clean pipeline. Rare, and worth noting.",
    "Manageable, for now.",
    "That's real revenue, parked.",
    "That's a queue with your name on every item.",
  ],
  // Q3, hours/week on questions the team could handle
  [
    "Tight. That's how it should be.",
    "A few hours a week, it adds up over a year.",
    "That's basically a part-time job you didn't sign up for.",
    "That's a full day a week, gone to questions.",
  ],
  // Q4, two weeks away
  [
    "Genuinely, that's the goal.",
    "Survivable. But it shows.",
    "Two weeks is a long time to put everything on hold.",
    "That uncertainty is the bottleneck, right there.",
  ],
  // Q5, decisions per day
  [
    "That's exactly where founder time should go.",
    "A normal day, with a long tail.",
    "That's a decision every half hour, minimum.",
    "If you've lost count, so has everyone waiting on you.",
  ],
  // Q6, last real holiday
  [
    "Good. That's a system working, not a luxury.",
    "A year's a while, worth asking why.",
    "That's not dedication. That's a single point of failure.",
    "Noted. We'll come back to that.",
  ],
  // Q7, AI experience
  [
    "Good, that's further than most.",
    "Common. Usually a process problem, not a tool problem.",
    "That's a setup problem, not an AI problem. Fixable.",
    "No shame, just don't let 'later' become 'never'.",
  ],
  // Q8, revenue band (qualification, not scored)
  [
    "Good to know, we'll keep that in mind.",
    "That's exactly the size where bottlenecks start to bite.",
    "At this size, an hour of your time is worth more than you think.",
    "At this scale, small leaks become large numbers.",
  ],
];
