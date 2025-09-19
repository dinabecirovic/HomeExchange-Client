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
      // Nakon odobravanja, ne uklanjamo oglas već samo update-ujemo status
      const ad = this.ads.find((a) => a.id === id);
      if (ad) ad.status = 'Approved';
    });
  }

  del(id: number) {
    if (confirm('Delete ad?')) {
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
