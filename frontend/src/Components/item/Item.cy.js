import React from "react";
import Item from "./Item";

describe("<Item />", () => {
  const mockItem = {
    price: 22,
    itemName: "Blueberry Muffin",
    batchQuantity: 12,
  };

  it("renders", () => {
    cy.mount(<Item food={mockItem} />);
  });

  it("should default to 0", () => {
    cy.mount(<Item food={mockItem} />);
    cy.get("[data-cy=counter]").should("have.text", "0");
  });

  it("should increase when add button is pressed", () => {
    cy.mount(<Item food={mockItem} />);
    cy.get("[data-cy=increase-btn]").click();
    cy.get("[data-cy=counter]").should("have.text", "1");
  });

  it("should decrease when decrease button is pressed", () => {
    cy.mount(<Item food={mockItem} />);
    cy.get("[data-cy=increase-btn]").click();
    cy.get("[data-cy=increase-btn]").click();
    cy.get("[data-cy=decrease-btn]").click();
    cy.get("[data-cy=counter]").should("have.text", "1");
  });

  it("should change text when button is clicked", () => {
    cy.mount(<Item food={mockItem} />);
    cy.get("[data-cy=basket-btn]").should("have.text", "Add to Basket");
  });

  it("should say in basket when button is clicked", () => {
    cy.mount(<Item food={mockItem} />);
    cy.get("[data-cy=basket-btn]").click();
    cy.get("[data-cy=basket-btn]").should("have.text", "In Basket");
  });
});
