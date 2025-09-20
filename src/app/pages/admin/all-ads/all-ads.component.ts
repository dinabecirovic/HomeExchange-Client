import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-all-ads',
  standalone: false,
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.css',
})
export class AllAdsComponent implements OnInit {
  ads: any[] = [];

  constructor(private admin: AdminService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.admin.getAllAds().subscribe((res) => (this.ads = res));
  }

  approve(id: number) {
    this.admin.approveAd(id).subscribe(() => {
      const ad = this.ads.find((a) => a.id === id);
      if (ad) ad.status = 'Approved';
    });
  }

  remove(id: number) {
    if (confirm('Da li želite da izbrišete oglas?')) {
      this.admin.deleteAd(id).subscribe(() => {
        this.ads = this.ads.filter((a) => a.id !== id);
      });
    }
  }

  updateAvailability(id: number, val: string) {
    this.admin.updateAvailability(id, val).subscribe(() => {
      const ad = this.ads.find((a) => a.id === id);
      if (ad) ad.availability = val;
    });
  }
}
