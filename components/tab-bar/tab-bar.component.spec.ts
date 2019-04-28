import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TabBarModule } from './tab-bar.module';
import { TabsModule } from '../tabs/tabs.module';

describe('tabbar', () => {
  let component;
  let fixture: ComponentFixture<TestTabBarComponent>;
  let tabBarEle;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestTabBarComponent],
      imports: [TabBarModule, TabsModule, NoopAnimationsModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTabBarComponent);
    component = fixture.componentInstance;
    tabBarEle = fixture.debugElement.query(By.css('TabBar'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hidden work', () => {
    expect(tabBarEle.nativeElement.querySelector('.am-tab-bar-bar').classList).not.toContain('am-tab-bar-bar-hidden');
    component.hidden = true;
    fixture.detectChanges();
    expect(tabBarEle.nativeElement.querySelector('.am-tab-bar-bar').classList).toContain(
      'am-tab-bar-bar-hidden-' + (component.topFlag ? 'top' : 'bottom')
    );
  });

  it('tabBarPosition work', () => {
    expect(tabBarEle.nativeElement.querySelector('.am-tabs').classList).toContain('am-tabs-bottom');
    component.topFlag = true;
    fixture.detectChanges();
    expect(tabBarEle.nativeElement.querySelector('.am-tabs').classList).toContain('am-tabs-top');
  });

  it('badge work', () => {
    expect(tabBarEle.nativeElement.querySelectorAll('.am-tab-bar-tab')[0].querySelector('badge')).toBeTruthy();
  });

  it('dot work', () => {
    expect(tabBarEle.nativeElement.querySelectorAll('.am-tab-bar-tab')[2].querySelector('.am-badge-dot')).toBeTruthy();
  });

  it('title work', () => {
    expect(
      tabBarEle.nativeElement.querySelectorAll('.am-tab-bar-tab')[2].querySelector('.am-tab-bar-tab-title').innerText
    ).toContain('Friend');
  });

  it('barTintColor work', () => {
    expect(tabBarEle.nativeElement.querySelector('.am-tab-bar-bar').style.backgroundColor).toContain('white');
  });

  it('onPress work', fakeAsync(() => {
    component.onPress = jasmine.createSpy('onPress is callback');
    const tab = tabBarEle.nativeElement.querySelectorAll('.am-tab-bar-tab')[component.selectedIndex - 1];
    tick(100);
    fixture.detectChanges();
    tab.click();
    fixture.detectChanges();
    expect(component.onPress).toHaveBeenCalledTimes(1);
    expect(
      tabBarEle.nativeElement.querySelectorAll('.am-tab-bar-tab')[1].querySelector('.am-tab-bar-tab-title').style.color
    ).toContain('rgb(136, 136, 136)');
    expect(
      tabBarEle.nativeElement.querySelectorAll('.am-tab-bar-tab')[0].querySelector('.am-tab-bar-tab-title').style.color
    ).toContain('rgb(16, 142, 233)');
  }));

  it('unselectedTintColor work', () => {
    expect(
      tabBarEle.nativeElement
        .querySelectorAll('.am-tab-bar-tab')
        [component.selectedIndex + 1].querySelector('.am-tab-bar-tab-title').style.color
    ).toContain('rgb(136, 136, 136)');
  });

  it('tintColor work', () => {
    expect(
      tabBarEle.nativeElement.querySelectorAll('.am-tab-bar-tab')[component.selectedIndex].querySelector('.am-tab-bar-tab-title')
        .style.color
    ).toContain('rgb(16, 142, 233)');
  });
});

