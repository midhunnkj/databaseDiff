import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDatabase } from 'app/shared/model/mysqlParser/database.model';

type EntityResponseType = HttpResponse<IDatabase>;
type EntityArrayResponseType = HttpResponse<IDatabase[]>;

@Injectable({ providedIn: 'root' })
export class DatabaseService {
    private resourceUrl = SERVER_API_URL + 'mysqlparser/api/databases';

    constructor(private http: HttpClient) {}

    create(mysqlDatabase: IDatabase): Observable<EntityResponseType> {
        return this.http.post<IDatabase>(this.resourceUrl, mysqlDatabase, { observe: 'response' });
    }

    update(mysqlDatabase: IDatabase): Observable<EntityResponseType> {
        return this.http.put<IDatabase>(this.resourceUrl, mysqlDatabase, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IDatabase>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDatabase[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
