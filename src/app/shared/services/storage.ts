import { inject, Injectable } from "@angular/core";
import { API_URL } from "../../app.config";
import { HttpClient } from "@angular/common/http";
import { extractToken } from "../util/extractToken";


@Injectable({
    providedIn: 'root',
})

export class MyLocalStorage {
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value)
    }

    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

    getUserId(): number | null {
        const token = this.getItem('ngrxStore_token');
        if (!token) {
            return null;
        }
        const payload = extractToken(token);
        return payload ? payload.sub : null;
    }


}