@Component({
  selector: 'test-tabbar',
  template: `
    <TabBar [barTintColor]="'white'"
            [tintColor]="tintColor"
            [unselectedTintColor]="unselectedTintColor"
            [ngStyle]="tabbarStyle"
            [activeTab]="selectedIndex"
            [hidden]="hidden"
            [tabBarPosition]="topFlag ? 'top' : 'bottom'"
    >
      <TabBarItem [title]="'Life'"
                  [key]="1"
                  [badge]="1"
                  [icon]="icon1"
                  (onPress)="onPress(0)"
                  [selectedIcon]="icon11">
        <ng-template #icon1>
          <div style="width:22px;height: 22px;background: url('https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg') center center / 21px 21px no-repeat;">
          </div>
        </ng-template>
        <ng-template #icon11>
          <div style="width:22px;height: 22px;background: url('https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg') center center / 21px 21px no-repeat;">
          </div>
        </ng-template>
        <div style="background-color: white; height: 100%; text-align: center">
        <div style="padding-top: 60px">Clicked Life tab， show Life information</div>
          <ng-container>
            <ng-template [ngTemplateOutlet]="content"></ng-template>
          </ng-container>
        </div>
      </TabBarItem>
      <TabBarItem [title]="'Koubei'"
                  [key]="2"
                  [badge]="'new'"
                  [icon]="icon2"
                  (onPress)="onPress(1)"
                  [selectedIcon]="icon22"
      >
        <ng-template #icon2>
          <div style="width:22px;height: 22px;background: url('https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg') center center / 21px 21px no-repeat;">
          </div>
        </ng-template>
        <ng-template #icon22>
          <div style="width:22px;height: 22px;background: url('https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg') center center / 21px 21px no-repeat;">
          </div>
        </ng-template>
        <div style="background-color: white; height: 100%; text-align: center">
        <div style="padding-top: 60px">Clicked Koubei tab， show Koubei information</div>
          <ng-container>
            <ng-template [ngTemplateOutlet]="content"></ng-template>
          </ng-container>
        </div>
      </TabBarItem>
      <TabBarItem [title]="'Friend'"
                  [key]="3"
                  [dot]="true"
                  [icon]="icon3"
                  (onPress)="onPress(2)"
                  [selectedIcon]="icon33">
        <ng-template #icon3>
          <div style="width:22px;height: 22px;background: url('https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg') center center / 21px 21px no-repeat;">
          </div>
        </ng-template>
        <ng-template #icon33>
          <div style="width:22px;height: 22px;background: url('https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg') center center / 21px 21px no-repeat;">
          </div>
        </ng-template>
        <div style="background-color: white; height: 100%; text-align: center">
        <div style="padding-top: 60px">Clicked Friend tab， show Friend information</div>
          <ng-container>
            <ng-template [ngTemplateOutlet]="content"></ng-template>
          </ng-container>
        </div>
      </TabBarItem>
      <TabBarItem [title]="'My'"
                  [key]="4"
                  [icon]="icon4"
                  (onPress)="onPress(3)"
                  [selectedIcon]="icon44">
        <ng-template #icon4>
          <div style="width:22px;height: 22px;background: url('https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg') center center / 21px 21px no-repeat;">
          </div>
        </ng-template>
        <ng-template #icon44>
          <div style="width:22px;height: 22px;background: url('https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg') center center / 21px 21px no-repeat;">
          </div>
        </ng-template>
        <div style="background-color: white; height: 100%; text-align: center">
        <div style="padding-top: 60px">Clicked My tab， show My information</div>
          <ng-container>
            <ng-template [ngTemplateOutlet]="content"></ng-template>
          </ng-container>
        </div>
      </TabBarItem>
    </TabBar>
    <ng-template #content>
      <a style="display: block; margin-top: 40px; margin-bottom: 20px; color: #108ee9"
      (click)="showNextTabBar($event)">
      Click to next tab-bar
      </a>
      <a style="display: block; margin-top: 20px; margin-bottom: 20px; color: #108ee9"
      (click)="showTabBar($event)">
      Click to show/hide tab-bar
      </a>
      <a style="display: block; margin-top: 20px; margin-bottom: 20px; color: #108ee9"
      (click)="changePosition($event)">
      Click to change tab-bar position top/bottom
      </a>
      <a style="display: block; margin-bottom: 60px; color: #108ee9"
      (click)="showFullScreen($event)">
      Click to switch fullscreen
      </a>
    </ng-template>
  `
})
export class TestTabBarComponent {
  hidden: boolean = false;
  fullScreen: boolean = false;
  topFlag: boolean = false;
  tintColor: string = '#108ee9';
  unselectedTintColor: string = '#888';
  tabbarStyle: object = { height: '400px' };
  selectedIndex: number = 1;

  showTabBar(event) {
    event.preventDefault();
    this.hidden = !this.hidden;
  }

  showNextTabBar(event) {
    event.preventDefault();
    const PANE_COUNT = 4;
    if (this.selectedIndex == PANE_COUNT - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
    console.log('selectedIndex: ', this.selectedIndex);
  }

  showFullScreen(event) {
    event.preventDefault();
    this.fullScreen = !this.fullScreen;
    this.tabbarStyle = this.fullScreen
      ? {
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: 0
        }
      : { height: '400px' };
  }

  changePosition(event) {
    event.preventDefault();
    this.topFlag = !this.topFlag;
  }

  onPress(index: number) {
    this.selectedIndex = index;
  }
}
