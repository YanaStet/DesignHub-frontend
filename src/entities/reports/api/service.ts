import type { PaginationParams, PaginationResponse } from "@/shared/types";
import type { CreateReport, Report, Status } from "../model/types";
import api from "@/shared/api/api";
import { buildQueryParams } from "@/shared/utils/query";

class ReportService {
    async getPaginatedReports(params: PaginationParams): Promise<PaginationResponse<Report>> {
        const data = await api.get<PaginationResponse<Report>>(`/reports/paginated?${buildQueryParams(params)}`);
        return data;
    }
    async getReport(id: string): Promise<Report> {
        const data = await api.get<Report>(`/reports/${id}`);
        return data;
    }
    async resolveReport(id: string, body: { status: 'Resolved' | 'Dismissed' }): Promise<Report> {
        const data = await api.put<Report>(`/reports/${id}/resolve`, body);
        return data;
    }
    async getMyReports(): Promise<Report[]> {
        const data = await api.get<Report[]>("/reports/my-reports");
        return data;
    }
    async createReport(report: CreateReport): Promise<Report> {
        const data = await api.post<Report>("/reports", report);
        return data;
    }
}

export default new ReportService();