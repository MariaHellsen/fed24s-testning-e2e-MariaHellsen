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
  it("should show positiv results for title with numbers", () => {
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

  it("should show positiv results for title with numbers", () => {
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

  it("should show positiv results on clicking enter instead of the buttom", () => {
    //Assign
    const omdbInput = cy.get("input#searchText").should("exist");

    //Act
    omdbInput.type("Star{enter}");

    //Assert
    cy.get("div#movie-container")
      .children()
      .should("have.length.greaterThan", 0);
    cy.get("div#movie-container").children().should("contain.text", "Star");
  });

  it("should show no results on submit an empty field", () => {
    //Assign
    const omdbInput = cy.get("input#searchText").should("exist");

    //Act
    omdbInput.type("{enter}");

    //Assert
    cy.get("div#movie-container").children().should("have.length", 0);
    cy.get("div#movie-container").should(
      "contain.text",
      "Inga sökresultat att visa"
    );
  });

  it("should show no results for very short search", () => {
    //Assign
    const omdbInput = cy.get("input#searchText").should("exist");

    //Act
    omdbInput.type("A{enter}");

    //Assert
    cy.get("div#movie-container").children().should("have.length", 0);
    cy.get("div#movie-container").should(
      "contain.text",
      "Inga sökresultat att visa"
    );
  });

  it("should show no results for nonsence text", () => {
    //Assign
    const omdbInput = cy.get("input#searchText").should("exist");

    //Act
    omdbInput.type("osfikenfbshl{enter}");

    //Assert
    cy.get("div#movie-container").children().should("have.length", 0);
    cy.get("div#movie-container").should(
      "contain.text",
      "Inga sökresultat att visa"
    );
  });
});
