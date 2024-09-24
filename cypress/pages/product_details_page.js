class productdetailspage {
  verify_product_title(rptitle) {
    // -- Verify that randomly selected product's title
    // on the store is equal to the selected product's title on product details page
    cy.get("div.entry-summary > h1.entry-title")
      .should("be.visible")
      .and("contain.text", rptitle);
  }

  verify_product_price(rpprice) {
    // -- Verify that randomly selected product's price
    // on the store is equal to the selected product's price on product details page
    cy.get("div.entry-summary > p")
      .find("bdi")
      .last()
      .should("be.visible")
      .and("contain.text", rpprice);
  }

  verify_product_qty(count) {
    cy.get('input[type="number"]').should("have.value", count);
  }

  adjust_product_quantity(count) {
    // -- click uparrow and increase product quantity 'n' times depending on count
    for (let i = 0; i < count; i++) {
      cy.get('input[type="number"]').type("{uparrow}");
    }
  }
  click_add_to_cart_btn() {
    // -- click 'add to cart' Button for the product
    cy.get("button[name='add-to-cart']").click();
  }
  click_view_cart_btn() {
    // click view cart button
    cy.get(".woocommerce-message > a.wc-forward").should("be.visible").click();
  }

  get_product_details() {
    let details = {};
    return cy
      .get("div.entry-summary > h1.entry-title")
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        details.title = text;
        return cy
          .get('input[type="number"]')
          .should("be.visible")
          .invoke("val");
      })
      .then((qty) => {
        details.qty = qty;
        return details;
      });
  }

  /*
  verify_cart_icon(cicn) {
    cy.log("expected Count Is " + cicn);
    cy.get("#ast-site-header-cart > div > a > div > span:visible")
      .invoke("text")
      .then((count) => {
        const cleanedText = count.trim().replace("\u00a0", "");

        expect(count).to.equal("0");
      });
  }
   */
}
export const productdetails = new productdetailspage();
