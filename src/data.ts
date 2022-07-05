interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
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
    createdAt: new Date(),
    updatedAt: new Date(),
    type: ReportType.INCOME,
  },
  {
    id: 'uuid2',
    source: 'YouTube',
    amount: 2500,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: ReportType.INCOME,
  },
  {
    id: 'uuid3',
    source: 'Food',
    amount: 500,
    createdAt: new Date(),
    updatedAt: new Date(),
    type: ReportType.EXPENCE,
  },
];

export const data: Data = {
  report: report,
};
