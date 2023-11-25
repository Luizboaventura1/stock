export const formRules = {
  productRules: [
    (value) => {
      if (value.length >= 3) return true;

      return errorMessages.minLength;
    },
    (value) => {
      if (value.length <= 20) return true;

      return errorMessages.maxLength;
    },
  ],

  valueRules: [
    (value) => {
      if (value.length <= 50) return true;

      return "Maximum 50 characters";
    },
  ],

  weightRules: [
    (value) => {
      if (value.length <= 50) return true;

      return "Maximum 50 characters";
    },
  ],

  quantityRules: [
    (value) => {
      if (value.length > 0) return true;

      return errorMessages.minLength;
    },
  ],
};

const errorMessages = {
  maxLength: "Maximum length of 20 caracters!",
  minLength: "Minimum length of 3 caracters!",
  onlyNumbers: "Only numbers!",
  fillInCorrectly: "Fill in correctly!"
};
