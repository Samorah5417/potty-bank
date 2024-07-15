const createTokenUser = (user) => {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    dob: user.dob,
    gender: user.gender,
    ssn: user.ssn,
    occupation: user.occupation,
    country: user.country,
    zip: user.zip,
    city: user.city,
    address: user.address,
    name_of_kin: user.name_of_kin,
    email_of_kin: user.email_of_kin,
    phone_of_kin: user.phone_of_kin,
    relationship_of_kin: user.relationship_of_kin,
    account_currency: user.account_currency,
    passportPhoto: user.passportPhoto,
    identification_photograph: user.identification_photograph,
    role: user.role,
    email: user.email,
    userId: user._id,
    role: user.role,
  };
};

module.exports = createTokenUser;
