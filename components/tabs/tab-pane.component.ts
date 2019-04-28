import { Component, Input, HostBinding, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'TabPane, nzm-tab-pane',
  templateUrl: './tab-pane.component.html',
  styles: [`:host {touch-action: auto}`]
})
export class TabPane {

  public isTitleString: boolean = true;

  private _title: string | TemplateRef<void>;

  @ViewChild('content') content: TemplateRef<void>;

  @Input()
  get title(): string | TemplateRef<void> {
    return this._title;
  }
  set title(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  constructor() {}

}
