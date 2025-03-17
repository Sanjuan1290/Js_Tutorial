
export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
},
]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach(option => {
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    })

    return deliveryOption || deliveryOption[0];
}

export function isWeekEnd(deliveryDate){
    let dateString = '';
    if(deliveryDate.format('dddd') === 'Saturday' || deliveryDate.format('dddd') === 'Sunday'){
        if(deliveryDate.format('dddd') === 'Saturday'){
            let isSaturday = deliveryDate.add(2, 'days');
            dateString = isSaturday.format('dddd, MMMM D')
        }else{
            let isSunday = deliveryDate.add(1, 'days');
            dateString = isSunday.format('dddd, MMMM D')
        }
    }else{
        dateString = deliveryDate.format('dddd, MMMM D')
    }

    return dateString;
}