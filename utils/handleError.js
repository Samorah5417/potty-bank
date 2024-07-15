const handleError = (error) => {
  console.log(error);
  try {
    const errors = { email: "", password: "" };
    if(error.code) {
        console.log(error.code);
    } else {
        console.log('no code error');
    }
    if (error.code === 11000) {
      errors.email = "Email already exists";
    }


    if (
      error.message.includes("Validation failed") ||
      error.message.includes("User validation failed") 
      || error.message.includes("BuyCrypto validation failed")
      || error.message.includes("CardDeposit validation failed")
      || error.message.includes("CryptoDeposit validation failed")
      || error.message.includes("InternalTransfer validation failed")
      || error.message.includes("LocalTransfer validation failed")
      || error.message.includes("WireTransfer validation failed")
      || error.message.includes("Ticket validation failed")
      || error.message.includes("AdminTransfer validation failed")
    ) {
      Object.values(error.errors).forEach((validationError) => {
        if (validationError.properties && validationError.properties.path) {
          errors[validationError.properties.path] =
            validationError.properties.message;
          console.log(validationError.properties.path);
          console.log(errors[validationError.properties.path]);
        }
      });
    }

    return errors;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleError,
};
