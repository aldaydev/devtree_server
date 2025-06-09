import request from "supertest";
import app from "../src/server";

const registerRequest = async (data = {}) => {
    const defaultData = {
        name: "Jest",
        email: "jest@jest.es",
        username: "jest",
        password: "12345678",
    };

    const res = await request(app)
        .post("/auth/register")
        .send({
            ...defaultData,
            ...data
        })
        .set("Accept", "application/json");

    return res;
};

describe("POST /auth/register", () => {

    // it('Deberá responder status 201 y send "Registro creado correctamente" si todo es correcto', async () => {

    //     const res = await registerRequest();

    //     expect(res.status).toBe(201);
    //     expect(res.text).toBe("Registro creado correctamente");
    // });

    it("Deberá responder status 400 y un mensaje si no hay contraseña", async () => {

        const res = await registerRequest({password: ''});

        const msg = res.body.find((el: { path: string }) => el.path === 'password').msg;

        expect(res.status).toBe(400);
        expect(msg).toBe('Contraseña demasiado corta. Mínimo 8 caracteres.');

    });

    it("Deberá responder status 400 y un mensaje si no hay nombre", async () => {

        const res = await registerRequest({name: ''});

        const msg = res.body.find((el: { path: string }) => el.path === 'name').msg;

        expect(res.status).toBe(400);
        expect(msg).toBe('El nombre no puede estar vacío');

    });

    it("Deberá responder status 400 y un mensaje si no hay username", async () => {

        const res = await registerRequest({username: ''});

        const msg = res.body.find((el: { path: string }) => el.path === 'username').msg;

        expect(res.status).toBe(400);
        expect(msg).toBe('El nombre de usuario no puede estar vacío');

    });

    it("Deberá responder status 400 y un mensaje si el email es inválido", async () => {

        const res = await registerRequest({email: 'invalidEmail'});

        const msg = res.body.find((el: { path: string }) => el.path === 'email').msg;

        expect(res.status).toBe(400);
        expect(msg).toBe('Email no válido');

    });


});
