import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdvertisementService } from '../../core/services/advertisement.service';
import { ReservationService } from '../../core/services/reservation.service';
import { RatingService } from '../../core/services/rating.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-ad-detail',
  standalone: false,
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css'],
})
export class AdDetailComponent implements OnInit, OnDestroy {
  ad: any = null;
  currentUser: any = null;

  reservationForm: FormGroup;
  ratingForm: FormGroup;

  reservationStatus: { isConfirmed: boolean; message: string } | null = null;

  private pollingSub: Subscription | null = null;

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

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    // Učitavanje oglasa
    this.adService.getById(id).subscribe({
      next: (a: any) => (this.ad = a),
      error: () => alert('Failed to load advertisement.'),
    });

    /* Polling za proveru statusa razmene svaka 10s
    this.pollingSub = interval(10000).subscribe(() => {
      if (this.ad && this.currentUser) {
        this.reservationService.getReservationsForOwner(this.ad.id).subscribe((res: any[]) => {
          const myReservation = res.find(r => r.userId === this.currentUser.id);
          if (myReservation && myReservation.isExchangeConfirmed) {
            this.reservationStatus = {
              isConfirmed: true,
              message: 'Razmena je sada potvrđena!',
            };
          }
        });
      }
    });*/
  }

  ngOnDestroy() {
    this.pollingSub?.unsubscribe();
  }

  createReservation() {
    if (!this.reservationForm.valid) return;

    if (!this.ad || !this.ad.id) {
      alert('Advertisement not loaded yet.');
      return;
    }

    const body = {
      startDate: this.reservationForm.value.startDate,
      endDate: this.reservationForm.value.endDate,
      advertisementId: this.ad.id,
    };

    this.reservationService.create(body).subscribe({
      next: (res: any) => {
        if (res.isExchangeConfirmed) {
          this.reservationStatus = {
            isConfirmed: true,
            message: 'Razmena je potvrđena! Možete uživati u zameni.',
          };
        } else {
          this.reservationStatus = {
            isConfirmed: false,
            message: 'Rezervacija je napravljena. Čeka se da drugi vlasnik potvrdi razmenu.',
          };
        }
        this.reservationForm.reset();
      },
      error: (err) => {
        console.error(err);
        alert(err.error || 'Rezervacija nije uspela.');
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
        alert('Ocena uspešno poslata!');
        this.ratingForm.reset({ score: 5, comment: '' });
      },
      error: (err) => {
        console.error(err);
        alert('Slanje ocene nije uspelo.');
      },
    });
  }
}
