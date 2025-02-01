import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})





export class DashboardComponent implements OnInit {
  metrics = {
    totalProducts: 0,
    totalUsers: 0,
    recentSales: 0,
  };

  recentActivities: { time: string; message: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.fetchMetrics();
    // this.fetchRecentActivities();
  }

  // fetchMetrics(): void {
  //   this.http.get('/api/admin/dashboard/metrics').subscribe((data: any) => {
  //     this.metrics = data;
  //   });
  // }

  // fetchRecentActivities(): void {
  //   this.http.get('/api/admin/dashboard/recent-activities').subscribe((data: any) => {
  //     this.recentActivities = data;
  //   });
  }
