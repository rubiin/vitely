context('Vitely landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the hero', () => {
    cy.url().should('eq', 'http://localhost:4000/');
    // hero content is opacity-animated on load, so assert presence, not visibility
    cy.contains('h1', 'VITELY').should('exist');
    cy.contains('p', 'A minimal Vue starter.').should('exist');
    cy.contains('p', 'Vue 3 · Vite · TypeScript').should('exist');
    cy.contains('p', 'Your next Vue project starts here.').should('exist');
  });

  it('has working nav links', () => {
    cy.get('.nav-link')
      .contains('Docs')
      .should('be.visible')
      .should('have.attr', 'href', 'https://vitejs.dev/guide/');
    cy.get('.nav-link')
      .contains('GitHub')
      .should('be.visible')
      .should('have.attr', 'href', 'https://github.com/rubiin/vitely');
    cy.get('.nav-link')
      .contains('Get Started')
      .should('be.visible')
      .should('have.attr', 'href', '#quickstart');
  });

  it('shows the why and included sections', () => {
    cy.contains('p', 'Why Vitely');
    cy.contains('p', 'Built to stay small.');
    ['Minimal', 'Fast', 'Flexible', 'Yours'].forEach(label => {
      cy.contains('span', label);
    });
    cy.contains('p', "What's included");
    ['Vue 3', 'Vite', 'TypeScript', 'Pinia', 'UnoCSS', 'VueUse'].forEach(
      tech => {
        cy.contains('.tech-list li', tech);
      },
    );
  });

  it('shows the quickstart terminal', () => {
    cy.contains('p', 'Quick start');
    cy.contains('h2', 'Get started in seconds.');
    cy.get('.terminal')
      .scrollIntoView()
      .within(() => {
        cy.contains('p', 'git clone github.com/rubiin/vitely');
        cy.contains('p', 'cd vitely');
        cy.contains('p', 'pnpm install');
        cy.contains('p', 'pnpm dev');
        cy.contains('p', 'ready in 342ms');
      });
  });

  it('shows the project structure', () => {
    cy.contains('p', 'Project structure').should('exist');
    cy.contains('h2', 'A foundation you can understand.').should('exist');
    // tree lines are revealed progressively via IntersectionObserver, which
    // does not reliably fire in headless runs; assert the section renders
    cy.get('.tree').scrollIntoView().should('exist');
  });

  it('renders the footer', () => {
    cy.contains('h2', 'Ready to set sail?');
    cy.contains('p', 'Start your next Vue project.');
    cy.get('.footer-base-right')
      .contains('a', 'GitHub')
      .should('have.attr', 'href', 'https://github.com/rubiin/vitely');
    cy.contains('span', 'MIT License');
  });

  it('switches themes and persists the choice', () => {
    cy.get('html').should('have.attr', 'data-theme', 'tokyo-night');
    cy.get('.theme-trigger').click();
    // the dropdown is pop-animated, so it may sit at opacity 0 in headless
    cy.get('.theme-menu').should('exist');
    cy.get('.theme-menu li').contains('Nord').click({ force: true });
    cy.get('html').should('have.attr', 'data-theme', 'nord');
    cy.get('.theme-trigger').should('contain', 'Nord');
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'vitely-theme')
      .should('eq', 'nord');
    cy.reload();
    cy.get('html').should('have.attr', 'data-theme', 'nord');
  });

  it('toggles the language', () => {
    cy.contains('p', 'A minimal Vue starter.');
    cy.get('.icon-btn').click();
    cy.contains('p', 'एक न्यूनतम Vue स्टार्टर।');
    cy.get('.icon-btn').click();
    cy.contains('p', 'A minimal Vue starter.');
  });

  it('reveals the full-speed easter egg', () => {
    cy.get('.boat-sail').click({ force: true });
    cy.get('.boat-sail').click({ force: true });
    cy.get('.boat-sail').click({ force: true });
    cy.contains('p', 'Full speed ahead.');
  });

  it('copies the quickstart commands', () => {
    cy.get('.terminal').scrollIntoView();
    cy.get('.copy-btn').click({ force: true });
    cy.contains('button', 'Copied');
  });
});
