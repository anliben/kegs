import { HttpClient } from '@angular/common/http';
import { Directive, inject, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, switchMap } from 'rxjs';

@Directive()
export abstract class KegComponent<Keg> implements OnInit {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _http: HttpClient = inject(HttpClient);
  public loading$: Subject<boolean> = new Subject<boolean>();
  public base_api!: string;
  private headers!: string;
  private items!: string;

  constructor(protected injector: Injector) {}

  ngOnInit(): void {
    this.headers = this._activatedRoute.snapshot.data['headers'];
    this.items = this._activatedRoute.snapshot.data['items'];
  }

  private getColumns(): Observable<any> {
    return this._http.get(`${this.base_api}/${this.headers}`);
  }

  private getItems(): Observable<any> {
    return this._http.get(`${this.base_api}/${this.items}`);
  }

  public getApi(): Observable<any> {
    return this.getColumns().pipe(
      switchMap((columns) => {
        return this.getItems().pipe(
          map((items) => {
            return {
              columns,
              items,
            };
          })
        );
      })
    );
  }
}
