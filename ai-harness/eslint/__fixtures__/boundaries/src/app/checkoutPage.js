// OK: app → feature and app → shared (app is the glue layer)
import { checkoutSummary } from '../features/checkout/checkoutSummary';
import { formatPrice } from '../shared/formatPrice';

export const renderCheckoutPage = () => `${checkoutSummary([1000])} — ${formatPrice(0)}`;
