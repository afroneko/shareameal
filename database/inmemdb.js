// Deze variabelen worden niet geexporteerd en kunnen dus niet
// vanuit andere bestanden gewijzigd worden. Alleen via de databasefuncties
const _userdb = []
const timeout = 500 //msec

//Dit is het object dat geëxporteerd wordt, en dus in andere JavaScript bestanden geïmporteerd kan worden
module.exports = {
  /**
   * Maak een nieuwe user aan in de database. Naam van de user moet uniek zijn
   *
   * @param {*} user De user die we toevoegen.
   * @param {*} callback De functie die ofwel een waarde ofwel een resultaat teruggeeft
   */

  createUser(user, callback) {
    console.log('createUser called')
    // We simuleren hier dat de database query 'lang' duurt, door de setteimeout
    setTimeout(() => {
      //De naam van de user moet uniek zijn
      //Controleer daarom eerst of er al een user met die naam in de _userdb zit
      if (
        user &&
        user.emailAdress &&
        _userdb.filter((item) => item.name === user.name).length > 0
      ) {
        const error = 'A user with this name already exists.'
        console.log(error)
        // roep de callback functie aan met error als resultaat, en result = undefined.
        callback(error, undefined)
      } else {
        // voeg de id toe aan de user, in de userToAdd
        const userToAdd = {
          id: id++,
          ...user,
          isActive: false,
        }

        _userdb.push(movieToAdd)
        // roep de callback aan, zonder error, maar met de nieuwe movie als result.
        callback(undefined, movieToAdd)
      }
    }, timeout)
  },
}
