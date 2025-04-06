import express, { type Request, type Response } from "express";
import { jsonPayload } from "../store/json.js";
import { randomErrorMiddleware } from "../middleware/other-middleware.js";
import { networkDelayMiddleware } from "../middleware/networkDelayMiddleware.js";
import { configStore } from "../store/config.js";

export const apiRoutes = express.Router();

// Add both global middleware
apiRoutes.use(networkDelayMiddleware());
apiRoutes.use(randomErrorMiddleware());

// Function to register dynamic routes from config
const registerDynamicRoutes = () => {
    const dynamicRoutes = configStore.getDynamicRoutes();
    
    dynamicRoutes.forEach(route => {
        console.log(`Registering dynamic route: ${route.path}`);
        apiRoutes.get(route.path, (req: Request, res: Response) => {
            // For now, return the default jsonPayload or route-specific payload if available
            const responseData = route.payload || jsonPayload;
            res.json(responseData);
        });
    });
};

// Initial registration of dynamic routes
registerDynamicRoutes();

// Export the function to allow re-registration when routes are updated
export const refreshDynamicRoutes = registerDynamicRoutes;

apiRoutes.get("/", (req: Request, res: Response) => {
	res.status(200).send("hmmm");
});

apiRoutes.get("/good", (req: Request, res: Response) => {
	res.status(200).send("good");
});

apiRoutes.get("/bad-client", (req: Request, res: Response) => {
	res.status(400).send("no");
});

apiRoutes.get("/bad-server", (req: Request, res: Response) => {
	res.status(500).send("no");
});

apiRoutes.get(
	"/error",
	(req: Request, res: Response, next: express.NextFunction) => {
		throw new Error("Something broke!");
	},
);

apiRoutes.get("/json", (req: Request, res: Response) => {
	res.json(jsonPayload);
});

apiRoutes.get("/jsonp", (req: Request, res: Response) => {
	res.jsonp({ message: "Hello, World!" });
});

apiRoutes.get("/redirect", (req: Request, res: Response) => {
	res.redirect("/new-location");
});

apiRoutes.get("/rand-error", (req: Request, res: Response) => {
	res.status(200).send({ status: 200, message: "=rand-error successful" });
});
