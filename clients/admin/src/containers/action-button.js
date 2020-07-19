import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Button from "../components/button";
import { GET_LAUNCH_DETAILS, TOGGLE_CART, CANCEL_TRIP } from "../utils/launches";

const ActionButton = ({ isBooked, id, isInCart }) => {
  const [mutate, { loading, error }] = useMutation(
    isBooked ? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: { launchId: id },
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: id }
        }
      ]
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <Button onClick={() => mutate()} data-testid={"action-button"}>
        {isBooked
          ? "Cancel This Trip"
          : isInCart
            ? "Remove from Cart"
            : "Add to Cart"}
      </Button>
    </div>
  );
};

export default ActionButton;