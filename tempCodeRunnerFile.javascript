const candles = [1,2,2,4, 3,3]


let max = 0, qtd = 0, prev = undefined

for (let candle of candles){

    if (candle > max){
        max = candle
        qtd = 0
}


    if (candle >= max){
        max = candle
        qtd += 1
}



}

console.log(max, qtd)