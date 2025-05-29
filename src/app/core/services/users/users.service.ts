import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../../../interfaces";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`/users`);
  }

  getUserById(id: string): Observable<Omit<IUser, 'password'>> {
    return this.http.get<IUser>(`/users/${id}`);
  }

}
