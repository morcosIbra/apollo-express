import { GET_CART_ITEMS } from "../../../../utils/launches";

const addOrRemoveFromCart = (_, { id }, { cache }) => {
    const queryResult = cache.readQuery({
        query: GET_CART_ITEMS
    });

    if (queryResult) {
        const { cartItems } = queryResult;
        const data = {
            cartItems: cartItems.includes(id)
                ? cartItems.filter(i => i !== id)
                : [...cartItems, id]
        };

        cache.writeQuery({ query: GET_CART_ITEMS, data });
        return data.cartItems;
    }
    return [];
}

export default { addOrRemoveFromCart }