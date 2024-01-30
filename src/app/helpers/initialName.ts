export function initialName(text: string) {
  let firstName = "";
  let lastName = "";

  const fullName = text.split(" ");

  firstName = text[0];

  if (fullName.length > 1) {
    lastName = fullName[1][0];
    return `${firstName}${lastName}`
  }

  return `${firstName}`

}
