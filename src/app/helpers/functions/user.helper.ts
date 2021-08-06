export class UserAccountHelper {
  generateUsername(name: Name): string {
    let generatedname = '';
    const { firstName, surname, otherNames } = name;
    if (firstName != '' && surname != '' && otherNames != '') {
      generatedname = `${firstName}${otherNames.substring(
        0,
        1
      )}${surname.substring(0, 3)}`;
    } else if (firstName != '' && surname != '') {
      generatedname = `${firstName}${surname.substring(0, 3)}`;
    }
    return generatedname.toLowerCase();
  }
}

interface Name {
  surname: string;
  firstName: string;
  otherNames: string;
}
