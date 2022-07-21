import { Injectable } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dtos/report.dto';

interface Report {
  source: string;
  amount: number;
}

interface UpdateReport {
  souece?: string;
  amount?: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((r) => r.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report.find((r) => {
      return r.type === type && r.id === id;
    });

    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { source, amount }: Report,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    reportData: UpdateReport,
  ): ReportResponseDto {
    const reportIndex = data.report.findIndex(
      (r) => r.type === type && r.id === id,
    );
    if (reportIndex <= -1) {
      return;
    }

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...reportData,
      updated_at: new Date(),
    };

    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(type: ReportType, id: string) {
    const reportIndex = data.report.findIndex(
      (r) => r.type === type && r.id === id,
    );

    if (reportIndex <= -1) {
      return 'not found';
    }

    const deletedReport = data.report.splice(reportIndex);

    return deletedReport;
  }
}
