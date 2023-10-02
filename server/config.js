function environment(){
    if(process.env.NODE_ENV === 'development')
        return 'development'
}   

module.exports = environment