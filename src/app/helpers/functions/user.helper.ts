export class UserAccountHelper {
  generateUsername(name: Name): string {
    let generatedname = '';
    const { firstName, surname, otherNames } = name;
    if (firstName?.trim() != '' && surname?.trim() != '' && otherNames?.trim() != '') {
      generatedname = `${firstName}${otherNames.substring(
        0,
        1
      )}${surname.substring(0, 3)}`;
    } else if (firstName?.trim() != '' && surname?.trim() != '') {
      generatedname = `${firstName}${surname.substring(0, 3)}`;
    }
    return generatedname.toLowerCase();
  }

  getFullName(name: Name) : string {
    const {firstName, surname, otherNames} = name;
    return `${surname.toUpperCase()} ${otherNames ?.substr(0,1).toUpperCase() }. ${firstName }`
  }
}

interface Name {
  surname: string;
  firstName: string;
  otherNames: string;
}
