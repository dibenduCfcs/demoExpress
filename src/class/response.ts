import { Response } from 'express';

class JsonResponse {
  nextPageAvailable: boolean;
  pageNo: number;
  status_code: number;
  status_message: string;
  data: any;

  constructor(data: any, status_message = '', status_code = 1) {
    this.nextPageAvailable = false;
    this.pageNo = 0;
    if (Array.isArray(data)) {
      if (data.length > 0) {
        this.status_code = 1;
        this.status_message = status_message ?? 'Data found';
        this.data = data;
      } else {
        this.status_code = status_code ?? 0;
        this.status_message = 'No data Found';
        this.data = [];
      }
    } else {
      this.status_code = status_code ?? 1;
      this.status_message = status_message ?? 'Data found';
      this.data = data;
    }
  }

  setPageUtil(pageNo: number, nextPageAvailable: boolean) {
    this.pageNo = pageNo;
    this.nextPageAvailable = nextPageAvailable;
  }

  send(res: Response) {
    return res.status(200).json({
      meta: {
        status_code: this.status_code,
        status_message: this.status_message,
      },
      data: this.data,
    });
  }
}

export { JsonResponse };
