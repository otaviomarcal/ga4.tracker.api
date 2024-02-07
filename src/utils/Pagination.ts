class Pagination<T> {
  private data: T[];
  private currentPage: number;
  private pageSize: number;

  constructor(data: T[], currentPage: number, pageSize: number = 10) {
    this.data = data;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }

  getPaginatedData(): T[] {
    const offset = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(offset, offset + this.pageSize);
  }

  getTotalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }
}

export default Pagination;
