const catchAsyncError = (theFunc) => {
  return async (req, res, next) => {
    try{
      await theFunc(req, res, next)
    }
    catch(err){
      next(err, res, res, next)
    }
  }
}
  

module.exports = catchAsyncError