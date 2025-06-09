export const ITEMS_PER_PAGE = 10;
export function discountedPrice(itme){
    return Math.round(itme.price*(1-itme.discountPercentage/100),2)
}