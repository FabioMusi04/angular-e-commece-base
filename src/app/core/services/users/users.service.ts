import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../../../interfaces";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(page: number, limit: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`/users?count=true&page=${page}&limit=${limit}`);
  }

  getUserById(id: string): Observable<Omit<IUser, 'password'>> {
    return this.http.get<IUser>(`/users/${id}`);
  }

}
