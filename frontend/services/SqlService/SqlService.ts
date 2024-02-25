export class SqlService {
  constructor() {}

  private static _instance: SqlService;

  public static get instance() {
    if (!this._instance) {
      this._instance = new SqlService();
    }
    return this._instance;
  }
}
