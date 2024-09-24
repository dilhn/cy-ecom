class cartpage {
  verify_cart_details(title, qty) {
    cy.contains("tr.woocommerce-cart-form__cart-item td", title)
      .closest("tr") // Go up to the closest <tr> (the row containing the <td>)
      .within(() => {
        cy.get("td[data-title='Product']")
          .invoke("text")
          .then((text) => {
            expect(text.trim()).to.equal(title);
          });
        cy.get(`input[value="${qty}"]`).should("exist"); // Assert that the input exists
      });
  }
}
export const cart = new cartpage();
