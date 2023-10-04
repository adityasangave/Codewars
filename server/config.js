function environment(){
    if(process.env.NODE_ENV === 'development')
        return {
            "PORT" : 8000,
        }
}   

module.exports = environment