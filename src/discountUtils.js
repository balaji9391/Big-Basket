import { toast } from "react-toastify";
import { addToCart } from "./store";





export function calculateTotal(cartItems){
    return(
        cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,0
        )
    )
}

export function calculateButtonDiscount(total,discount){
    let calcDis=total*discount/100
    return(
        calcDis
    )
}


export function getcoupondiscount(couponCode, price) {
    let discountPercentage = 0;

    switch (couponCode) {
        case "HAPPY10":
            discountPercentage = 10;
            break;
        case "FOODIE20":
            discountPercentage = 20;
            break;
        case "HELLOMAWA30":
            discountPercentage = 30;
            break;
        default:
            discountPercentage = 0;
    }

    const discountAmount = (discountPercentage * price) / 100;

    return {
        isvalid: discountPercentage > 0,
        discountAmount,
        discountPercentage,
    };
}
