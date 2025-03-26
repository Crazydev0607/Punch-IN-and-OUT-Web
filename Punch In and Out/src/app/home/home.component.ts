import { Component, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, CommonModule,NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  currentYear: number | any;
  currentMonth: number | any;
  daysInMonth: number[] = [];
  emptyDays: number[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  today: number | any;
  remainingDays: number[] = [];
  hoverDay: number | null = null;
  leaveDays: number[] = [5, 12, 20, 25];

  config: PaginationInstance = {
    id: 'custom-pagination',
    itemsPerPage: 5,
    currentPage: 1,
  };

  workingHours = [
    { name: 'Monday', open: '9:00 AM', close: '6:00 PM', status: 'Open' },
    { name: 'Tuesday', open: '9:00 AM', close: '6:00 PM', status: 'Open' },
    { name: 'Wednesday', open: '9:00 AM', close: '6:00 PM', status: 'Open' },
    { name: 'Thursday', open: '9:00 AM', close: '6:00 PM', status: 'Open' },
    { name: 'Friday', open: '9:00 AM', close: '6:00 PM', status: 'Open' },
    { name: 'Saturday', open: '10:00 AM', close: '2:00 PM', status: 'Open' },
    // { name: 'Sunday', open: '-', close: '-', status: 'Closed' },
  ];
  status: boolean = false;
  current_data: any = {};

  constructor() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.today = today.getDate();
    this.generateCalendar();
  }


  ngOnInit() {
    this.generateCalendar();
  }

  checkinot(currentMonthName: any, currentYear: any, day: any) {
    console.log("currentMonthName: any, currentYear: any, day: ", currentMonthName, currentYear, day);
    this.current_data = { 'month': currentMonthName, "year": currentYear, "day": day }
    this.status = !this.status;
  }

  get currentMonthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
  }

  generateCalendar() {
    this.daysInMonth = [];
    this.emptyDays = [];
    this.remainingDays = [];

    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // Empty cells for starting alignment
    this.emptyDays = Array(firstDayOfMonth).fill(0);

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      this.daysInMonth.push(day);
    }

    // Ensure there are always 6 rows (7 columns each)
    const totalCells = this.emptyDays.length + this.daysInMonth.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 columns = 42 cells
    this.remainingDays = Array(remainingCells).fill(0);
  }

  isLeaveDay(day: number): boolean {
    const date = new Date(this.currentYear, this.currentMonth, day);
    const isWeekend = date.getDay() === 6 || date.getDay() === 0; // Saturday or Sunday
    return this.leaveDays.includes(day) || (isWeekend && !this.isFirstWeekSaturday(day));
  }

  isFirstWeekSaturday(day: number): boolean {
    const date = new Date(this.currentYear, this.currentMonth, day);
    return date.getDay() === 6 && day <= 7; // First Saturday of the month
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }


}
