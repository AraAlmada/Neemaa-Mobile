appContext.factory('UserProfilService',function($http){
  return {
    getUser: {
      'firstname': 'Dupont',
      'lastname': 'Jean',
      'email': 'jean.dupont@gmail.com',
      'tel': '0699129912',
      'adress': '7 avenue des arts',
      'cp': '94100',
      'birsthdate': '14/11/1990',
      'SkinType': [
        'Normal',
        'Sèche',
        'Mixte',
        'Grasse',
        'Grasse à tendance acnéique',
        'Hyper pigmentée'
      ],
      'SkinColor': [
        '#fbd3d1',
        '#f2b8ad',
        '#edc192',
        '#d9ae7b',
        '#C0946F',
        '#9C6C44',
        '#7F553D',
        '#674230',
        '#4A2F24',
        '#3C1F0F',
        '#2E2520'
      ],
      'HairType': [
        'Cheveux raide',
        'Ondulé',
        'Bouclés-frisé',
        'Crépus'
      ],
      'HairColor': [
        'Noir',
        'Châtain foncée',
        'Châtain',
        'Châtain clair',
        'Blond foncée',
        'Blond clair',
        'Blond trés clair',
        'Roux'
      ]
    }
  }
});
