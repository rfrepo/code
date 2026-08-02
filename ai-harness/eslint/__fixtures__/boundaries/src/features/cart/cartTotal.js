// OK: feature → shared
import { formatPrice } from '../../shared/formatPrice';

export const cartTotal = (prices) =>
  formatPrice(prices.reduce((sum, price) => sum + price, 0));
