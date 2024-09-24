class homepage {
  // -- click navigation link 'store' on homepage
  //cy.get("ul#ast-hf-menu-1 > li > a").contains("Store").click();

  click_shopnow_button() {
    // click 'Shop Now' button
    cy.get('a[href="/store"]').click();
  }

  click_random_featured_product_tmp() {
    // -- Click a random product from 'Featured Products'
    cy.get(
      //`ul.products > li:nth-child(${rpi}) > .astra-shop-thumbnail-wrap`
      `ul.products > li:nth-child(1) > .astra-shop-thumbnail-wrap`
    ).click();
  }

  click_random_featured_product(rpi) {
    // -- Click a random product from 'Featured Products'
    cy.get(
      `ul.products > li:nth-child(${rpi}) > .astra-shop-thumbnail-wrap`
      //`ul.products > li:nth-child(2) > .astra-shop-thumbnail-wrap`
    ).click();
  }

  get_featured_product_count() {
    return cy.get("ul.products > li").then(($lis) => {
      const count = $lis.length;
      const randomIndex = Math.floor(Math.random() * count) + 1;
      return randomIndex;
    });
  }

  // ******* COMING UP *********** //
  /*
    // -- verify cart icon amount is equal to the selected amount
    cy.get(".ast-cart-menu-wrap > span.count:visible")
      .invoke("text")
      .then((text) => {
        const cleanedText = text.replace(/\s+/g, "").trim();
        expect(cleanedText).to.eq("2");
      });
*/
  // ******* COMING UP *********** //
}
export const home = new homepage();
