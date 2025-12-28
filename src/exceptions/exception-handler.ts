import { Context, Hono } from "hono";
import { ResourceNotFoundException, RuntimeException, UnauthorizedException } from "./exception";
import { HTTPResponseError } from "hono/types";
import { ContentfulStatusCode } from "hono/utils/http-status";

// export const exceptionHandler = (app: Hono) => {

//     function handleResourceNotFoundException(err: ResourceNotFoundException) {
//         console.log("Handling Resource Not Found Exception")
//         return { success: false, ...err }
//     }

//     function handleUnAuthorizedException(err: UnauthorizedException) {
//         console.log("Handling UnAuthorized Exception")
//         return { success: false, ...err }
//     }

//     function handleException(err: Error | HTTPResponseError) {
//         console.log("Handling Global Exception")
//         return { success: false, message: err.message, code: "ERR_SERVER_ERROR", status: 500 }
//     }

//     app.onError((err, c) => {
//         const status = (err instanceof RuntimeException ? err.status : 500) as ContentfulStatusCode;
//         let data;
//         if (err instanceof ResourceNotFoundException) {
//             data = handleResourceNotFoundException(err);
//         } else if (err instanceof UnauthorizedException) {
//             data = handleUnAuthorizedException(err);
//         } else {
//             data = handleException(err);
//         }
//         return c.json(data, status)
//     })
// }

export const exceptionHandler = (app: Hono) => {
    app.onError((err, c) => {

        if (err instanceof RuntimeException) {
            const { status, message, code } = err;
            return c.json({ success: false, message, code }, status as any);
        }

        return c.json(
            { success: false, message: err.message, code: "ERR_SERVER_ERROR" },
            500
        );
    });
};
