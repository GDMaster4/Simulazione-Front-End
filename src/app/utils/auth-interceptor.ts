import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtService } from "../services/jwt.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(protected jwt:JwtService) { }

    intercept(req:HttpRequest<any>,next:HttpHandler)
    {
        const authToken= this.jwt.getToken();

        const authReq = authToken ? req.clone({
                                        headers:req.headers.set("Authorization",` Bearer ${authToken}`)
                                    }): req;

        return next.handle(authReq);
    }
}