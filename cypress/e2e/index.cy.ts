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
});
