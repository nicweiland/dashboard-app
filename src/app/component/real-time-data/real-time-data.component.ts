import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-real-time-data',
  templateUrl: './real-time-data.component.html',
  styleUrls: ['./real-time-data.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class RealTimeDataComponent implements OnInit {
  public data: any[] = [];
  public paginatedData: any[] = [];
  public currentPage = 0;
  public itemsPerPage = 20;
  public totalPages = 1;

  constructor(public websocketService: WebSocketService) {}

  ngOnInit(): void {
    this.websocketService.getMessages().subscribe((message) => {
      this.data.push(message);
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.data.slice(start, end);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage += 1;
      this.updatePagination();
    }
  }
}