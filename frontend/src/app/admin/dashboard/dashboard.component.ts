import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  metrics = {
    totalProducts: 25,
    totalUsers: 10,
    recentSales: 15,
  };

  recentActivities: { time: string; message: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMetrics();
    this.fetchRecentActivities();
  }

  fetchMetrics(): void {
    this.http.get('/api/admin/dashboard/metrics').subscribe((data: any) => {
      this.metrics = data;
    });
  }

  fetchRecentActivities(): void {
    this.http.get('/api/admin/dashboard/recent-activities').subscribe((data: any) => {
      this.recentActivities = data;
    });
  }
}