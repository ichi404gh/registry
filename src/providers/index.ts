import { StripeProvider } from "./stripe";
import { ShopifyProvider } from "./shopify";
import { NetsuiteProvider } from "./netsuite";
import { RampProvider } from "./ramp";
import { KlaviyoProvider } from "./klaviyo";
import { FlexportProvider } from "./flexport";
import { ShipbobProvider } from "./shipbob";

export default {
  stripe: new StripeProvider(),
  shopify: new ShopifyProvider(),
  netsuite: new NetsuiteProvider(),
  ramp: new RampProvider(),
  flexport: new FlexportProvider(),
  klaviyo: new KlaviyoProvider(),
  shipbob: new ShipbobProvider(),
};
