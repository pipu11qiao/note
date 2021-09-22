function BNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

// 别动
/*
              4
        2          7
     1     3    5    8
 */

//
function getBaseNode() {
    const map = {};
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(num => {
        map[`n-${num}`] = new BNode(num);
    })
    map['n-4'].left = map['n-2'];
    map['n-4'].right = map['n-7'];

    map['n-2'].left = map['n-1'];
    map['n-2'].right = map['n-3'];

    // map['n-1'].left = map['n-9']

    map['n-7'].left = map['n-5'];
    map['n-7'].right = map['n-8'];

    // map['n-8'].right = map['n-10']

    return map['n-4'];
}

function getOneNode() {
    const map = {};
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(num => {
        map[`n-${num}`] = new BNode(num);
    })
    map['n-4'].left = map['n-2'];
    map['n-4'].right = map['n-7'];

    map['n-2'].left = map['n-1'];
    map['n-2'].right = map['n-3'];

    // map['n-1'].left = map['n-9']

    map['n-7'].left = map['n-5'];
    map['n-7'].right = map['n-8'];

    // map['n-8'].right = map['n-10']

    return map['n-4'];
}


module.exports = {
    BNode,
    getOneNode,
}
