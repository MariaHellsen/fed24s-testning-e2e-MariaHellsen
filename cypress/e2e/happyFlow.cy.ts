describe("Movie search happy flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show empty list", () => {
    cy.get("div#movie-container").children().should("have.length", 0);
  });

  it("should show positiv results for valid movie", () => {
    //Assign
    const omdbInput = cy.get("input#searchText").should("exist");
    const searchButton = cy.get("button#search").should("exist");
    //Act
    omdbInput.type("Star");
    searchButton.click();
    //Assert
    cy.get("div#movie-container")
      .children()
      .should("have.length.greaterThan", 0);
    cy.get("div#movie-container").children().should("contain.text", "Star");
  });
  it("should show positiv results for for title with numbers", () => {
    //Assign
    const omdbInput = cy.get("input#searchText").should("exist");
    const searchButton = cy.get("button#search").should("exist");
    //Act
    omdbInput.type("1");
    searchButton.click();
    //Assert
    cy.get("div#movie-container")
      .children()
      .should("have.length.greaterThan", 0);
    cy.get("div#movie-container").children().should("contain.text", "1");
  });

  it("should show positiv results for for title with numbers", () => {
    //Assign
    const omdbInput = cy.get("input#searchText").should("exist");
    const searchButton = cy.get("button#search").should("exist");
    //Act
    omdbInput.type("001");
    searchButton.click();
    //Assert
    cy.get("div#movie-container")
      .children()
      .should("have.length.greaterThan", 0);
    cy.get("div#movie-container").children().should("contain.text", "001");
  });
});
