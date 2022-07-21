import { Injectable } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

interface Report {
  source: string;
  amount: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((r) => r.type === type);
  }

  getReportById(type: ReportType, id: string) {
    const reports = data.report.find((r) => {
      return r.type === type && r.id === id;
    });
    return reports;
  }

  createReport(type: ReportType, { source, amount }: Report) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      type,
    };

    data.report.push(newReport);

    return newReport;
  }

  updateReport(type: ReportType, id: string, reportData: Report) {
    const reportIndex = data.report.findIndex(
      (r) => r.type === type && r.id === id,
    );
    if (reportIndex <= -1) {
      return 'not found';
    }

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...reportData,
      updatedAt: new Date(),
    };

    return data.report[reportIndex];
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
