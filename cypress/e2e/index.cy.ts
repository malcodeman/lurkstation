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
});
