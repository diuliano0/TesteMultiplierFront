import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from "rxjs";
import {Feed} from "../models/feed.model";
import {AuthService} from "./auth.service";
import {isNullOrUndefined} from 'util';

declare const Pusher: any;


@Injectable({
    providedIn: 'root'
})
export class PusherService {

    private subject: Subject<Feed> = new Subject<Feed>();

    pusher: any;
    channel: any;

    constructor(private http: HttpClient,
                private auth: AuthService) {
        this.pusher = new Pusher(environment.pusher.key, {
            cluster: environment.pusher.cluster
        });

        let usuario = this.auth.getUsuario();

        if (!isNullOrUndefined(usuario)) {
            this.channel = this.pusher.subscribe(`not-filial-${usuario.data.filial_id || null}`);

            this.channel.bind(
                'quiz-iniciado',
                (data: { name: string; message: string; time: string}) => {
                    this.subject.next(new Feed(data.name, data.message, new Date(data.time)));
                }
            );
        }
    }

    getFeedItems(): Observable<Feed> {
        return this.subject.asObservable();
    }
}
