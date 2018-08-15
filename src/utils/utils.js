fieldIsEmpty = (str) => {
  if(!str) return true;
  return false;
}

urlIsValid = (url) => {
  const reg = /(https?:\/\/.*\.(?:png|jpg))/;
  // Returns true if url matches regex, false otherwise
  return reg.test(url)
}

// fieldsAreValid = (title, description, images) => {
//   this.setState({
//     titleErrorMsg: '',
//     descriptionErrorMsg: '',
//   });

//   let errorMessages = {};
//   let imageErrorMessages = {};
//   if(this.fieldIsEmpty(title)) {
//     errorMessages.titleErrorMsg = 'No title set';
//   }
//   if(this.fieldIsEmpty(description)) {
//     errorMessages.descriptionErrorMsg = 'No description set';
//   }
//   // if(this.fieldIsEmpty(imageUrl)) {
//   //   errorMessages.imageErrorMsg = 'No image url set';
//   // }

//   for(let i in images) {
//     console.log(images[i]);
//     if(!this.urlIsValid(images[i].url)) {
//       imageErrorMessages.imageErrorMsg = 'Invalid image url';
//     }
//   }

//   this.setState({
//     ...errorMessages,
//   })
//   if(Object.keys(errorMessages).length === 0){
//     this.setState({
//       title: '',
//       description: '',
//     })
//     return true;
//   }
//   return false;
// }