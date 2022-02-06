const styles= require('../styles');

module.exports= {
    error: message => console.log(styles.colors.red, message),
    message: message => console.log(styles.colors.green, message),
}