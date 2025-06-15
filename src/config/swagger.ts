import YAML from "yamljs";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export function setupSwagger(app: Express) {

    // ---------- GLOBAL CONFIG ---------- //
    // Definimos el documento con la configuración global de swagger
    const swaggerPath = path.join(__dirname, "../../docs/swagger.yaml");
    const baseDoc = YAML.load(swaggerPath);

    // ---------- PATH CONFIG ---------- //

    // Definimos el directorio donde irán los YAML de cada endpoint
    const pathsDir = path.join(__dirname, "../../docs/paths");

    // Recorremos todos los ficheros del directorio "paths" y los añadimos al baseDoc
    fs.readdirSync(pathsDir).forEach((file) => {
        if (file.endsWith(".yaml")) {
            const pathDoc = YAML.load(path.join(pathsDir, file));
            baseDoc.paths = { ...baseDoc.paths, ...pathDoc };
        }
    });

    // ---------- COMPONENTS CONFIG ---------- //

    // Definimos el directorio donde irán los YAML de cada endpoint
    const componentsDir = path.join(__dirname, "../../docs/components");

    // Recorremos todos los ficheros del directorio "components" y los añadimos al baseDoc
    fs.readdirSync(componentsDir).forEach((file) => {
        if (file.endsWith(".yaml")) {
            const compDoc = YAML.load(path.join(componentsDir, file));
            Object.keys(compDoc).forEach((key) => {
                baseDoc.components[key] = {
                    ...(baseDoc.components[key] || {}),
                    ...compDoc[key],
                };
            });
        }
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(baseDoc));
}
