# North Star Bakery website plan

## Client, audience, and tone

The supplied logo names the client North Star Bakery. The pages welcome bakery visitors who want to browse breads and pastries, learn about the shop, or ask about an order. The copy is warm, plainspoken, and avoids unsupported claims about recipes, location, hours, prices, and availability.

## Page outline and media

- **index.html — Home:** Brand logo and shared navigation; short welcome; responsive bakery-case image (`picture` with small and large supplied images); links to products and contact; welcome audio with browser fallback text.
- **products.html — Breads & pastries:** Product overview; supplied signature-loaf photo inside a `figure` with a caption; additional bakery display image; link to ask about current selection.
- **about.html — About North Star:** Brief introduction centered on everyday sharing; supplied storefront image; route back to products and contact.
- **contact.html — Contact & orders:** Inquiry form with labeled name, email, topic, and message fields; `fieldset`, `legend`, and built-in required/email/minimum-length validation. The form uses a placeholder action because no receiving service was supplied.

Each page has one `h1`, a consistent unordered-list navigation with relative links, and semantic `header`, `nav`, `main`, and `footer` elements. All four pages share the external `styles.css` design system; no JavaScript is used.

## Requirement checklist

| Requirement | Page and description |
|---|---|
| Two images with meaningful alt text | *index.html:** The responsive bake*ry-case image describes the freshly baked cookies and pastries on display. **products.html:** The signature-loaf image describes the flour-dusted round loaf. **about.html** also describes the bakery storefront. These descriptions help visitors who cannot see the images understand what is shown. |
| One figure with figcaption | **products.html:** The signature loaf is wrapped in a `figure` with a caption describing it as a hearty, crusty loaf for sharing at the table. |
| One responsive image using `picture` and `source` | **index.html:** A `picture` element uses a `source` for the smaller supplied bakery image at narrow viewport widths and the larger image otherwise, keeping the bakery display useful across screen sizes. |
| One audio or video element with fallback content | **index.html:** The welcome audio lets visitors hear a bakery greeting. Fallback text explains what to do if their browser cannot play the audio. |
| One complete HTML form | **contact.html:** Visitors can enter their name, email, inquiry topic, and message to ask about products or an order. |
| Fieldset and legend grouping related inputs | **contact.html:** A `fieldset` groups the inquiry controls, and its `legend` identifies the group as a message to North Star Bakery. |
| Built-in validation attributes | **contact.html:** Name, email, topic, and message are required; the email input uses `type="email"`, and the message has `minlength="10"`. These checks catch missing or malformed information before submission. |
| `lang` attribute on the `html` element | **All four pages:** Each document uses `<html lang="en">`, identifying the page language for browsers and assistive technology. |
| Semantic header, nav, main, and footer on all pages | **All four pages:** Each page uses `header`, `nav`, `main`, and `footer` to organize the bakery identity and navigation, page content, and shared closing links. |


## Visual design system

The shared styles.css uses a cream (#FFF8F0), brown (#6B3E26), peach (#D88C5A), and charcoal (#2F2A26) palette, with Georgia for headings and Arial for body copy. Repeated navigation, headings, sections, images, audio, forms, and footers share consistent spacing and treatments. Layout starts with narrow screens in mind; Flexbox wraps the navigation and footer, and a wider-screen media query increases spacing for larger viewports.



## Interactive behavior

On `products.html`, visitors can filter the offerings by bread or pastry. The selected category is saved in `localStorage` and restored when the page opens again. On `contact.html`, JavaScript checks required fields, email format, and message length, displays field-level feedback, and explains that the sample form does not send inquiries because no receiving service is configured.
