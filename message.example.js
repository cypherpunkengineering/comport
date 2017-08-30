module.exports = {
  users: 'test', // ['testGroup', 'all', 'confirmed', 'unconfirmed', 'testUser']
  templateId: 'simple', // ['simple', 'transactional']
  subject: 'Hello from Cypherpunk Privacy',
  substitutions: {
    titleText: "This is just a test",
    regularText: "I can update the template later as needed"
    // buttonText: "Don't click this", (this is only used with transactional template)
    // buttonURL: 'https://www.google.com' (this is only used with transactional template)
  }
}
