import _ from 'lodash';
import __ from 'lodash';

export function getSum(transaction,type){
    let sum = __(transaction)
                .groupBy("type")
                .map((objs,key)=>{
                    if(!type)return __.sumBy(objs,"amount")
                    return {
                        'type':key,
                        'color':objs[0].color,
                        'total':__.sumBy(objs,'amount')
                    }
                })
                .value()
    return sum
    
}

export function getLabels(transaction){
    let amountSum = getSum(transaction,'type');
    let totalSum = __.sum(getSum(transaction));

    let percent = __(amountSum)
                    .map(objs=>__.assign(objs,{percent:(100 * objs.total)/totalSum}))
                    .value()
    return percent
}

export function chartData(transaction,custom){

    let bg = __.map(transaction,a=>a.color)
    bg = __.uniq(bg)
    // console.log(bg)
    let dataVal = getSum(transaction);

    const config = {
        data: {
            datasets: [{
                data:dataVal,
                backgroundColor:bg,
                hoverOffset: 10,
                borderRadius:10,
                spacing:10,
                borderWidth:0,
    
            }]
        },
        options:{
            cutout:70
        }
    }

    return custom ?? config;
    
}

export function getTotal(transaction){
    return __.sum(getSum(transaction));
}