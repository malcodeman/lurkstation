beforeEach(() => {
  cy.visit(`/`);
});

describe("Index page", () => {
  it("Search input", () => {
    cy.get("[data-cy=search-input]")
      .clear()
      .type("pics{enter}")
      .should("have.value", "pics");
  });
  it("Color mode", () => {
    cy.get("[data-cy=user-menu-button]").click();
    cy.get("[data-cy=color-mode-menu-item]")
      .click()
      .should(() => {
        expect(localStorage.getItem("chakra-ui-color-mode")).to.eq("dark");
      });
  });
  it("Data saver", () => {
    cy.get("[data-cy=user-menu-button]").click();
    cy.get("[data-cy=data-saver-menu-item]")
      .click()
      .should(() => {
        expect(localStorage.getItem("dataSaver")).to.eq("true");
      });
  });
  it("Mature content", () => {
    cy.get("[data-cy=user-menu-button]").click();
    cy.get("[data-cy=mature-content-menu-item]")
      .click()
      .should(() => {
        expect(localStorage.getItem("matureContent")).to.eq("true");
      });
  });
  it("Time menu", () => {
    cy.get("[data-cy=top-button]").click();
    cy.get("[data-cy=time-menu-button]").should("exist");
  });
  it("Time menu - hour", () => {
    cy.get("[data-cy=top-button]").click();
    cy.get("[data-cy=time-menu-button]").click();
    cy.get("[data-cy=hour-menu-item").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/art/top?t=hour`);
  });
  it("Time menu - day", () => {
    cy.get("[data-cy=top-button]").click();
    cy.get("[data-cy=time-menu-button]").click();
    cy.get("[data-cy=day-menu-item").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/art/top?t=day`);
  });
  it("Time menu - week", () => {
    cy.get("[data-cy=top-button]").click();
    cy.get("[data-cy=time-menu-button]").click();
    cy.get("[data-cy=week-menu-item").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/art/top?t=week`);
  });
  it("Time menu - month", () => {
    cy.get("[data-cy=top-button]").click();
    cy.get("[data-cy=time-menu-button]").click();
    cy.get("[data-cy=month-menu-item").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/art/top?t=month`);
  });
  it("Time menu - year", () => {
    cy.get("[data-cy=top-button]").click();
    cy.get("[data-cy=time-menu-button]").click();
    cy.get("[data-cy=year-menu-item").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/art/top?t=year`);
  });
  it("Time menu - all", () => {
    cy.get("[data-cy=top-button]").click();
    cy.get("[data-cy=time-menu-button]").click();
    cy.get("[data-cy=all-menu-item").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/art/top?t=all`);
  });
  it("Go to post", () => {
    cy.get("[data-cy=post]").first().click();
    cy.url().should("include", "/art/comments/");
  });
  it("Post - go back", () => {
    cy.get("[data-cy=post]").first().click();
    cy.get("[data-cy=x-icon]").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
  it("Posts grid", () => {
    cy.get("[data-cy=posts-grid]")
      .children()
      .should("have.length.at.least", 10);
  });
});
