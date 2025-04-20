function createResult(error, data) {
    if(data){
        return createSuccessResult(data)
    }
    else{
        return createErrorResult(error)
    }
}

function createErrorResult(error){
    return {
        status: 'error',
        error
    }
}

function createSuccessResult(data){
    return {
        status: 'success',
        data
    }
}

module.exports = { createErrorResult, createResult, createSuccessResult }