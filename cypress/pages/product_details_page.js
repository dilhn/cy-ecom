class productdetailspage {
  elements = {
    label_title: "div.entry-summary > h1.entry-title",
    text_price: "div.entry-summary > p",
    textbox_change_qty: "input[type='number']",
    btn_add_to_cart: "button[name='add-to-cart']",
    btn_view_cart: ".woocommerce-message > a.wc-forward",
  };

  verify_product_title(rptitle) {
    // -- Verify that randomly selected product's title
    // on the store is equal to the selected product's title on product details page
    cy.get(this.elements.label_title)
      .should("be.visible")
      .and("contain.text", rptitle);
  }

  verify_product_price(rpprice) {
    // -- Verify that randomly selected product's price
    // on the store is equal to the selected product's price on product details page
    cy.get(this.elements.text_price)
      .find("bdi")
      .last()
      .should("be.visible")
      .and("contain.text", rpprice);
  }

  verify_product_qty(count) {
    cy.get(this.elements.textbox_change_qty).should("have.value", count);
  }

  adjust_product_quantity(count) {
    // -- click uparrow and increase product quantity 'n' times depending on count
    for (let i = 0; i < count; i++) {
      cy.get(this.elements.textbox_change_qty).type("{uparrow}");
    }
  }
  click_add_to_cart_btn() {
    // -- click 'add to cart' Button for the product
    cy.get(this.elements.btn_add_to_cart).click();
  }
  click_view_cart_btn() {
    // click view cart button
    cy.get(this.elements.btn_view_cart).should("be.visible").click();
  }

  get_product_details() {
    let details = {};
    return cy
      .get(this.elements.label_title)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        details.title = text;
        return cy
          .get(this.elements.textbox_change_qty)
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
