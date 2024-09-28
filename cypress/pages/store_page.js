class storepage {
  elements = {
    label_header: "header > h1",
    textbox_search_field: ".woocommerce-product-search > input.search-field",
    btn_search: ".woocommerce-product-search > button",
    label_product_title: "ul.products > li > .astra-shop-summary-wrap > a > h2",
    label_product_title1: ".astra-shop-summary-wrap > a > h2",
    label_product_price: ".astra-shop-summary-wrap > .price",
    list_products: "ul.products",
    //list_products_alt: "ul.products > li",
    text_result_count: ".woocommerce-result-count",
    dropdown_product_cat: "#product_cat",
    productThumbnail: (rpi) =>
      `ul.products > li:nth-child(${rpi}) > .astra-shop-thumbnail-wrap`,
  };

  verify_header() {
    // -- verify navigation to store
    // -- is successful (by verifying header text)
    cy.get(this.elements.label_header)
      .should("be.visible")
      .and("contain.text", "Store");
  }
  type_and_search(text) {
    // -- type search criteria in search field
    cy.get(this.elements.textbox_search_field).should("be.visible").type(text);
  }
  click_search_button() {
    // -- click search button
    cy.get(this.elements.btn_search).should("be.visible").click();
  }
  verify_search_results_include_search_text(text) {
    const normalized = text.toLowerCase();
    // change search criteria to lowercase

    // -- verify ALL the search results include 'search criteria' regardless of Case
    cy.get(this.elements.label_product_title1).each(($el) => {
      cy.wrap($el)
        .invoke("text")
        .then((text) => {
          expect(text.toLowerCase()).to.include(normalized);
        });
    });
  }
  get_search_result_count() {
    return cy
      .get(this.elements.list_products)
      .children()
      .then(($children) => {
        const childCount = $children.length;
        return childCount;
      });
  }

  /*
  get_search_result_count_legacy() {
    // -- OPTIONAL to get product results 'count'
    // -- Not used anymore
    cy.get("ul.products")
      .children()
      .its("length")
      .then((sResults) => {
        cy.wrap(sResults.toString()).as("result_count");
      });
  }
    */

  verify_search_result_count() {
    // -- verify the text : 'showing all <count> results' is equal to actual search result count
    this.get_search_result_count().then((count) => {
      cy.get(this.elements.text_result_count)
        .should("be.visible")
        .and("contain.text", count);
    });
  }

  select_random_filter() {
    // -- select a random option from filters dropdown
    cy.get(this.elements.dropdown_product_cat)
      .find("option")
      .then(($options) => {
        const randomIndex =
          Math.floor(Math.random() * ($options.length - 1)) + 1; // random index excluding 0th (Select a category)
        cy.get("#product_cat").select(randomIndex);
      });
  }

  get_filter_count() {
    // -- get selected filter's count from display text
    return cy
      .get(this.elements.dropdown_product_cat)
      .should("be.visible")
      .find("option:selected")
      .invoke("text")
      .then((text) => {
        const match = text.match(/\((\d+)\)/);
        return match[1];
      });
  }

  verify_filter_count() {
    // -- verify that the product count displayed for the selected filter
    // is EQUAL to the product count displayed for search results
    this.get_search_result_count().then((count) => {
      this.get_filter_count().then((browse) => {
        expect(count.toString()).to.equal(browse);
      });
    });
  }

  get_random_product_info() {
    return cy
      .get(this.elements.list_products)
      .children()
      .then(($lis) => {
        const count = $lis.length;
        const randomIndex = Math.floor(Math.random() * count) + 1;
        // random index between 1 to maximum number of <li> elements (zero (0) is excluded)
        let productInfo = {};

        return (
          cy
            .wrap($lis)
            .eq(randomIndex - 1)
            // -1 to avoid zero-based indexing (otherwise if randomindex == 3 then li(4) will be considered)
            .within(() => {
              productInfo.index = randomIndex;
              cy.get(this.elements.label_product_title1)
                // ".astra-shop-summary-wrap > a > h2"
                .invoke("text")
                .then((title) => {
                  productInfo.title = title.trim();
                  //cy.log("TITLE IS " + productInfo.title);
                });
              cy.get(this.elements.label_product_price)
                .find("bdi")
                // use 'find' to locate <bdi> because items for sale are located as '.price > ins > .woocommerce-Price-amount > bdi'
                // other items are located as '.price > .woocommerce-Price-amount > bdi'
                .last()
                // discounted products have discounted price in last <bdi>, other products have one <bdi> anyway
                .invoke("text")
                .then((price) => {
                  productInfo.price = price.trim();
                });
            })
            .then(() => {
              return productInfo;
            })
        );
      });
  }

  click_random_product(rpi) {
    // -- Click the random product
    cy.get(this.elements.productThumbnail(rpi)).click();
  }

  /*
  click_random_product_legacy() {
    // -- Not used anymore
    cy.get("@randomProduct").then((randomProduct) => {
      //this.get_random_product_index().then((randomProduct) => {
      cy.get(
        `ul.products > li:nth-child(${randomProduct}) > .astra-shop-thumbnail-wrap`
      ).click();
    });
  }
  */

  /*
  get_random_product_index_legacy() {
    // -- Not used anymore
    // -- Select a random product index from the listed products
    cy.log("SELECT RANDOM INDEX-- ");
    return cy.get("ul.products > li").then(($lis) => {
      const count = $lis.length;
      const randomIndex = Math.floor(Math.random() * count) + 1;
      //return randomIndex;
      cy.wrap(randomIndex).as("randomProduct");
    });
  }
    */

  /*
  get_random_product_title_legacy() {
    // -- not used anymore
    cy.get("@randomProduct").then((randomProduct) => {
      cy.get(
        `ul.products > li:nth-child(${randomProduct}) > .astra-shop-summary-wrap > a > h2`
      )
        .invoke("text")
        .then((text) => {
          //cy.log("Selected Product Title is " + text);
          cy.wrap(text).as("randomProductTitle");
        });
    });
  }
  */

  /*
  get_random_product_price_legacy() {
   // -- not used anymore
    cy.get(`ul.products > li:nth-child(${1}) .astra-shop-summary-wrap > .price`)
      .find("bdi")
      .invoke("text")
      .then((price) => {
        //cy.log("Selected Product Price is " + price);
        cy.wrap(price).as("randomProductPrice");
      });
  }
  */
}
export const store = new storepage();
