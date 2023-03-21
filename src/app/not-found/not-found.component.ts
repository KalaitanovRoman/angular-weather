import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
    public img: string;

    constructor() {}

    ngOnInit() {
        const gifs = ['404-1', '404-2', '404-3', '404-4', '404-5', '404-6', '404-7', '404-8'];

        this.img = `../../assets/img/${gifs[Math.floor(Math.random() * gifs.length)]}.gif`;
    }
}