# How do I remove the shopping cart?

**To remove the cart icon in the header**

In the header editor, add this CSS to **CUSTOM CSS** to remove the cart icon:

```
.header-icon.action-cart {
  display: none;
}
```

That’s it, your cart icon has been disabled.

<figure><img src="../.gitbook/assets/image (56).png" alt=""><figcaption></figcaption></figure>

**To remove the ‘Add to cart’ button**

You likely won’t want the add-to-cart button on the **product page**, so open **CUSTOM CSS** in Product information editor and add this code to it:

```
.product-buy {
  display: none;
}
```

Before:

<figure><img src="../.gitbook/assets/image (57).png" alt=""><figcaption></figcaption></figure>

After

If you want to remove all ‘add-to-cart’ buttons from other pages, you can add this CSS in **Theme settings** -> **CUSTOM CSS**:

```
.form-add-to-cart {
  display: none;
}
```

Before adding CSS:

<figure><img src="../.gitbook/assets/image (59).png" alt=""><figcaption></figcaption></figure>

After

<figure><img src="../.gitbook/assets/image (60).png" alt=""><figcaption></figcaption></figure>
