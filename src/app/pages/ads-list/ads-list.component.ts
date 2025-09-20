import { Component, OnInit } from '@angular/core';
import { AdvertisementResponse } from '../../core/models/advertisement.model';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ads-list',
  standalone: false,
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.css',
})
export class AdsListComponent implements OnInit {
  ads: AdvertisementResponse[] = [];
  form;
  currentUser: any = null;

  constructor(
    private adService: AdvertisementService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      city: [''],
      country: [''],
      minRooms: [''],
      minArea: [''],
      garden: [null],
      swimmingPool: [null],
      parkingSpace: [null],
    });
  }

  /* ngOnInit() {
    this.load();
  }*/
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    this.load();
  }

  load() {
    this.adService.getAll().subscribe((a: any) => {
      this.ads = a.filter((x: any) => x.isApproved === true || x.isApproved == null);
    });
  }

  search() {
    const criteria = { ...this.form.value };
    if (criteria.minRooms === '') delete criteria.minRooms;
    if (criteria.minArea === '') delete criteria.minArea;
    this.adService.search(criteria).subscribe((res: any) => {
      this.ads = res.filter((x: any) => x.isApproved === true || x.isApproved == null);
    });
  }

  open(ad: AdvertisementResponse) {
    this.router.navigate(['/ads', ad.id]);
  }
}
