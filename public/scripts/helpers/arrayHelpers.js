

function getRandomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
};
  
function createAndPopulateArray(length, callback) {
    return Array(length).fill().map((_, i) => callback());
};

module.exports = {
    getRandomArrayItem,
    createAndPopulateArray,
}