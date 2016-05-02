appContext.factory('SearchService',function($http){
  return {
    getService: function () {
      return {
        'Cheveux': [
          'Brunching sur Tissage/ extension',
          'Brunshing cheveux naturelle',
          'Chignons',
          'Coiffure Artistique',
          'Coiffure de mariage',
          'Coloration',
          'Coupe',
          'Crochets braids',
          'Défrisage',
          'Extensions de cheveux',
          'Goddess locs',
          'Lissage (Brushing, Defrisage)',
          'Locks',
          'Pose de Perruque / Lace Wig',
          'Shampoing',
          'Soins',
          'Tissages',
          'Tresses'
        ],
        'Peau': [
          'Maquillage Evenement',
          'Maquillage Quotidien'
        ],
        'Mains_Pieds': [
          'Manicure',
          'Pedicure'
        ],
        'Life_Style': [
          'Coach Fitness',
          'Consultante Image',
          'Dieteticienne',
          'Massage',
          'Personal Shopper'
        ]
      }
    }
  }
});
