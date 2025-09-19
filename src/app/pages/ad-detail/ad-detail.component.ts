import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { ReservationService } from '../../core/services/reservation.service';
import { RatingService } from '../../core/services/rating.service';

@Component({
  selector: 'app-ad-detail',
  standalone: false,
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css'],
})
export class AdDetailComponent implements OnInit {
  ad: any = null;

  reservationForm: FormGroup;
  ratingForm: FormGroup;
  currentUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private adService: AdvertisementService,
    private reservationService: ReservationService,
    private ratingService: RatingService,
    private fb: FormBuilder
  ) {
    this.reservationForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.ratingForm = this.fb.group({
      score: [5, Validators.required],
      comment: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Učitavanje trenutnog korisnika iz localStorage
    this.currentUser = JSON.parse(localStorage.getItem('user') || 'null');

    // Učitavanje oglasa
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.adService.getById(id).subscribe({
      next: (a: any) => (this.ad = a),
      error: () => {
        alert('Failed to load advertisement.');
      },
    });
  }

  createReservation() {
    if (!this.reservationForm.valid) return;

    if (!this.currentUser || !this.currentUser.id) {
      alert('You must be logged in to make a reservation.');
      return;
    }

    if (!this.ad || !this.ad.id) {
      alert('Advertisement not loaded yet.');
      return;
    }

    const body = {
      startDate: this.reservationForm.value.startDate,
      endDate: this.reservationForm.value.endDate,
      userId: this.currentUser.id,
      advertisementId: this.ad.id,
    };

    this.reservationService.create(body).subscribe({
      next: (res) => {
        console.log('Reservation successful', res);
        alert('Reservation successful!');
        this.reservationForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Reservation failed.');
      },
    });
  }

  createRating() {
    if (!this.ratingForm.valid) return;

    if (!this.ad || !this.ad.id) {
      alert('Advertisement not loaded yet.');
      return;
    }

    const body = {
      score: this.ratingForm.value.score,
      comment: this.ratingForm.value.comment,
      advertisementId: this.ad.id,
    };

    this.ratingService.create(body).subscribe({
      next: (res) => {
        console.log('Rating submitted', res);
        alert('Rating submitted!');
        this.ratingForm.reset({ score: 1, comment: '' });
      },
      error: (err) => {
        console.error(err);
        alert('Rating failed.');
      },
    });
  }
}
