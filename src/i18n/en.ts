export default {
  app: {
    title: 'Elections Simulator',
    language: {
      en: 'English',
      pl: 'Polski / Polish',
    },
    viewSelector: {
      prefix: 'Polish elections to the Sejm in',
      afterYear: '',
    },
  },
  pl: {
    sejm: {
      numberOfSeats: 'Number of seats in the Sejm',
      useRealSeats: 'Use real seats distribution',
      realSeatsExplanation: 'Explanation: Seat distribution among districts used during that election was different than what it should be based on the election law.',
      mainThreshold: 'Electoral threshold',
      coalitionThreshold: 'Threshold for alliances',
      nationalMinorityThreshold: 'Threshold for national and ethnic minorities',
    },
  },
};
