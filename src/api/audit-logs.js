import { api } from "boot/axios";
export default class AuditLogsApi {
  static async get(payload) {
    return api.get(`/audit-logs`, payload);
  }

  static async count(payload) {
    return api.get(`/audit-logs/count`, payload);
  }
}
