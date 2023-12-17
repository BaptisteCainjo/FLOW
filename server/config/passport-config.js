import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

export function initPassport(passport, getUserByEmail, getUserById) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (!user) {
          return done(null, false, {
            message: "Aucun utilisateur à cet email",
          });
        }

        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Mot de passe incorrect",
            });
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
}

export default initPassport;
