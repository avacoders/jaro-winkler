$("#submit").click(function () {
    var word1 = $("#word1").val()
    var word2 = $("#word2").val()
    $("#result").text(getPercent(word1, word2))
    $("#m").text(findM(makeArr(word1,word2)))
    $("#t").text(getT(makeArr(word1, word2)))
    $("#x").text(getX(word1, word2))
    $("#l").text(getL(word1, word2))
    $("#dj").text(getDJ(word1, word2).toFixed(3))

})


function getWords(sentences) {
    var array = []
    for (let i = 0; i < sentences.length; i++) {
        var arr = sentences[i].split(' ')
        for (let j = 0; j < arr.length; j++)
            if (arr[j])
                array.push(arr[j])
    }
    return array
}

function getArr(word1, word2) {
    var val = []
    for (let i = 0; i <= word1.length; i++) {
        var arr = []
        for (let j = 0; j <= word2.length; j++)
            arr.push(j)
        if (i === 0)
            val.push(arr)
        else
            val.push([i])
    }
    return val
}

function easySolution(word1, word2) {
    var myArr = getArr(word1, word2)
    for (let i = 0; i < myArr.length - 1; i++) {
        var innerArr = myArr[i]
        for (let j = 1; j < innerArr.length; j++) {
            if (word1[j - 1] === word2[i])
                myArr[i + 1][j] = Math.min(...[myArr[i][j - 1], myArr[i][j], myArr[i + 1][j - 1]])
            else myArr[i + 1][j] = Math.min(...[myArr[i][j - 1], myArr[i][j], myArr[i + 1][j - 1]]) + 1
        }
    }
    return myArr[word1.length][word2.length]
}

function getPercent(word1, word2) {
    var DJ = getDJ(word1, word2)
    var l = getL(word1, word2)
    return DJ + l * 0.1 * (1 - DJ)
}


function getX(word1, word2) {
    return parseInt(Math.max(...[word1.length, word2.length]) / 2) - 1
}

function getT(matrix) {
    var t = 0
    for (let row = 0; row < matrix.length; row++) {
        var innerArr = matrix[row]
        for (let column = 0; column < innerArr.length; column++) {
            if (column === row && !matrix[row][column])
                t++
        }
    }
    return t / 2

}

function getDJ(word1, word2) {
    var arr = makeArr(word1, word2)
    var t = getT(arr)
    var m = findM(arr)
    if (m !== 0) {
        return 1 / 3 * (m / word1.length + m / word2.length + (m - t) / m)
    } else
        return 0
}

function getL(word1, word2) {
    var l = 0
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] === word2[i])
            l++
        else break
    }
    return l
}

function makeArr(word1, word2) {
    var val = []
    var x = getX(word1, word2)
    for (let i = 0; i < word1.length; i++) {
        var arr = []
        for (let j = 0; j < word2.length; j++) {
            arr.push(word1[i] === word2[j] && Math.abs(i - j) <= x)
        }
        val.push(arr)
    }
    val = removeFalse(val)
    return val
}

function removeFalse(val) {
    var myArr = removeEmpties(val)
    myArr = transpose(myArr)
    myArr = removeEmpties(myArr)
    myArr = transpose(myArr)
    return myArr
}


function transpose(matrix) {
    var arr = []
    for (let row = 0; row < matrix.length; row++) {
        var innerArr = matrix[row]
        for (let column = 0; column < innerArr.length; column++) {
            if (row === 0)
                arr.push([])
            arr[column].push(matrix[row][column])
        }
    }
    return arr
}

function removeEmpties(val) {
    var myArr = []
    for (let i = 0; i < val.length; i++) {
        var arr = val[i]
        if (elemInArr(true, arr)) {
            myArr.push(arr)
        }
    }
    return myArr
}


function findM(matrix) {
    var m = 0;
    for (let row = 0; row < matrix.length; row++)
        for (let column = 0; column < matrix[row].length; column++)
            if(matrix[row][column])
                m++
    return m
}

function elemInArr(element, array) {
    for (let i = 0; i < array.length; i++)
        if (element === array[i])
            return true
    return false
}



