beforeEach(() => {
  cy.visit(`/`);
});

describe("Index page", () => {
  it("Search input", () => {
    cy.get("[data-testid=subreddit-input]")
      .clear()
      .type("pics{enter}")
      .should("have.value", "pics");
  });
  it("Time menu", () => {
    cy.get("[data-testid=sort-top-link]").click();
    cy.get("[data-testid=time-popover-button]").should("exist");
  });
  it("Time menu - hour", () => {
    cy.get("[data-testid=sort-top-link]").click();
    cy.get("[data-testid=time-popover-button]").click();
    cy.get("[data-testid=time-popover-panel-link-hour").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/r/Art/top?t=hour`);
  });
  it("Time menu - day", () => {
    cy.get("[data-testid=sort-top-link]").click();
    cy.get("[data-testid=time-popover-button]").click();
    cy.get("[data-testid=time-popover-panel-link-day").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/r/Art/top?t=day`);
  });
  it("Time menu - week", () => {
    cy.get("[data-testid=sort-top-link]").click();
    cy.get("[data-testid=time-popover-button]").click();
    cy.get("[data-testid=time-popover-panel-link-week").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/r/Art/top?t=week`);
  });
  it("Time menu - month", () => {
    cy.get("[data-testid=sort-top-link]").click();
    cy.get("[data-testid=time-popover-button]").click();
    cy.get("[data-testid=time-popover-panel-link-month").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/r/Art/top?t=month`);
  });
  it("Time menu - year", () => {
    cy.get("[data-testid=sort-top-link]").click();
    cy.get("[data-testid=time-popover-button]").click();
    cy.get("[data-testid=time-popover-panel-link-year").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/r/Art/top?t=year`);
  });
  it("Time menu - all", () => {
    cy.get("[data-testid=sort-top-link]").click();
    cy.get("[data-testid=time-popover-button]").click();
    cy.get("[data-testid=time-popover-panel-link-all").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/r/Art/top?t=all`);
  });
  it("Go to first post", () => {
    cy.get("[data-testid=post]").first().click();
    cy.url().should("include", `${Cypress.config().baseUrl}/r/Art/comments/`);
  });
  it("Post - x icon", () => {
    cy.get("[data-testid=post]").first().click();
    cy.url().should("include", `${Cypress.config().baseUrl}/r/Art/comments/`);
    cy.get("[data-testid=x-icon]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
  it("Post - escape key", () => {
    cy.get("[data-testid=post]").first().click();
    cy.url().should("include", `${Cypress.config().baseUrl}/r/Art/comments/`);
    cy.get("body").type("{esc}");
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
  it("Posts - length", () => {
    cy.get("[data-testid=posts-grid]")
      .children()
      .should("have.length.at.least", 10);
  });
});
