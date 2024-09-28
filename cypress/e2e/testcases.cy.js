import { home } from "../pages/home_page";
import { store } from "../pages/store_page";
import { productdetails } from "../pages/product_details_page";
import { cart } from "../pages/cart_page";

describe("test e-com web", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("can search products on store", () => {
    home.click_shopnow_button();
    store.type_and_search("blue");
    store.click_search_button();
    store.verify_search_results_include_search_text("blue");
    store.verify_search_result_count();
  });

  it("can filter by product categories on store", () => {
    home.click_shopnow_button();
    store.select_random_filter();
    store.verify_filter_count();
  });

  it("can verify product info on store and details are the same", () => {
    home.click_shopnow_button();
    store.get_random_product_info().then((productInfo) => {
      store.click_random_product(productInfo.index);
      productdetails.verify_product_title(productInfo.title);
      productdetails.verify_product_price(productInfo.price);
    });
  });

  it("can adjust quantity and add to cart on product details", () => {
    const initQty = 1;
    const qtyInc = 1;

    home.get_featured_product_count().then((index) => {
      home.click_random_featured_product(index);
    });
    productdetails.verify_product_qty(initQty);
    productdetails.adjust_product_quantity(qtyInc);
    productdetails.verify_product_qty(initQty + qtyInc);
    productdetails.click_add_to_cart_btn();

    productdetails.get_product_details().then((details) => {
      productdetails.click_view_cart_btn();
      cart.verify_cart_details(details.title, details.qty);
    });
  });
});
