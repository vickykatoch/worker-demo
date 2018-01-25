import { Directive, Input, EventEmitter, HostListener, Output } from '@angular/core';
import { DragService } from "./drag-service";

export interface DropTargetOptions {
    zone?: string;
}


@Directive({
    selector: '[myDropTarget]'
})
export class DropTargetDirective {
    constructor(private dragService: DragService) {
    }

    @Input()
    set myDropTarget(options: DropTargetOptions) {
        if (options) {
            this.options = options;
        }
    }

    @Output('myDrop') drop = new EventEmitter();
    @Output() draggedOver = new EventEmitter();


    private options: DropTargetOptions = {};

    @HostListener('dragenter', ['$event'])
    @HostListener('dragover', ['$event'])
    onDragOver(event) {
        const data = event.dataTransfer.getData('Text');
        // const data = JSON.parse(event.dataTransfer.getData('Text'));
        // this.dragOver.next(data);
        // const { zone = 'zone' } = this.options;
        // if (this.dragService.accepts(zone)) {
        //     event.preventDefault();
        // }
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {
        const data = JSON.parse(event.dataTransfer.getData('Text'));

        this.drop.next(data);
    }
}
