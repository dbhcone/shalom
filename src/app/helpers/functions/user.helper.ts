export class UserAccountHelper {
    generateUsername(name: Name): string {
        let generatedname = '';
        const { firstName, surname, otherNames } = name;
        if (firstName && surname && otherNames) {
            generatedname = `${firstName}${otherNames.substring(0, 1)}.${surname}`;
        } else if (firstName && surname) {
            generatedname = `${firstName}.${surname}`;
        }
        return generatedname.toLowerCase();
    }

    getFullName(name: Name): string {
        const { firstName, surname, otherNames } = name;
        if (!otherNames) {
            return `${surname?.toUpperCase()} ${firstName}`;
        }
        return `${surname?.toUpperCase()} ${otherNames?.substr(0, 1).toUpperCase()}. ${firstName}`;
    }
}

interface Name {
    surname?: string;
    firstName?: string;
    otherNames?: string;
}
