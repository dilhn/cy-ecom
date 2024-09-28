class cartpage {
  elements = {
    table_row_cart_item: "tr.woocommerce-cart-form__cart-item",
    table_data_title: "td[data-title='Product']",
    table_data_qty: "td[data-title='Quantity']",
  };

  verify_cart_details(title, qty) {
    cy.contains(this.elements.table_row_cart_item, title)
      .closest("tr") // Go up to the closest <tr> (the row containing the <td>)
      .within(() => {
        // Check the product title
        cy.get(this.elements.table_data_title)
          .should("be.visible")
          .invoke("text")
          .then((text) => {
            expect(text.trim()).to.equal(title);
          });
        //cy.get(this.elements.table_data_qty(qty)).should("exist"); // Assert that the input exists
        // Check the quantity
        cy.get(this.elements.table_data_qty)
          .find("input")
          .should("be.visible")
          .invoke("val")
          .then((value) => {
            expect(value).to.equal(qty);
          });
      });
  }
}
export const cart = new cartpage();
