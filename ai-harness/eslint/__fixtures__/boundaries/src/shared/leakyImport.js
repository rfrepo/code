// VIOLATION: shared must never import from a feature
import { cartTotal } from '../features/cart/cartTotal';

export const describeCart = () => `Total: ${cartTotal([])}`;
