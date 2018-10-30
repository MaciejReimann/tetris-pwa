

function getRandomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
};
  
function createAndPopulateArray(length, callback) {
    return Array(length).fill().map((_, i) => callback());
};

function clone(array) {
    return array.slice(0, array.length)
};

module.exports = {
    getRandomArrayItem,
    createAndPopulateArray,
    clone
}