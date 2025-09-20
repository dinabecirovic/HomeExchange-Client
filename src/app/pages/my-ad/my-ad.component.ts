import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrl: './my-ad.component.css',
})
export class MyAdComponent implements OnInit {
  myAd: any[] = [];

  constructor(private adService: AdvertisementService, private router: Router) {}

  ngOnInit(): void {
    this.loadMyAd();
  }

  loadMyAd() {
    this.adService.getMyAdvertisements().subscribe({
      next: (ads: any[]) => {
        this.myAd = ads; // backend vraća samo oglase trenutnog korisnika
      },
      error: (err) => {
        console.error('Failed to load my ads', err);
      },
    });
  }

  editAd(ad: any) {
    this.router.navigate(['/create-ad'], { state: { ad } });
  }

  deleteAd(adId: number) {
    if (!confirm('Da li ste sigurni da želite da obrišete oglas?')) return;

    this.adService.delete(adId).subscribe({
      next: () => {
        alert('Oglas uspešno obrisan!');
        this.loadMyAd();
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Brisanje oglasa nije uspelo.');
      },
    });
  }
}
