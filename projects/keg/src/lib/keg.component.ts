import { HttpClient } from '@angular/common/http';
import { Directive, inject, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, switchMap } from 'rxjs';

@Directive()
export abstract class KegComponent<Keg> implements OnInit {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _http: HttpClient = inject(HttpClient);
  public loading: Subject<boolean> = new Subject<boolean>();
  public base_api!: string;
  private headers_route!: string;
  private items_route!: string;

  // constructor(protected injector: Injector) {}

  ngOnInit(): void {
    this.headers_route = this._activatedRoute.snapshot.data['headers'];
    this.items_route = this._activatedRoute.snapshot.data['items'];
  }

  private getColumns(): Observable<any> {
    return this._http.get(`${this.base_api}/${this.headers_route}`);
  }

  private getItems(): Observable<any> {
    return this._http.get(`${this.base_api}/${this.items_route}`);
  }

  public getApi(): Observable<any> {
    this.loading = new Subject<boolean>();
    this.loading.next(true);
    return this.getColumns().pipe(
      switchMap((columns) => {
        return this.getItems().pipe(
          map((items) => {
            this.loading.next(false);
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
