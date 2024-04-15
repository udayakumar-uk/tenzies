const Dies = [
    {id: 1, value: getRandom(), isTrigger: false},
    {id: 2, value: getRandom(), isTrigger: false},
    {id: 3, value: getRandom(), isTrigger: false},
    {id: 4, value: getRandom(), isTrigger: false},
    {id: 5, value: getRandom(), isTrigger: false},
    {id: 6, value: getRandom(), isTrigger: false},
    {id: 7, value: getRandom(), isTrigger: false},
    {id: 8, value: getRandom(), isTrigger: false},
    {id: 9, value: getRandom(), isTrigger: false},
    {id: 10, value: getRandom(), isTrigger: false}
];


function getRandom(){
    return Math.floor(Math.random() * 6) + 1; 
}

export default Dies;