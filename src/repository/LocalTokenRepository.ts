export class LocalTokenRepository {
  private TOKEN_KEY = "refresh-token";

  set(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  get(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  remove() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
