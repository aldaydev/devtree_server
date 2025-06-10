import request from "supertest";
import app from "../src/server";

// Función reutilizable para llamar al endpoint /auth/register
const loginRequest = async (data = {}) => {
    const defaultData = {
        email: "initial@initial.es",
        password: "12345678"
    };

    const res = await request(app)
        .post("/auth/login")
        .send({
            ...defaultData,
            ...data
        })
        .set("Accept", "application/json");

    return res;
};

describe("POST /auth/login", () => {

    it('Debe retornar status 400 y un mensaje si no hay contraseña', async() => {
        
        const res = await loginRequest({password: ''});

        const msg = res.body.find((el: { path: string }) => el.path === 'password').msg;

        expect(res.status).toBe(400);
        expect(msg).toBe('La contraseña es obligatoria.');

    })

    it('Debe retornar status 400 y un mensaje si el email no tiene formato correcto', async() => {
        
        const res = await loginRequest({email: ''});

        const msg = res.body.find((el: { path: string }) => el.path === 'email').msg;

        expect(res.status).toBe(400);
        expect(msg).toBe('Email no válido');

    })

    it("Deberá responder status 400 y un mensaje si el email no existe en la BD", async () => {

        const res = await loginRequest({email: 'noexiste@noexiste.com'});

        expect(res.status).toBe(400);
        expect(res.body).toBe("Cuenta o contraseña incorrectas");
    });

    it("Deberá responder status 400 y un mensaje si la contraseña no coincide", async () => {

        const res = await loginRequest({password: 'abcdefgh'});

        expect(res.status).toBe(400);
        expect(res.body).toBe("Cuenta o contraseña incorrectas");
    });

    it("Deberá responder status 200 y devolver el token", async () => {

        const res = await loginRequest();

        const token = res.body.token;

        expect(res.status).toBe(200);
        expect(typeof token).toBe("string");
        expect(token.split('.').length).toBe(3);
    });

})