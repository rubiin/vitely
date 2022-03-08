context('Basic', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('basic nav', () => {
    cy.url().should('eq', 'http://localhost:4000/');
    cy.contains('h1', 'Hello 👋 there, welcome to vitely');
  });

  it('should go to links', () => {
    const pages = [
      {
        name: 'VSCode',
        url: 'https://code.visualstudio.com/',
      },
      {
        name: 'Volar',
        url: 'https://github.com/johnsoncodehk/volar',
      },
      {
        name: 'Vetur',
        url: 'https://marketplace.visualstudio.com/items?itemName=octref.vetur',
      },
      {
        name: 'Rubiin',
        url: 'https://github.com/rubiin',
      },
    ];

    pages.forEach(page => {
      cy.contains(page.name).should('have.prop', 'href', page.url);
    });
  });
});
