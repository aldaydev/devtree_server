import request from "supertest";
import app from "../src/server";

// Función reutilizable para llamar al endpoint /auth/register
const searchUserRequest = async (username = "initial") => {

    const res = await request(app)
        .post("/search")
        .send({
            username
        })
        .set("Accept", "application/json");

    return res;
};

describe("POST /search", () => {

    it('Deberá devolver error 400 y un mensaje si no hay "username"', async () => {

        const res = await searchUserRequest("");

        const msg = res.body.find((el: { path: string }) => el.path === 'username').msg;

        expect(res.status).toBe(400);
        expect(msg).toBe('El nombre de usuario no puede estar vacío');
        
    })

    

})