import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportJwt from "passport-jwt";
import { Request, Response, Express } from "express";
import { Connection } from "typeorm";
import { User } from "./entity/User";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function (email, password, callback) {
    return 
}))

export default async function setupPassport(server: Express, connection: Connection) {
    const userRepo = connection.getRepository(User);
    passport.use(new JwtStrategy(opts, function(payload, done) {
        userRepo.findOne(payload.id)
    }))
    passport.use('local', new LocalStrategy(
        async function(email: string, password: string, done: Function) {
            const user = await userRepo
        }
    ))
}