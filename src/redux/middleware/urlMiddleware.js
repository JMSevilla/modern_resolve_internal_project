export const baseURLMiddleware = { 
    userURL : "/api/user.php",
    checkuserURL : "mdrusers/usercheck",
    loginURL : "/api/login.php",
    tokenizationURL : "/api/tokenization.php",
    signoutURL : "/api/signout.php",
    branchURL : "/api/platform.php",
    tokenRouteUpdater : "/api/tokenizationRouteUpdater.php",
    UAMPostdev : "/api/usermanagement.php",
    UAMGetdev : "/api/uamlist.php"
}

export function baseURLMiddlewareHelper(uri, callback) {
    const setBack = uri;
    return `${setBack}/${callback}`
}