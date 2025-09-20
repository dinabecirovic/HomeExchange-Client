import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-pending-ads',
  standalone: false,
  templateUrl: './pending-ads.component.html',
  styleUrl: './pending-ads.component.css',
})
export class PendingAdsComponent implements OnInit {
  ads: any[] = [];
  constructor(private admin: AdminService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.admin.getPendingAds().subscribe((a) => (this.ads = a));
  }
  approve(id: number) {
    this.admin.approveAd(id).subscribe(() => {
      const ad = this.ads.find((a) => a.id === id);
      if (ad) {
        ad.isApproved = true;
        alert('Oglas je potvrđen!');
      }
    });
  }

  del(id: number) {
    if (confirm('Delete ad?')) this.admin.deleteAd(id).subscribe(() => this.load());
  }
  updateAvailability(id: number, val: string) {
    this.admin.updateAvailability(id, val).subscribe(() => this.load());
  }
}
