import jwt from "jsonwebtoken"

export const generateJsonWebToken = (id, email) => {
    const token = jwt.sign({
        _id: id,
        email
    }, process.env.JWT_SECRET, {expiresIn: "1h"}
)
}