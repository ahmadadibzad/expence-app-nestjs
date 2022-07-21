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
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: ReportType) {
    const reports = this.appService.getAllReports(type);
    return reports;
  }

  @Get(':id')
  getReportById(@Param('type') type: ReportType, @Param('id') id: string) {
    const report = this.appService.getReportById(type, id);
    return report;
  }

  @Post()
  createReport(
    @Body() { source, amount }: { source: string; amount: number },
    @Param('type') type: ReportType,
  ) {
    return this.appService.createReport(type, { source, amount });
  }

  @Put(':id')
  updateReport(
    @Param('type') type: ReportType,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ) {
    return this.appService.updateReport(type, id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReport(@Param('type') type: ReportType, @Param('id') id: string) {
    return this.appService.deleteReport(type, id);
  }
}
