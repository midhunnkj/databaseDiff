import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMysqlDatabase } from 'app/shared/model/mysqlParser/mysql-database.model';

type EntityResponseType = HttpResponse<IMysqlDatabase>;
type EntityArrayResponseType = HttpResponse<IMysqlDatabase[]>;

@Injectable({ providedIn: 'root' })
export class MysqlDatabaseService {
    private resourceUrl = SERVER_API_URL + 'mysqlparser/api/mysql-databases';

    constructor(private http: HttpClient) {}

    create(mysqlDatabase: IMysqlDatabase): Observable<EntityResponseType> {
        return this.http.post<IMysqlDatabase>(this.resourceUrl, mysqlDatabase, { observe: 'response' });
    }

    update(mysqlDatabase: IMysqlDatabase): Observable<EntityResponseType> {
        return this.http.put<IMysqlDatabase>(this.resourceUrl, mysqlDatabase, { observe: 'response' });
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<IMysqlDatabase>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMysqlDatabase[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
