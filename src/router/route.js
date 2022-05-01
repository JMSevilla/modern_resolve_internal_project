import AuthenticationRoute from "./authroute"
export const appRouter = { 
    Homepage : {path : "/"},
    Registration : {path : "/registration"},
    Platform : {path : "/dev/platform" + AuthenticationRoute.hashedURL(100)}
}

