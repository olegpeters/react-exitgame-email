let emails = [
  {
    id: 1,
    labelId: 1,
    from: 'Emma Thompson',
    subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    time: "22:08"
  },
  {
    id: 2,
    labelId: 1,
    from: 'Olivia Jefferson',
    subject: 'Stet clita kasd gubergren',
    text: 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    time: "19:12"
  },
  {
    id: 3,
    labelId: 1,
    from: 'Mike Conley',
    subject: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    time: "18:35"
  },
  {
    id: 4,
    labelId: 2,
    from: 'Test',
    subject: 'Das Passwort ist die Antwort auf alles',
    text: 'Das Passwort ist die Antwort auf alles',
    time: "14:05"
  },
  {
    id: 5,
    labelId: 1,
    from: 'Michael Neal',
    subject: '',
    text: '<video width="860" height="620" controls><source src="/Kofferraum.mp4" type="video/mp4">Your browser does not support the video tag. </video>',
    time: "14:05"
  }
];
let secretToken = "thisIsAVerySecureTokenGeneratedByABrainAfterEatingSomeSaltedFries";
let restoreData = {
  email: "inkognito@securemail.com",
  birthdate: "01.01.1970",
  pet: "Cat",
  city: "Paris",
};

exports.findMails = function (req, res, next) {
  if (req.query.token === secretToken) {
    res.send(emails);
  } else {
    res.status(400).send("Current token does not match");
  }
};

exports.forgotPassword = function (req, res, next) {
  var email = req.body.email;
  var birthdate = req.body.birthdate;
  var pet = req.body.pet;
  var city = req.body.city;
  if (email && email.toLowerCase() === restoreData.email.toLowerCase() &&
    birthdate && birthdate.toLowerCase() === restoreData.birthdate.toLowerCase() &&
    pet && pet.toLowerCase() === restoreData.pet.toLowerCase() &&
    city && city.toLowerCase() === restoreData.city.toLowerCase()) {
    res.send(secretToken);
  } else {
    res.status(400).send("Invalid password reset data");
  }
};