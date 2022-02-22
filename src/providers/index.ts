import { StripeProvider } from "./stripe";
import ramp from "./ramp";

export default {
  stripe: new StripeProvider(),
  ramp,
};
