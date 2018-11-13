

function getRandomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
};
  
function createAndPopulateArray(length, callback) {
    return Array(length).fill().map(() => callback());
};

function clone(array) {
    return array.slice(0, array.length);
};

function carouselArray(array, m) {
    const n = m % array.length;
    return n >= 0
        ? array.slice(n, array.length).concat(array.slice(0, n))
        : array.slice(array.length + n, array.length).concat(array.slice(0, array.length + n))
};

function flattenArray(array) {
    return [].concat.apply([], array);
};

module.exports = {
    getRandomArrayItem,
    createAndPopulateArray,
    clone,
    carouselArray,
    flattenArray
}