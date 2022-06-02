export const validate = (form) => {
    let errors = {};
    if (!form.name) {
      errors.name = 'Name required';
    } else if (!form.released) {
      errors.released = 'Release date is required';
    } else if (!form.rating) {
      errors.rating = 'The rating is required';
    } else if (form.rating > 5) {
      errors.rating = 'The rating cannot be higher than 5';
    } else if (form.rating < 0) {
      errors.rating = 'The rating cannot be lower than 0';
    } else if (!form.genres) {
      errors.genres = 'At least one genre is required';
    } else if (!form.platforms) {
      errors.platforms = 'At least one platform is required';
    } else if (!form.description) {
        errors.description = 'Description is required';
    }
  
    return errors;
};