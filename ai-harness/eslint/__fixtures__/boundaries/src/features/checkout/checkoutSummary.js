// VIOLATION: feature → other feature
import { cartTotal } from '../cart/cartTotal';
// OK: feature → same feature
import { taxRate } from './taxRate';

export const checkoutSummary = (prices) => `${cartTotal(prices)} (VAT ${taxRate})`;
