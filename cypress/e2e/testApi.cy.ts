describe("Movie search happy flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show empty list", () => {
    cy.get("div#movie-container").children().should("have.length", 0);
  });

  it("should get mock data", () => {
    const omdbInput = cy.get("input#searchText").should("exist");
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 200,
      body: {
        Search: [
          {
            Title: "Movie 1",
            imdbID: "11",
            Type: "movie",
            Poster:
              "https://plus.unsplash.com/premium_photo-1710324885040-8d043b333c31?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://plus.unsplash.com/premium_photo-1710324885040-8d043b333c31?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            Year: "1991",
          },
          {
            Title: "Movie 2",
            imdbID: "22",
            Type: "movie",
            Poster:
              "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300",
            Year: "2002",
          },
        ],
        Response: "True",
      },
    });

    //Act
    omdbInput.type("Movie{enter}");

    //Assert
    cy.get("div#movie-container").children().should("have.length", 2);
    cy.get("div#movie-container")
      .children()
      .first()
      .should("contain.text", "Movie 1");
  });
});
