import { GET_CART_ITEMS } from "../../../utils/launches";

const isInCart = (launch, _, { cache }) => {
    const queryResult = cache.readQuery({
        query: GET_CART_ITEMS
    });

    if (queryResult) {
        return queryResult.cartItems.includes(launch.id);
    }
    return false;
}

export default { isInCart };