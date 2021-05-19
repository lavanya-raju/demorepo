import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';;

@Injectable()
export class BackendInterceptor implements HttpInterceptor{
    
    userjson : any;
    constructor(private http : HttpClient){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        // test user - (one of the users detais in database)
        let testUser  = {
            userid : 101,
            password:'testpwd',
            username:'testuname',
            token:'0000-fake-jwt-token-0000' 
        }

        // wrapping the API's in delayed observable to simulate the Server API Calls
        return of(null).pipe(
            mergeMap(() => {

                // API 1: Authenticate - Will be hit by Authentication Service - STARTS
                if(request.url.endsWith('/authenticate') && request.method === 'POST'){
                        for (var _i = 0; _i < request.body.userjson.Users.length; _i++){
                            if(request.body.username === request.body.userjson.Users[_i].username && request.body.password === request.body.userjson.Users[_i].password){
                          
                                // if login details are valid, return status 200 with a Fake JWT Token
                                let body = request.body.userjson.Users[_i];
                                return of(new HttpResponse({status: 200, body}))
                            } 
                            else {
                                let body =  { Error:'Error'}
                                // if the credentials by user doesn't match the data in the db, return Status 400 - Bad Request
                                return of(new HttpResponse({status: 401, body}))
                            }
                        }

                }

                // SECURE API END POINT - will check for valid JWT Token in Request
                // API 2: Get all users data (we now have only 1 user - testUser) - STARTS
                if(request.url.endsWith('/users') && request.method === 'GET'){

                    // check for a fake jwt token. If valid JWT token found, return the list of users, else throw error
                    if(request.headers.get('Authorization') === 'Bearer 0000-fake-jwt-token-0000'){
                        return of(new HttpResponse({status: 200, body: [testUser]}));
                    }
                    else{
                        // invalid JWT token found in request header
                        return throwError({
                            error: {
                                message: 'Unauthorized'
                            }
                        });
                    }
                }
                // API 2: Get all users data (we now have only 1 user - testUser) - ENDS


                // Pass any other requests left (unhandled
                return next.handle(request);
                
            })
        )
        // call materialize and dematerialize to ensure delay even if an error is thrown
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

// creating a PROVIDER
export let BackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
};

