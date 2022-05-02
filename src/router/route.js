import authenticationRoutes from "./authroute"
export const appRouter = { 
    Homepage : {path : "/"},
    Registration : {path : "/registration"},
    devPlatform : {path : "/dev/platform" + authenticationRoutes.hashURL(100)}
}

