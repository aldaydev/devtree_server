import request from "supertest";
import app from "../src/server";

// Función reutilizable para llamar al endpoint /auth/register
const publicUserDataRequest = async (username: string = "initial") => {

    const res = await request(app)
        .get(`/${username}`)

    return res;
};

describe("GET /:user", () => {

    it('Debe retornar status 200 y los datos públicos del usuario', async() => {
        
        const res = await publicUserDataRequest();

        expect(res.status).toBe(200);
        expect(res.body.username).toBe("initial");
        expect(res.body.description).toBe("");
    })


    it('Debe retornar status 404 y un mensaje si el usuario no existe', async() => {
        
        const res = await publicUserDataRequest("noExiste");

        expect(res.status).toBe(404);
        expect(res.body).toBe('El usuario no existe');
    })
})