export default (context, inject) => {
  const avtName = (name) => {
    let names = name.split(' ');
    if (names.length > 1) {
      return names[0].charAt(0).toUpperCase() + names.at(-1).charAt(0).toUpperCase()
    }
    return names[0].charAt(0).toUpperCase()
  }

  const longName = (text, length = 40) => {
    if (text == null) {
      return "";
    }
    if (text.length <= length) {
      return text;
    }
    text = text.substring(0, length);
    let last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
  }

  const errorMessage = (error) => {
    let index = error.indexOf("(");
    if (index > 0) {
      return error.substring(0, index);
    }
  }

  inject('avtName', avtName)
  inject('longName', longName)
  inject('errorMessage', errorMessage)
}
