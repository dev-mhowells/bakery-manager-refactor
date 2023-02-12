import React from "react";
import OrderForm from "./OrderForm";

describe("<OrderForm />", () => {
  const mockOrder = {
    placeholder: "Company Name",
  };

  it("renders", () => {
    cy.mount(<OrderForm placeholder={mockOrder} />);
  });

  it("display the form with inputs", () => {
    cy.mount(<OrderForm />);
    cy.get('[data-cy="company_name"]').type("text");
    cy.get('[data-cy="order_summary"]').type("text");
  });

  it("display the form with date", () => {
    const mockdate = new Date("2022-12-24");
    cy.wrap(mockdate).should("deep.equal", new Date("2022-12-24"));
  });
});
