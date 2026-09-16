# Make the store demonstration-ready

## Changes
- Remove unsupported popularity, rating, sales, customer-count, tracking, and return claims throughout the site.
- Keep only clearly demonstrable product details, prices, cart calculations, and the Google Form order handoff.
- Clarify checkout as an order request rather than live payment, while retaining payment preference choices.
- Add a simple checkout progress indicator and clearer confirmation instructions so the full buying journey is easy to present.
- Verify on mobile and desktop: browse a product, select a design and quantity, add to cart, adjust the cart, enter delivery details, and open the pre-filled Google Form.

## Technical details
- Remove unused static rating/review data from the product model.
- Rename unsupported “Bestsellers” presentation to neutral “Featured” wording without breaking existing links.
- Keep customer-submitted reviews stored on the visitor’s browser; no seeded reviews will appear.
- Preserve the existing Google Form connection and browser-saved cart/wishlist behavior.
