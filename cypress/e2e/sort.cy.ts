describe("Sorting function", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should sort movies by title ascending by default", () => {
    // Assign
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 200,
      fixture: "sorted_movies.json", // Mock data med förutsägbar sortering
    });

    // Act
    cy.get("#searchText").type("test{enter}");

    // Assert
    cy.get("#movie-container .movie h3")
      .should("have.length.greaterThan", 1)
      .first()
      .should("contain.text", "A"); // Första filmen börjar med A

    cy.get("#movie-container .movie h3").last().should("contain.text", "Z"); // Sista filmen börjar med Z
  });
});
