interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

export enum ReportType {
  INCOME = 'income',
  EXPENCE = 'expense',
}

const report = [
  {
    id: 'uuid1',
    source: 'Salary',
    amount: 7500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.INCOME,
  },
  {
    id: 'uuid2',
    source: 'YouTube',
    amount: 2500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.INCOME,
  },
  {
    id: 'uuid3',
    source: 'Food',
    amount: 500,
    created_at: new Date(),
    updated_at: new Date(),
    type: ReportType.EXPENCE,
  },
];

export const data: Data = {
  report: report,
};
