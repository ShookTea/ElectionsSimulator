export default {
  app: {
    title: 'Symulator Wyborczy',
    language: {
      en: 'English / Angielski',
      pl: 'Polski',
    },
    viewSelector: {
      prefix: 'Polskie wybory do Sejmu w',
      afterYear: 'roku',
    },
  },
  pl: {
    sejm: {
      electoralSystem: 'System wyborczy',
      electoralSystemValues: {
        proportional: 'Proporcjonalny',
        firstPastThePost: 'Większościowy',
      },
      usedAsDistrict: 'Użyj jako okręgu wyborczego',
      usedAsDistrictValues: {
        district: 'Okręg wyborczy',
      },
      seatDistribution: 'Dystrybucja mandatów',
      seatDistributionValues: {
        dHondt: 'Metoda d\'Hondta',
        SainteLague: 'Metoda Sainte-Laguë',
        HuntingtonHill: 'Metoda Huntingtona-Hilla',
      },
      numberOfSeats: 'Liczba miejsc w Sejmie',
      useRealSeats: 'Użyj faktycznego podziału miejsc',
      realSeatsExplanation: {
        wrongData: 'Wyjaśnienie: Podział miejsc w Sejmie między okręgami wyborczymi użyty w tych wyborach był inny niż wynikałoby to z prawa wyborczego. Jeżeli opcja "@:{\'pl.sejm.useRealSeats\'}" jest włączona, aplikacja użyje faktycznego podziału miejsc.',
        lackOfData: 'Wyjaśnienie: Aplikacja nie posiada poprawnych danych dotyczących liczby ludności w danym roku, zamiast tego używa liczby uprawnionych do głosowania. Jeżeli opcja "@:{\'pl.sejm.useRealSeats\'}" jest włączona, aplikacja użyje faktycznego podziału miejsc.',
      },
      mainThreshold: 'Próg wyborczy',
      coalitionThreshold: 'Próg wyborczy dla koalicji',
      nationalMinorityThreshold: 'Próg wyborczy dla mniejszości narodowych i etnicznych',
      partyName: 'Komitet wyborczy',
      partyAbbreviation: 'Skrót',
      partySeats: 'Mandaty',
    },
  },
};
