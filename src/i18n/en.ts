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
      electoralSystem: 'Electoral system',
      electoralSystemValues: {
        proportional: 'Proportional',
        firstPastThePost: 'First past the post',
      },
      usedAsDistrict: 'Used as a district',
      usedAsDistrictValues: {
        gmina: 'Gmina',
        district: 'Electoral district'
      },
      seatDistribution: 'Seat distribution',
      seatDistributionValues: {
        dHondt: 'd\'Hondt method',
        SainteLague: 'Sainte-Laguë method',
        HuntingtonHill: 'Huntington-Hill method',
      },
      numberOfSeats: 'Number of seats in the Sejm',
      useRealSeats: 'Use real seats distribution',
      realSeatsExplanation: {
        wrongData: 'Explanation: Seat distribution among districts used during that election was different than what it should be based on the election law. If "@:{\'pl.sejm.useRealSeats\'}" is checked, the app will use the real seat distribution.',
        lackOfData: 'Explanation: The app does not have valid population data for the given year, uses the number of people eligible to vote instead. If "@:{\'pl.sejm.useRealSeats\'}" is checked, the app will use the real seat distribution.',
      },
      mainThreshold: 'Electoral threshold',
      coalitionThreshold: 'Threshold for alliances',
      nationalMinorityThreshold: 'Threshold for national and ethnic minorities',
      partyName: 'Party',
      partyAbbreviation: 'Abbr',
      partySeats: 'Seats',
    },
  },
};
