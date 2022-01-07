function formatDate(date){
    return new Date(date).toISOString().split('T')[0]
}


module.exports = formatDate
// module.exports = (date) => new Date(date).toISOString().split('T')[0]