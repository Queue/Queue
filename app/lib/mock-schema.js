//
// Mock data schema for reference

// Queuer customer schema
QueuerSchema = {
  name: String,
  partySize: Number,
  phoneNumber: String,
  notes: String,
  userId: String,
  signedInAt: String,
  seatedAt: String,
  waitTime: String,
  activity: {
    texted: Boolean,
    seated: Boolean,
    deleted: Boolean,
    cancelled: Boolean,
    old: Boolean
  }
}

// User Profile
UserSchema = {
  name: String,
  businessName: String,
  brandingURL: String,
  creditCard: { // not sure I need this stored with the user
    name: String,
    cardNumber: Number,
    expirationDate: String,
    securityCode: Number
  }
  activity: {
    texts: Number, // texts per payment cycle
    paid: Boolean,
    cancelled: Boolean,
    cancelledAt: String,
    old: Boolean
  }
}
