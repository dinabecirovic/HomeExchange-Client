import { Component, OnInit } from '@angular/core';
import { AdvertisementResponse } from '../../core/models/advertisement.model';
import { ReservationResponse } from '../../core/models/reservation.model';
import { RatingResponse } from '../../core/models/rating.model';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../core/services/reservation.service';
import { RatingService } from '../../core/services/rating.service';

@Component({
  selector: 'app-my-ad-detail',
  standalone: false,
  templateUrl: './my-ad-detail.component.html',
  styleUrl: './my-ad-detail.component.css',
})
export class MyAdDetailComponent implements OnInit {
  ad!: AdvertisementResponse;
  reservations: ReservationResponse[] = [];
  ratings: RatingResponse[] = [];

  constructor(
    private adService: AdvertisementService,
    private adReservation: ReservationService,
    private adRating: RatingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const adId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAd(adId);
  }

  loadAd(id: number): void {
    this.adService.getById(id).subscribe((ad) => (this.ad = ad));
    this.adReservation.getReservationsForOwner(id).subscribe((res) => (this.reservations = res));
    this.adRating.getRatingByAdvertisement(id).subscribe((r) => (this.ratings = r));
  }

  deleteAd(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete oglas?')) {
      this.adService.delete(id).subscribe(() => this.router.navigate(['/my-ads']));
    }
  }

  isEditing: boolean = false;
  editForm = {
    description: '',
    garden: false,
    parkingSpace: false,
    swimmingPool: false,
  };

  editAd(ad: AdvertisementResponse) {
    this.isEditing = true;
    // popuni formu sa trenutnim podacima oglasa
    this.editForm.description = ad.description;
    this.editForm.garden = ad.garden;
    this.editForm.parkingSpace = ad.parkingSpace;
    this.editForm.swimmingPool = ad.swimmingPool;
  }

  saveEdit(ad: AdvertisementResponse) {
    this.adService.update(ad.id, this.editForm).subscribe(() => {
      alert('Oglas uspešno izmenjen!');
      // osveži podatke oglasa
      this.loadAd(ad.id);
      this.isEditing = false;
    });
  }
}
