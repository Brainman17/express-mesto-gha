const regexAvatarLink = /((?:https?:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i;
const regexLink = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

module.exports = {
  regexAvatarLink, regexLink
}