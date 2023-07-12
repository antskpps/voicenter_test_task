describe('Login page', () => {
  const user = {
    email: 'pespatron@gmail.com',
    password: 'harnaUkrainkaJa',
  };

  beforeEach(() => {
    cy.visit('/login')
    cy.wait(300);
  })

  it('should provide an ability to log in with valid credits', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);
    
    cy.findByPlaceholder('*********')
      .type(user.password);

    cy.get('.m-auto')
      .click();

    cy.get('.min-h-screen')
      .should('contain', 'Hello my dear friend, Kozache(ko)')
  })

  it('should not provide an ability to log in with invalid email', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type('email@gmail.com');
    
    cy.findByPlaceholder('*********')
      .type(user.password);

    cy.get('.m-auto')
      .click();

    cy.get('.min-h-screen')
      .should('contain', 'No such user');
  })

  it('should not provide an ability to log in with invalid password', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);
    
    cy.findByPlaceholder('*********')
      .type('123');

    cy.get('.m-auto')
      .click();

    cy.get('.min-h-screen')
      .should('contain', 'Wrong password');
  })

  it('should not provide an ability to log in with empty email field', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(' ');
    
    cy.findByPlaceholder('*********')
      .type(user.password);

    cy.get('.m-auto')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Заповніть це поле.')
    });
  })

  it('should not provide an ability to log in with empty password field', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);

    cy.get('.m-auto')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Заповніть це поле.')
    });
  })

  it('should not provide an ability to log in with one character in the password field', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);

    cy.findByPlaceholder('*********')
      .type('1');

    cy.get('.m-auto')
      .click();

    cy.get('.block')
      .should('contain', '*Це поле має бути щонайменше 3 символами!')

    cy.get('.min-h-screen')
        .should('contain', 'Wrong password');
  })

  it('should not provide an ability to log in without "@" symbol in the email field', () => {
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type('pespatrongmail.com');

    cy.findByPlaceholder('*********')
      .type(user.password);

    cy.get('.m-auto')
      .click();

    cy.get('.block')
      .should('contain', '*Це поле має бути електронною поштою')

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Please include an "@" in the emai address. "pespatronamai.com" is missing an "@".')
    });
  })

  it('should not provide an ability to log in with empty email and password fields', () => {
    cy.get('.m-auto')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Please fill in this field.')
    });
  })

  it('should provide an ability to reset the password for the registered user', () => {
    cy.get('.text-sm > .font-medium')
      .click();
    
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type(user.email);
    
    cy.get('.m-auto')
      .click();
    
    cy.get('.text-center.text-white')
      .should('contain', user.password);
  })

  it('should not provide an ability to reset the password for not registered user', () => {
    cy.get('.text-sm > .font-medium')
      .click();
    
    cy.findByPlaceholder('jane.doe@gmail.com')
      .type('no' + user.email);
    
    cy.get('.m-auto')
      .click();
    
    cy.get('.min-h-screen')
      .should('contain', 'No such user');
  })

  it('should provide an ability to go to the main page from the reset password page', () => {
    cy.get('.text-sm > .font-medium')
      .click();

    cy.get('.text-sm > .font-medium')
      .click() 
  })
});
