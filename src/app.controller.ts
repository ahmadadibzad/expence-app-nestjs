import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reports = data.report.filter((r) => r.type === type);
    return reports;
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reports = data.report.find((r) => {
      return r.type === type && r.id === id;
    });
    return reports;
  }

  @Post()
  createReport(
    @Body() { source, amount }: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      source: source,
      amount: amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENCE,
    };

    data.report.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ) {
    const reportIndex = data.report.findIndex(
      (r) => r.type === type && r.id === id,
    );
    if (reportIndex <= -1) {
      return 'not found';
    }

    data.report[reportIndex] = { ...data.report[reportIndex], ...body };

    return data.report[reportIndex];
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReport(@Param('type') type: string, @Param('id') id: string) {
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
