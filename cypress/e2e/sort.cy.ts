describe("Sorting function", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should sort movies", () => {
    // Assign
    const omdbInput = cy.get("input#searchText").should("exist");
    const omdbSort = cy.get("button#sort").should("exist");
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 200,
      fixture: "unsorted_movies.json",
    });

    // Act
    omdbInput.type("Man{enter}");
    omdbSort.click();

    // Assert
    cy.get("div#movie-container").children().should("have.length", 10);
    cy.get("div#movie-container").children().should("contain.text", "Man");
    // cy.get("div#movie-container")
    //   .children()
    //   .first()
    //   .should("contain.text", "Anchorman Man");
    // cy.get("div#movie-container")
    //   .children()
    //   .last()
    //   .should("contain.text", "Zoolander Man");
  });
});
