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

  // Dodatno
  bookedPeriods: { startDate: string; endDate: string }[] = [];
  minDate = new Date(); // zabrana prošlih datuma

  // NOVO: lista recenzija
  ratings: any[] = [];

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
    this.currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.adService.getById(id).subscribe({
      next: (a: any) => {
        this.ad = a;

        // Dodatno: učitavanje zauzetih termina
        this.reservationService.getReservationsForOwner(a.id).subscribe({
          next: (res: any) => {
            this.bookedPeriods = res.map((r: any) => ({
              startDate: r.startDate,
              endDate: r.endDate,
            }));
          },
          error: () => console.error('Ne mogu da učitam zauzete termine.'),
        });

        // NOVO: učitaj recenzije
        this.loadRatings();
      },
      error: () => alert('neuspesno ucitan oglas.'),
    });
  }

  ngOnDestroy() {
    this.pollingSub?.unsubscribe();
  }

  createReservation() {
    if (!this.reservationForm.valid) return;

    if (!this.ad || !this.ad.id) {
      alert('Oglas jos uvek nije ucitan.');
      return;
    }

    const start = new Date(this.reservationForm.value.startDate);
    const end = new Date(this.reservationForm.value.endDate);
    const today = new Date();

    if (start < today || end < today) {
      alert('Ne možete rezervisati termine u prošlosti.');
      return;
    }

    if (end <= start) {
      alert('Datum završetka mora biti posle datuma početka.');
      return;
    }

    for (let b of this.bookedPeriods) {
      const bStart = new Date(b.startDate);
      const bEnd = new Date(b.endDate);

      if (start <= bEnd && end >= bStart) {
        alert(
          `Oglas je već zauzet od ${bStart.toLocaleDateString()} do ${bEnd.toLocaleDateString()}`
        );
        return;
      }
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
      alert('Oglas jos uvek nije ucitan.');
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

        // osveži listu recenzija
        this.loadRatings();
      },
      error: (err) => {
        console.error(err);
        // Jednostavna poruka
        alert('Ne možete ostaviti recenziju dok ne istekne rezervacija.');
      },
    });
  }

  // NOVO: metoda za učitavanje liste recenzija
  loadRatings() {
    if (!this.ad || !this.ad.id) return;

    this.ratingService.getRatingByAdvertisement(this.ad.id).subscribe({
      next: (res: any[]) => {
        this.ratings = res;
      },
      error: (err) => {
        console.error('Greška pri učitavanju ocena', err);
      },
    });
  }
}
