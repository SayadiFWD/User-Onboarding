describe("User on boar test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("adding test to input ", () => {
    cy.get('input[name="name"]').type("Ahmad").should("have.value", "Ahmad");
    cy.get("input[name='email']")
      .type("ahmad.sayadi@gmail.com")
      .should("have.value", "ahmad.sayadi@gmail.com");
    cy.get("input[name='password']")
      .type("abcd123")
      .should("have.value", "abcd123");
    cy.get("[type='checkbox']").check().should("be.checked");
    cy.get("button").click();
  });
});
