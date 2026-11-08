# Using the currency converter

Our custom version of this feature was removed in favor of Shopify’s own [Multi-Currency](https://help.shopify.com/en/manual/payments/shopify-payments/multi-currency/setup) and [Multi-Language](https://help.shopify.com/en/manual/sell-online/multilingual-online-store) features.

Before Shopify [launched their own built-in multi-currency feature](https://help.shopify.com/en/manual/payments/shopify-payments/multi-currency/setup), our themes included their own that allowed customers to see what products will cost in their local currency. In order to set this feature up, you will need to make some changes to your currency formatting.

You’ll need to adjust your currency format in the Shopify admin area, specifically under **Settings** > **Store details** > **Store currency**.

Click on Change formatting on the right side.

<figure><img src="../.gitbook/assets/image (49).png" alt=""><figcaption></figcaption></figure>

Then change the format of the first two fields to the following:

<figure><img src="../.gitbook/assets/image (50).png" alt=""><figcaption></figcaption></figure>

Shopify has an official guide for doing this that you can [find here](https://help.shopify.com/manual/using-themes/troubleshooting/help-script-find-money-formats) if you need a more thorough walkthrough.

> Note: if you have switched your price formatting to omit decimal places by using **\{{ amount\_no\_decimals \}}**, you will need to switch back to **\{{ amount \}}** for the currency conversion to perform accurately.
